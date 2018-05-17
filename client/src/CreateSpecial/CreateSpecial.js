import React from 'react';
// import { Link } from "react-router-dom";
import axios from 'axios';

//toDos: Create calendar elements dynamically from array.

class createSpecial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            weekday: '', 
            description: '', 
            price: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        //gets profile nickname and stores it in the background.
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
          getProfile((err, profile) => {
            this.setState({ profile });
            this.setState({nickname: profile.nickname});
            //console.log("from state: " + this.state.profile);
          });
        } else {
          this.setState({ profile: userProfile });
          //console.log("from User Profile in else statement!  " + userProfile.nickname);
          this.setState({nickname: userProfile.nickname});
        }
        //Above gets profile nickname and stores it in the background.
        //Gets the users current specials.
        axios.get('http://localhost:3001/api/mySpecials/:nickname', {
            params: {
                nickname: userProfile.nickname
            }
        })
            .then(function(response) {
                console.log("from axios in create special page ",response.data[0]);
                //!!!!!!Add code to set state of Monday-Sunday
                for (var i = 0; i < response.data.length; i++ ) {
                    //var day = response.data[i].weekday;
                    //console.log( day,response.data[i].description, response.data[i].price );
                    //this.setState({day: response.data[i] }) //set state of day for each part of loop.
                    //console.log(this.state.day);
                }
                
            }).catch(function (error) {
                console.log(error);
            });
        //console.log("from state: " + this.state.profile);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        //console.log(event.target.value);
    }
    handleSubmit(event) {
        event.preventDefault();
        //console.log("the special for " + this.state.weekday + " is " + this.state.description + " for $" + this.state.price);
        //console.log(this.state.nickname);
        axios.post('http://localhost:3001/api/regularSpecial', {
            nickname: this.state.nickname,
            weekday: this.state.weekday,
            description: this.state.description,
            price: this.state.price
        })  
    }

    render() {
        return (
            <div>
                <div>
                    <header>
                        <h1>Submit your specials here</h1>
                    </header>
                    <form onSubmit={this.handleSubmit} className="regularSpecialSubmit">
                        <label>
                            Select day of the week.
                            <select name="weekday" onChange={this.handleChange}>
                                <option value="selectWeekday">Select Weekday</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </label>
                        <br />
                        <label>Describe your special here.
                            <input type="text" className="descriptionInput" name="description" onChange={this.handleChange}/>
                        </label>
                        <br />
                        <label>Enter the price (in USD) of the special here. No $ signs.  
                            <input type="text" className="priceInput" name="price" onChange={this.handleChange}/>
                        </label>
                        <br />
                        <input type="submit" value="Submit Special" className="btn-primary"/>
                    </form>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-1 "> 
                            <p>Monday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Tuesday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Wednesday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Thursday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Friday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Saturday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Sunday</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1 Monday">
                            <p>Monday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Tuesday</p>
                        </div>
                        <div className="col-1 "> 
                            {/* {this.state.weekday.wednesday} */}
                        </div>
                        <div className="col-1 "> 
                            <p>Thursday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Friday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Saturday</p>
                        </div>
                        <div className="col-1 "> 
                            <p>Sunday</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default createSpecial;