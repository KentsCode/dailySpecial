import React, { Component } from 'react';
//import { Link } from 'react-router-dom';

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    //const { isAuthenticated } = this.props.auth;
    return (
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

      // <div className="container">
      //   {
      //     isAuthenticated() && (
      //         <h4>
      //           You are logged in! You can now view your{' '}
      //           <Link to="profile">profile area</Link>
      //           .
      //         </h4>
      //       )
      //   }
      //   {
      //     !isAuthenticated() && (
      //         <h4>
      //           You are not logged in! Please{' '}
      //           <a
      //             style={{ cursor: 'pointer' }}
      //             onClick={this.login.bind(this)}
      //           >
      //             Log In
      //           </a>
      //           {' '}to continue.
      //         </h4>
      //       )
      //   }
      // </div>
    );
  }
}

export default Home;
