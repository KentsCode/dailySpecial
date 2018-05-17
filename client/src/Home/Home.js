import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: '',
      day: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    //this.setState({locale: event.target.value, day: event.target.value});
    console.log('Submit went here!  Day is ' + this.state.day + '  Locale: ' + this.state.locale);
    fetch(
      axios.get("http://localhost:3001/api/search", {
        locale: this.state.locale,
        day: this.state.day
      })
    )
      .then(data => console.log("home.js   ",data)
    );
  }
  login() {
    this.props.auth.login();
  }
  render() {
    //const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <div className="App">
          <form onSubmit={this.handleSubmit} className="search-form">
            <label className="search-label">
              Location: (City, State or Zip)
              <input type="text" className="locale" name="locale" onChange={this.handleChange}/>
            </label>     
            <select name="day" onChange={this.handleChange}>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <br/> 
            <input type="submit" value="Find Specials" className="btn-primary"/>
          </form>
        </div>
        
        <div>
          <div className="card card-margin">
            <div className="card-header heading-text">Restaurant Name</div>
            <div className="row">
              <h5 className="col-7 card-text">Special</h5>
              <div className="col-1 card-text">Price</div>
              <div className="col-4">
                <img src={require("../Images/logo.png")} className="img-rounded img-responsive small-image" id="Panel_Image" alt="didnt load"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
