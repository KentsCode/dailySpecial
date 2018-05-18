import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
  componentDidMount() {
    this.props.history.replace('/home');
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <div>
          <Navbar fluid id="topBarBackground" className="row">
            <Navbar.Header className="col-4">
              <img id="cornerLogo" src={require("./Images/logo.png")} alt="daily special logo"/>
            </Navbar.Header>
            <Navbar.Header className="col-5">
              <h3 className="">Your Specials For (Weekday)</h3>
            </Navbar.Header>
            <Navbar.Header className="col-2">
                <Button
                  bsStyle="primary"
                  className="btn-margin button-to-bottom"
                  onClick={this.goTo.bind(this, 'home')}
                >
                  Home
                </Button>
                {
                  !isAuthenticated() && (
                      <Button
                        bsStyle="primary"
                        className="btn-margin button-to-bottom"
                        onClick={this.login.bind(this)}
                      >
                        Venue Log In
                      </Button>
                    )
                }
                {
                  isAuthenticated() && (
                      <Button
                        bsStyle="primary"
                        className="btn-margin"
                        onClick={this.goTo.bind(this, 'profile')}
                      >
                        Profile
                      </Button>
                    )
                }
                {
                  isAuthenticated() && (
                      <Button
                        bsStyle="primary"
                        className="btn-margin"
                        onClick={this.logout.bind(this)}
                      >
                        Venue Log Out
                      </Button>
                    )
                }
            </Navbar.Header>
          </Navbar>
          <div className="container">
            {this.props.children}
          </div>
        </div>
        {/* <div>
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
                <img src={require("./Images/logo.png")} className="img-rounded img-responsive small-image" id="Panel_Image" alt="didnt load"/>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      </div>
    );
  }
}

export default App;
