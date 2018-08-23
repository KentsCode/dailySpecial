import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'reactstrap';
import './Profile.css';
//I added these below. Above are from Auth0.
import axios from 'axios';

var storedNickname = '';
//var retrievedRestaurants = [];

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
        nickname: '',
        myRestaurants: {}
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
        storedNickname = this.state.nickname;
        //console.log("from state: " + this.state.nickname);
        console.log("storednickname", storedNickname);
        this.getRestaurants();
      });
    } else {
      this.setState({ profile: userProfile });
      console.log("from User Profile in else statement!  " + userProfile.nickname);
      this.setState({nickname: userProfile.nickname});
      storedNickname = this.state.nickname;
      console.log("storednickname", storedNickname);
      this.getRestaurants();
    }
  
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  getRestaurants = () => {
    //Gets the users current specials.
    axios.get('/api/myAccounts', {
        params: {
            nickname: storedNickname
        }
    })
      .then((response) => {
          this.setState({myRestaurants: response.data})
          console.log("MyRestaurants",this.state.myRestaurants)
          
      }).catch(function (error) {
          console.log(error);
      });
    //console.log("from state: " + this.state.profile);
  }
  deleteRestaurant = id => {
    axios.delete('/api/deleteRestaurant/:id', {
      params: {id: id}
    })
    .then(res => this.getRestaurants())
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
          <Panel className="panel-dark text-light" header="">
            <div className="panel-body-margin">
              <h1 className="text-light">Welcome {profile.name}.</h1>
              <div className="transparent-background">
                <div className="row">
                  <img src={profile.picture} alt="profile" />
                  <div>
                    <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
                    <h3>{profile.nickname}</h3>
                  </div>
                </div>
                {/* Above is info from Auth0. Below is submit form. Nickname key is auto-added */}
                <div>
                  <div className="row">
                    <header>
                        <h1>Enter your info here</h1>
                    </header>
                  </div>
                  
                    <form onSubmit={this.handleSubmit} className="accountSubmit">
                    <div className="row form-group">
                      <div className="col-6">
                        <label className="col-form-label">Restaurant Name
                            <input type="text" className="restaurantNameInput text-dark form-control" name="restaurantName" onChange={this.handleChange}/>
                        </label>
                        <br />
                        <label className="col-form-label">Street Address
                            <input type="text" className="streetAddressInput text-dark form-control" name="streetAddress" onChange={this.handleChange}/>
                        </label>
                        <br />
                        <label className="col-form-label">City
                            <input type="text" className="cityInput text-dark form-control" name="city" onChange={this.handleChange}/>
                        </label>
                      </div>
                      <div className="col-6">
                        <label className="col-form-label">State
                            <input type="text" className="stateInput text-dark form-control" name="state" onChange={this.handleChange}/>
                        </label>
                        <br />
                        <label className="col-form-label">Zip
                            <input type="text" className="zipInput text-dark form-control" name="zip" onChange={this.handleChange}/>
                        </label>
                        <br />
                        <br />
                        <button type="submit" className="gray-button text-light btn-margin btn" >Go to my specials</button>
                      </div>
                      </div>
                    </form>
                </div>

                <div className="row">
                  <div className="container">
                      {this.state.myRestaurants.length ? (
                          <div>
                              {this.state.myRestaurants.map(restaurant =>
                                  <div key={restaurant._id}>
                                      <div className="card card-margin">
                                          <div className="card-header text-white bg-dark mb-3 heading-text">{restaurant.city}
                                          </div>
                                          <div className="row">
                                              <h3 className="col-6 card-text">{restaurant.streetAddress}</h3>
                                              <h3 className="col-2 card-text">{restaurant.zip}</h3>
                                              <button className="btn btn-dark" onClick={() => this.deleteRestaurant(restaurant._id)} >Delete</button>
                                          </div>

                                      </div>
                                  </div>
                              )}
                          </div>
                              ) : (
                                  <h3 className="">Welcome to DailySpecial! To add a location enter the address of your restaurant.</h3>
                      )}
                  </div>
                </div>       

              </div>
            </div>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
