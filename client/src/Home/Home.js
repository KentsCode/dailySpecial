import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Card, CardColumns, CardBody, CardHeader } from 'reactstrap';


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
    console.log(this.state.locale, this.state.day);
    fetch(
      axios.get("/api/search", {
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
        <div className="container border-styling offset-md-4 col-4 search-bar">
          <div className="App">
            <form onSubmit={this.handleSubmit} className="search-form">
              <label className="search-label col-form-label">
                Location: (Zip)
                <input type="text" className="locale form-control" name="locale" required="required" onChange={this.handleChange}/>
              </label>  
              <br /> 
              <br />  
              <select name="day" onChange={this.handleChange}>
                <option value="Monday">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
              <input type="submit" value="Find Specials" className="text-light gray-button btn btn-margin"/>
            </form>
          </div>
        </div>
        <br/>
        <br/>
        <div>
        {this.state.restaurants.length ? (
          <CardColumns>
            {this.state.restaurants.map(restaurant =>
              <Card key={restaurant._id} className="">
                <CardHeader className="text-white bg-dark heading-text">{restaurant.restaurantName}
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="8">
                      <h3 className="card-text">{restaurant.description}</h3>
                    </Col>
                    <Col sm="4">
                      <h3 className="card-text">Price: ${restaurant.price}</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="7">
                      <h3 className="card-text">{restaurant.address}</h3>
                    </Col>
                    <Col sm="5">
                      <h3 className="card-text">{restaurant.city}</h3>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              
            )}
          </CardColumns>
        ) : (
          <div className="card col-6 offset-md-3">
            <h3 className="text-dark offset-md-2 col-8 centered-text">Enter a zip code and select a day to find your specials</h3>
          </div>
        )}
        </div>
      </div>
    );
  }
}

export default Home;
