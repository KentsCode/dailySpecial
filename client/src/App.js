import React, { Component } from 'react';
import { Navbar, Button } from 'reactstrap';
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
        <div id="topBarBackground">
          <Navbar className="row">
            <div className="col-4">
              <img id="cornerLogo" src={require("./Images/logo.png")} alt="daily special logo"/>
            </div>
            <div className="col-5">
              <h3 className="top-center-text">Find the best deal of the day right here!</h3>
            </div>
            <div className="col-2">
                {/* Do I really need this button? 
                <Button
                  bsStyle="light"
                  className="btn-margin button-to-bottom"
                  onClick={this.goTo.bind(this, 'home')}
                >
                  Home
                </Button> */}
                {/* login button below only shows up when not logged in. */}
                {
                  !isAuthenticated() && (
                      <Button
                        // bsStyle="light"
                        className="btn-margin shadow-button button-to-bottom"
                        onClick={this.login.bind(this)}
                      >
                        Venue Log In
                      </Button>
                    )
                }
                {/* Below buttons only show up when logged in. */}
                {
                  isAuthenticated() && (
                      <Button
                        //bsStyle="light"
                        className="btn-margin shadow-button"
                        onClick={this.goTo.bind(this, 'profile')}
                      >
                        Profile
                      </Button>
                    )
                }
                {
                  isAuthenticated() && (
                      <Button
                        //bsStyle="light"
                        className="btn-margin shadow-button"
                        onClick={this.logout.bind(this)}
                      >
                        Venue Log Out
                      </Button>
                    )
                }
            </div>
          </Navbar>
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
