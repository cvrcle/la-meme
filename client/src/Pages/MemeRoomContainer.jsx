import React, { Component } from 'react';
import MemeRoom from '../components/MemeRoom.jsx';

  /**
   * memePhotoCopy used to continue showing photo while the next photo is getting fetched 
   */
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: '',
      playerCount: 0,
      spectatorCount: 0,
      timer: 0,
      round: 0,
      intermission: null,
      memePhoto: [],
      memePhotoCopy: []
    };
    this.emitMessage = this.emitMessage.bind(this);
    this.MemePhoto = this.MemePhoto.bind(this);
  }
  componentWillMount() {
    const payload = {
      location: 'memeroom',
      user: this.props.profile.username
    };
    this.props.socket.emit('location:memeroom', payload);
    this.setRoom();
    this.RoomOccupancy();
    this.MemePhoto();
    window.onbeforeunload = () => {
      this.removeUser();
    };
  }
  componentDidMount() {
    this.listenforCountdown();
    this.listenForConnectionType();
    this.listenForIntermission();
    this.roundOver();
  }
  componentDidUpdate() {
    if (!this.state.countingDown && this.state.playerCount === 2 && this.state.round < 1) {
      this.triggerCountDown();
    }
  }
  /**
   * removes a user from the users storage on unmounting
   */
  componentWillUnmount() {
    this.removeUser();
    window.onbeforeunload = null;
  }

  /**
   * creates a room on the server to hold sockets
   * listens for a join event and updates user states
   */
  setRoom() {
    this.props.socket.on('join', (roomname) => {
      this.setState({
        currentRoom: roomname,
      });
    });
  }
  /**
  * removes a user on the server
  */
  removeUser() {
    const room = this.state.currentRoom;
    const username = this.props.profile.username;
    const connectionType = this.state.connectionType;
    const payload = {
      room,
      connectionType,
      username,
    };
    this.props.socket.emit('left-meme-room', payload);
  }
  /**
   * triggers the server to start the countdown
   */
  triggerCountDown() {
    if (!this.state.countingDown && this.state.playerCount === 2 && this.state.connectionType !== 'spectator') {
      this.props.socket.emit('start-round', this.state.currentRoom);
    }
  }
  /**
   * listens for server's assignment of connectionType
   */
  listenForConnectionType() {
    console.log('fired');
    this.props.socket.on('status', (connectionType) => {
      this.setState({
        connectionType
      });
    });
  }
  /**
   * listens for the time that is emitted from server ( every second )
   */
  listenforCountdown() {
    const self = this;
    this.props.socket.on('count-down', ({ time, countingDown }) => {
      self.setState({
        timer: time,
        countingDown
      });
    });
  }
  grabPlayerInput() {
    this.props.socket.on('player-msg', (caption) => {
      console.log('got player MSG:   ', caption);
      this.setState({
        player2Caption: caption
      });
    });
  }
  /**
   * round is over, updates round count
   */
  roundOver() {
    const self = this;
    this.props.socket.on('round-over', (round) => {
      this.props.socket.emit('grab-caption', this.state.currentRoom);
      console.log('grab caption fired', this.state.currentRoom);
      const count = round + 1;
      this.hideMemePhoto();
      this.showMeme();
      this.grabPlayerInput();
      self.setState({
        countingDown: false,
        round: count
      });
    });
  }
  /**
   * shows both players memes to everyone
   */
  showMeme() {
    console.log('should show meme');
    document.getElementById('display-meme').removeAttribute('class');
  }
  /**
   * hides both players memes from everyone
   */
  hideMeme() {
    console.log('should hide meme');
    document.getElementById('display-meme').className = 'meme-display';
  }

  /**
   * shows plain photo to everyone
   */
  showMemePhoto() {
    document.getElementById('photo').removeAttribute('class');
  }
  /**
   * hides photo
   */
  hideMemePhoto() {
    document.getElementById('photo').className = 'photo-display';
    this.setState({
      memePhotoCopy: this.state.memePhoto
    });
  }

  /**
   * listens for intermission & game-over from the server countdown
   */
  listenForIntermission() {
    const self = this;
    this.props.socket.on('intermission', () => {
      self.setState({
        intermission: true
      });
    });
    this.props.socket.on('intermission-over', () => {
      self.hideMeme();
      self.showMemePhoto();
      self.setState({
        intermission: false
      });
    });
    this.props.socket.on('game-over', () => {
      self.setState({
        gameOver: true
      });
    });
  }
  /**
   * listens for room occupancy changes from the server
   */
  RoomOccupancy() {
    this.props.socket.on('occupancy', ({ playerCount, spectatorCount }) => {
      this.setState({
        playerCount,
        spectatorCount
      });
    });
  }
    /**
   * serves up photo
   */
  MemePhoto() {
    const self = this;
    this.props.socket.on('photoUrl', (photoUrl) => {
      self.setState({
        memePhoto: photoUrl
      });
    });
  }
  /**
   * handles sending message through socket.io ( not used as of now, maybe chat later? )
   */
  emitMessage(message) {
    const user = this.state.username;
    const room = this.state.currentRoom;
    const payload = {
      user,
      room,
      message
    };
    this.socket.emit('chat-message', payload);
  }
  /**
   * handles rendering message to all clients ( not used as of now, maybe chat later? )
   */
  renderMessage() {
    this.props.socket.on('new-message', (data) => {
      console.log('from renderMessage', data);
      document.getElementById('messages').innerHTML += `<li>${data.message}</li>`;
    });
  }
  render() {
    return (
      <MemeRoom
        currentRoom={this.state.currentRoom}
        roomOccupancy={this.state.playerCount}
        handleMessage={this.emitMessage}
        currentTime={this.state.timer}
        spectators={this.state.spectatorCount}
        connectionType={this.state.connectionType}
        intermission={this.state.intermission}
        memePhoto={this.state.memePhoto}
        memePhotoCopy={this.state.memePhotoCopy}
        socket={this.props.socket}
        player2Caption={this.state.player2Caption}
      />
    );
  }
}

export default Game;
