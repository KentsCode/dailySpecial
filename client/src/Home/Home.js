import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: '',
      day: '',
      restaurants: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submit went here!  Day is ' + this.state.day + '  Locale: ' + this.state.locale);
    fetch(
      axios.get("http://localhost:3001/api/search", {
        params: {
          locale: this.state.locale,
          day: this.state.day
        }
      }).then((response)=> {
        console.log("from home.js", response.data);
        this.setState({restaurants: response.data})
        console.log(this.state);
      } 
    )
      
    );
    console.log(this.state);
  }
  
  login() {
    this.props.auth.login();
  }
  render() {
    return (
      <div>
        <div className="App offset-md-4">
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
        <br/>
        <br/>
        <div>
        {this.state.restaurants.length ? (
          <div>
            {this.state.restaurants.map(restaurant =>
              <div key={restaurant._id}>
                <div className="card card-margin">
                <div className="card-header heading-text">{restaurant.restaurantName}
                </div>
                <div className="row">
                  <h3 className="col-6 card-text">{restaurant.description}</h3>
                  <h3 className="col-2 card-text">Price: ${restaurant.price}</h3>
                </div>
                <div className="row">
                  <h3 className="col-6 card-text">{restaurant.address}</h3>
                  <h3 className="col-2 card-text">{restaurant.city}</h3>
                </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <h3 className="offset-md-4">Enter a zip code and select a day to find your specials</h3>
        )}
        </div>
      </div>
    );
  }
}

export default Home;
