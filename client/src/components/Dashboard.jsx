import React from 'react';
import { Col, Panel, Row, Image, Button } from 'react-bootstrap';

import PlayerTable from './PlayerTable.jsx';
import RoomsTable from './RoomsTable.jsx';

const Dashboard = (props) => {
  const userProfile = props.profile ? props.profile : {};
  const roomsCount = props.roomTableData ? props.roomTableData.size : 0;
  return (
    <div>
      <Row>
        <Col>
          <div className="text-center">
            <Image className="text-center profile-photo" alt='profile_img' src={userProfile.picture} circle thumbnail />
            {userProfile ? <h3>{userProfile.username} </h3> : ''}
            <hr />
            <div className="text-center">
              <Button
                bsStyle="primary"
                onClick={() => {
                  props.auth.logout();
                  props.logout();
                }}
              >
                <span className="text-center">Logout</span>
              </Button>
              {'  '}
              <Button
                bsStyle="primary"
                onClick={props.userCreatedRoom}
              >
                Create Room</Button>
            </div>
            <hr />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Panel className="users">
            <h3 className="text-center"> users </h3>
            <p className="text-center"> online users: {props.onlineCount} </p>
          </Panel>
          <PlayerTable
            data={props.playerTableData}
            setupUserInvite={props.setupUserInvite}
          />
        </Col>
        <Col md={6} >
          <Panel className="rooms">
            <h3 className="text-center"> rooms </h3>
            <p className="text-center"> active rooms: {roomsCount} </p>
          </Panel>
          <RoomsTable
            data={props.roomTableData}
            joinRoom={props.joinRoom}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

