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
            restaurantName: '',
            city: '',
            address: '',
            mySpecials: {}
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
        //gets the restaurant name and address and stores it in state
        axios.get('/api/findAccount/:nickname', {
            params: {
                nickname: userProfile.nickname
            }
        })
            .then((response) => { 
                
                this.setState({restaurantName: response.data[0].restaurantName, city: response.data[0].city, address: response.data[0].streetAddress});
                console.log("restaurantName",this.state.address);
            })
            //.then(this.getSpecials())
        
    }
    componentDidMount() {
        this.getSpecials();
      }
    getSpecials= () =>{
        //Gets the users current specials.
        axios.get('/api/mySpecials/:nickname', {
            params: {
                nickname: this.state.nickname
            }
        })
            .then((response) => {
                this.setState({mySpecials: response.data})
                console.log("MySpecials",this.state.mySpecials)
                
            }).catch(function (error) {
                console.log(error);
            });
        //console.log("from state: " + this.state.profile);
    }
    
    deleteSpecial = id => {
        axios.delete('/api/delete/:id', {
          params: {id: id}
        })
        .then(res => this.getSpecials())
      }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        //console.log(event.target.value);
    }
    handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/regularSpecial', {
            nickname: this.state.nickname,
            weekday: this.state.weekday,
            description: this.state.description,
            price: this.state.price,
            city: this.state.city,
            address: this.state.address,
            restaurantName: this.state.restaurantName
        }) 
        .then(res => this.getSpecials())
    }

    render() {
        return (
            <div>
                <div className="card offset-md-3 col-6">
                    <header>
                        <h1>Submit your specials here</h1>
                    </header>
                    <form onSubmit={this.handleSubmit} className="regularSpecialSubmit">
                        <label className="">
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
                    {this.state.mySpecials.length ? (
                        <div>
                            {this.state.mySpecials.map(special =>
                                <div key={special._id}>
                                    <div className="card card-margin">
                                        <div className="card-header heading-text">{special.weekday}
                                        </div>
                                        <div className="row">
                                            <h3 className="col-6 card-text">{special.description}</h3>
                                            <h3 className="col-2 card-text">Price: ${special.price}</h3>
                                            <button onClick={() => this.deleteSpecial(special._id)} >Delete</button>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                            ) : (
                                <h3 className="offset-md-4">Welcome to DailySpecial! Enter your first special to get started.</h3>
                    )}
                </div>
            </div>
            
        );
    }

}

export default createSpecial;

