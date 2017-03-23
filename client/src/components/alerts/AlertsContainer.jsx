import React, { Component } from 'react';
import { Panel, Collapse } from 'react-bootstrap';

import NewUserJoinedAlert from './NewUserJoined.jsx';

class AlertsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  componentDidMount() {
    this.timer();
  }
  timer() {
    if (this.props.newUserJoined) {
      this.setState({
        open: true
      });
    }
  }
  render() {
    return (
      <div>
        <Panel className="notification-panel" bsStyle="primary" header="notifications">
            {/* <Collapse in={this.state.open}>
              <NewUserJoinedAlert />
            </Collapse>*/}
        </Panel>
      </div>
    );
  }
}

export default AlertsContainer;
