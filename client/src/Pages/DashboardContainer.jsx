import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { default as swal } from 'sweetalert2';

import AlertsContainer from '../components/alerts/AlertsContainer.jsx';
import Dashboard from '../components/Dashboard.jsx';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: new Map(),
      rooms: new Map(),
      onlineCount: 0,
      newUser: false
    };
    this.setupUserInvite = this.setupUserInvite.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.userCreatedRoom = this.userCreatedRoom.bind(this);
  }
  /**
   * Init user creation on the server
   * emit to the server a user has joined dashboard/lobby
   * setup listener to listen for window close (emit left dashboard)
   */
  componentWillMount() {
    this.createUser(this.props.profile.username);
    this.emitJoinedDashboard(this.props.profile.username);
    this.props.socket.emit('grab-dashboard-data');
    this.props.socket.on('dashboard-data', (userInfo) => {
      const connectedUsers = this.state.users;
      const { username, sid, location } = userInfo;
      connectedUsers.set(username, { sid, location });
      this.setState({
        users: connectedUsers
      });
    });
    window.onbeforeunload = () => {
      this.emitLeftDashboard();
    };
  }
  /**
   * everytime the component mounts, lets listen for the global online count, global rooms and setState accordingly
   * 
   */
  componentDidMount() {
    this.props.socket.on('new-user', (count) => {
      this.setState({
        onlineCount: count
      });
    });
    this.props.socket.on('new-room', ({ roomname, roomData }) => {
      const currentRooms = this.state.rooms;
      currentRooms.set(roomname, roomData.playerCount + roomData.spectatorCount);
      this.setState({
        rooms: currentRooms
      });
    });
    this.props.socket.on('deleted-room', (roomToDelete) => {
      const currentRooms = this.state.rooms;
      currentRooms.delete(roomToDelete);
      this.setState({
        rooms: currentRooms
      });
    });
    this.listenForGlobalCount();
    this.listenForInvites();
    this.props.socket.on('join-memeroom', (data) => {
      this.setState({
        redirect: true
      });
      console.log(data);
    });
  }
  componentWillReceiveProps(nextProps) {
    this.listenForGlobalCount();
    this.listenForRoomData();
    this.newUserJoined();
  }
  componentDidUpdate(prevProps, prevState) {
  }
  componentWillUnmount() {
    this.emitLeftDashboard();
    window.onbeforeunload = null;
  }
  /*
   * Responsible for invitation room config
   */
  userCreatedRoom() {
    swal({
      title: 'setup room',
      text: 'please enter a room-name',
      input: 'text',
      confirmButtonText: 'create-room',
      showCancelButton: true
    })
      .then((roomname) => {
        this.props.socket.emit('create-room', { roomname });
      })
      .catch((swal.noop));
  }
  /**
   * Responsible for allowing a user to join a already created room listed on room-list
   */
  joinRoom(roomname) {
    this.props.socket.emit('join-room', roomname);
  }
  /**
   * Responsible for setting up user invites
   */
  setupUserInvite(socketId) {
    if (socketId === this.props.socket.id) {
      swal('ERROR: Can\'t invite yourself', 'Feeling lonely huh?', 'error');
      return;
    }
    swal({
      title: 'Room config',
      text: 'please enter a room-name',
      input: 'text',
      confirmButtonText: 'send invite',
      showCancelButton: true
    })
    .then((roomname) => {
      console.log(roomname);
      console.log('send invite to this socket', socketId);
      const payload = {
        sender: this.state.user,
        reciever: socketId,
        roomname
      };
      this.props.socket.emit('user:invite', payload);
    });
  }
  /*
   * Handles listening for invites
   */
  listenForInvites() {
    this.props.socket.on('invite', (sender, cb) => {
      swal({
        title: 'Invitation',
        text: `user: ${sender} wants to play a game, accept?`,
        type: 'question',
        confirmButtonText: 'Accept',
        showCloseButton: true
      }).then(() => {
        // user accepted, lets setup the room on the server ~
        cb(this.props.socket.id, true);
      }, (dismiss) => {
        if (dismiss === 'close' || dismiss === 'overlay') {
          swal('Invitation cancelled', "don't be a flake", 'error');
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
  /**
   * {Global-Event} A new user has joined the socket.io server, notify user 
   */
  newUserJoined() {
    this.props.socket.on('new-user', (d) => {
      console.log(d, 'recieved new user event');
      this.setState({
        newUser: true
      });
      setTimeout(() => {
        this.setState({
          newUser: false
        });
      }, 2000);
    });
  }
  /**
    * create a user on the server using their username from auth0 (unique)
    */
  createUser(username) {
    const payload = {
      username
    };
    this.props.socket.emit('create-user', payload);
  }
  emitJoinedDashboard(username) {
    console.log('joined dashboard!');
    const payload = {
      user: username,
      location: 'dashboard'
    };
    this.props.socket.emit('location:dashboard', payload);
  }
  emitLeftDashboard(username) {
    const payload = {
      user: username,
      location: ''
    };
    this.props.socket.emit('left-dashboard', payload);
  }
  listenForGlobalCount() {
    const self = this;
    this.props.socket.on('connected-user', (count, userInfo, username) => {
      // grab newly connected users info
      const { sid, location } = userInfo;
      const connectedUsers = this.state.users;
      connectedUsers.set(username, { sid, location });
      self.setState({
        onlineCount: count,
        users: connectedUsers
      });
    });
  }
  listenForRoomData() {
    this.props.socket.on('rooms-data', (data) => {
      this.setState({
        data
      });
    });
  }
  handleRoomData() {
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Dashboard
              onlineCount={this.state.onlineCount}
              playerTableData={this.state.users}
              setupUserInvite={this.setupUserInvite}
              joinRoom={this.joinRoom}
              profile={this.props.profile}
              roomTableData={this.state.rooms}
              auth={this.props.auth}
              logout={this.props.logout}
              userCreatedRoom={this.userCreatedRoom}
            />
            {this.state.redirect ?
              <Redirect to="/play" />
              : ''}
          </Col>
        </Row>
        <hr />
      </Grid>
    );
  }
}

export default DashboardContainer;
