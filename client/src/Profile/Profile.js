import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';
//I added these below. Above are from Auth0.
import axios from 'axios';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        restaurantName: '',
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
        username: '',
        password: '',
        nickname: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        this.setState({nickname: profile.nickname});
        //console.log("from state: " + this.state.nickname);
      });
    } else {
      this.setState({ profile: userProfile });
      console.log("from User Profile in else statement!  " + userProfile.nickname);
      this.setState({nickname: userProfile.nickname});
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  }
  handleSubmit(event) {
    console.log("submitting");
    event.preventDefault();
    axios.post('/api/account', {
        restaurantName: this.state.restaurantName,
        streetAddress: this.state.streetAddress,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip,
        username: this.state.username,
        password: this.state.password,
        nickname: this.state.nickname
    });
    this.props.history.push('/createSpecial');
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>Welcome {profile.name}.</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
            </div>
            {/* Above is info from Auth0. Below is submit form. Nickname key is auto-added */}
            <div>
                <header>
                    <h1>Verify your info here</h1>
                </header>
                <form onSubmit={this.handleSubmit} className="accountSubmit">
                    <label>Restaurant Name
                        <input type="text" className="restaurantNameInput" name="restaurantName" onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>Street Address
                        <input type="text" className="streetAddressInput" name="streetAddress" onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>City
                        <input type="text" className="cityInput" name="city" onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>State
                        <input type="text" className="stateInput" name="state" onChange={this.handleChange}/>
                    </label>
                    <br />
                    <label>Zip
                        <input type="text" className="zipInput" name="zip" onChange={this.handleChange}/>
                    </label>
                    <br />
                    <br />
                    <button type="submit" className="btn-primary btn-margin" >Go to my specials</button>
                </form>
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
