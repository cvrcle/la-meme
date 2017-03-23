import React, { Component } from 'react';
import { Well, Col, Image } from 'react-bootstrap';
import GameInput from './GameInput.jsx';

class GameDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameInput: ''
    };
  }
  setGameInput(caption) {
    console.log('fired from game input');
    // send socket.io
    const payload = {
      caption,
      roomname: this.props.currentRoom
    };
    this.props.socket.emit('update-caption', payload);
    this.setState({ gameInput: caption });
    console.log(this.state.gameInput);
  }
  render() {
    return (
      <div>
        <Col xs={12} md={12}>
          <div id="photo">
            <Image className="photo" src= {this.props.memePhoto} />
            { this.props.connectionType === 'player' ?
              <GameInput handleMessage={this.props.handleMessage} setGameInput={this.setGameInput.bind(this)} /> 
            : '' }
          </div>
        </Col>

        <Well className="meme-content" bsSize="large">
          <div id="display-meme" className="meme-display">
            <Col xs={6} md={4}>
              <Image className="meme" src={this.props.memePhotoCopy} />
                <div className="caption">{this.state.gameInput}
              </div>
            </Col>

            <Col xs={6} md={4}>
              <Image className="meme" src={this.props.memePhotoCopy} />
              <div className="caption">{this.props.player2Caption}
              </div>
            </Col>
            {/* <ul id="messages" />*/}
          </div>
        </Well>
      </div>
    );
  }
}

export default GameDisplay;
