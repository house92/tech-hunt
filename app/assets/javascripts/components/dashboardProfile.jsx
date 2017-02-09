import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import AccountInfo from './accountInfo.jsx';
import EditProfile from './editProfile.jsx';

export default class DashboardProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      account: this.props.account
    };
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(info) {
    console.log(info);
    this.setState({ account: info }, () => {
      this.toggleEdit();
    });
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  render() {
    var profile;
    if (this.state.edit) {
      profile = <EditProfile currentUser={this.props.currentUser} userInfo={this.state.account} updateParentInfo={this.updateInfo} />;
    } else {
      profile = (
        <div>
          <AccountInfo account={this.state.account} />
          <Button type="button" onClick={this.toggleEdit}>{`Edit`}</Button>
        </div>
      );
    }
    return (
      <div className="dashboard-profile">
        {profile}
      </div>
    );
  }
}
