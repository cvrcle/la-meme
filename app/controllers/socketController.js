const Users = new Map();
const Rooms = new Map();
const redisController = require('./redisController');

let ioRef;
let self;
module.exports = {
  init(io) {
    self = this;
    io.on('connection', (socket) => {
      ioRef = io;
      socket.on('create-user', this.createUser);
      socket.on('create-room', this.createRoom);
      socket.on('forceDisconnect', this.removeUser);
      socket.on('chat-message', this.handleMessage);
      socket.on('start-round', this.startRound);
    });
  },
  createUser(user) {
    const { username, authToken } = user;
    Users.set(authToken, username);
  },
  removeUser(user) {
    const { room, connectionType } = user;
    this.leave('testRoom', (err) => {
      if (err) {
        throw new Error(err);
      }
      // handles edge case if theres only one use in a room
      try {
        if (connectionType === 'player') {
          self.removePlayer(room, this.id);
        } else {
          self.removeSpectator(room, this);
        }
        self.emitRoomOccupancy(room);
      } catch (error) {
        console.log(`Room: ${room} is empty, will be deleted`);
        // no one else is in room, we can delete it from our Map
        Rooms.delete(room);
      }
    });
  },
  createRoom(room) {
    // join client created room;
    this.join(room, (err) => {
      if (err) {
        throw new Error(err);
      }
      // add the room to our map of stored rooms (eventually will be a database);
      self.addRoomToMap(room);
      // emit successfully join
      self.emitSuccessfulJoin(room);
      // grab room so we can determine whether user is a player or spectator
      const roomData = Rooms.get(room);
      if (roomData.playerCount < 2) {
        // if room size < 2, add player as a player to our Map
        self.addPlayer(room, this);
      } else {
        // add player as a spectator to our Map
        self.addSpectator(room, this);
      }

      // send back new room occupancy to all clients in that particular room
      self.emitRoomOccupancy(room);
    });
  },
  addRoomToMap(room) {
    // if room doesn't already exist, lets create one
    if (!Rooms.get(room)) {
      const roomData = {};
      roomData.players = {};
      roomData.spectators = {};
      roomData.playerCount = 0;
      roomData.spectatorCount = 0;
      roomData.active = false;
      redisController.addRoom(room, roomData);
      Rooms.set(room, roomData);
    }
    // if room already exists, user can be added to it
  },
  emitSuccessfulJoin(room) {
    ioRef.to(room).emit('join', room);
  },
  addPlayer(room, socket) {
    const roomData = Rooms.get(room);
    roomData.players[socket.id] = socket.id;
    roomData.playerCount += 1;
    socket.emit('status', 'player');
    Rooms.set(room, roomData);
  },
  removePlayer(room, socketId) {
    const roomData = Rooms.get(room);
    delete roomData.players[socketId];
    roomData.playerCount -= 1;
    Rooms.set(room, roomData);
  },
  addSpectator(room, socket) {
    const roomData = Rooms.get(room);
    roomData.spectators[socket.id] = socket.id;
    roomData.spectatorCount += 1;
    Rooms.set(room, roomData);
    socket.emit('status', 'spectator');
    console.log('from add spectator', Rooms);
  },
  removeSpectator(room, socket) {
    const roomData = Rooms.get(room);
    delete roomData.spectators[socket.id];
    roomData.spectatorCount -= 1;
    Rooms.set(room, roomData);
  },
  emitRoomOccupancy(room) {
    const roomData = Rooms.get(room);
    const payload = {
      playerCount: roomData.playerCount,
      spectatorCount: roomData.spectatorCount
    };
    ioRef.to(room).emit('occupancy', payload);
  },
  handleMessage(message) {
    const { room } = message;
    ioRef.to(room).emit('new-message', message);
  },
  handleRoundStart(room) {
    let times = 0;
    const roomData = Rooms.get(room);
    roomData.playing = false;
    if (roomData.size < 2) {
      // emit something here to client telling them not enough users
      return;
    }
    if (!roomData.playing && times < 1) {
      times += 1;
      roomData.playing = true;
      let time = 10;
      let round = 0;
      let intermission = 0;
      const countDown = setInterval(() => {
        ioRef.to(room).emit('count-down', { time, countingDown: true });
        time -= 1;
        // time elapsed lets do something
        if (time === -1) {
          if (round === 0) {
            ioRef.to(room).emit('round-over', round);
            // intermission time
            ioRef.to(room).emit('intermission');
            if (intermission === 1) {
              round += 1;
              // start round 2
              ioRef.to(room).emit('intermission-over');
              time = 10;
              console.log('round 1 intermission done, round 2 start');
              return;
            } else {
              time = 15;
              intermission += 1;
              console.log('round 1, 10 seconds over, 15 sec begin');
            }
          }
          if (round === 1) {
            ioRef.to(room).emit('round-over', round);
            if (intermission === 2) {
              round += 1;
              // start round 3
              time = 10;
              console.log('got here from round 2', round);
              ioRef.to(room).emit('intermission-over');
              return;
            } else {
              time = 15;
              intermission += 1;
              console.log('round 2, 10 seconds over, 15 sec begin');
              ioRef.to(room).emit('intermission');
            }
          }
          if (round === 2) {
            ioRef.to(room).emit('round-over', round);
            time = 15;
            if (intermission === 3) {
              round += 1;
              ioRef.to(room).emit('intermission-over');
              ioRef.to(room).emit('game-over');
              if (round === 3) {
                clearInterval(countDown);
                roomData.active = false;
              }
            } else {
              intermission += 1;
              ioRef.to(room).emit('intermission');
            }
          }
        }
      }, 1000);
    }
  },
  startRound(room) {
    const roomData = Rooms.get(room);
    if (roomData.playerCount === 2 && roomData.active === false) {
      roomData.active = true;
      Rooms.set(room, roomData);
      self.handleRoundStart(room);
    }
  }
};
