import React, { Component } from 'react';
import './App.css';

import Form from './DriveRegistration/DriveRegistration';
import './DriveRegistration/DriveRegistration.css';
import AdminDashboard from './admin/AdminDashboard';
import Interviewer_Dashboard from './Interviewer_Dashboard/Interviewer_Dashboard';
import AdminSignup from './AdminSignup/AdminSignup';
import Event_Detail from './Event_Detail/Event_Detail';
import Interviewer_Event from './Interviewer_Event/Interviewer_Event';
// import fire from './Fire';
import HomePage from './HomePage/HomePage';
import MainLocation from './admin/Location_Management/main_location';
import MainSkill from './admin/Skill_Management/main_skill';

import InterviewerReg from './interviewer/registration';
// import HomePage from './HomePage/HomePage';
import Chart from './admin/analytics';
import AdminReg from './AdminReg/AdminReg';
import Header from './common/header';
import Profile from './common/profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
class App extends Component {
  constructor() {
    super();
    // this.state = {
    //   speed:10
    // }

    this.state = {
      user: {}
    }
  }
  componentDidMount() {
    // this.authListener();
  }
  authListener() {
    // fire.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({
    //       user
    //     });
    //   }
    //   else {
    //     this.setState({
    //       user: null
    //     });
    //   }
    // });
  }
  // componentDidMount()
  // {
  //   const  rootRef = fire.database().ref().child('react');
  //   console.log(rootRef);
  //   const speedRef = rootRef.child('speed');
  //   speedRef.on('value',snap =>{
  //     this.setState({
  //       speed:snap.val()
  //     });
  //   });

  // }
  render() {
    return (


        <Router>
      <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/signup_interview" component={InterviewerReg} />
            <Route path="/signup_admin" component ={AdminSignup} />
            <Route path="/adminReg" component={AdminReg} />
            <Route path="/interview_dash" component={Interviewer_Dashboard} />
            <Route path="/EventDetail" name="id" component={Interviewer_Event} />
            <Route path="/Admin_Dash" component={AdminDashboard} />
            <Route path="/Admin_Event" component={Event_Detail}/>
            <Route path="/charts" component={Chart}/>
           
            <Route path="/createEvent" component={Form}/>
            <Route path="/skill" component={MainSkill} />
            <Route path="/location" component={MainLocation} />
            <Route path="/profile" component={Profile} />
      </div>
        </Router>
  

 
    );
  }
}

export default App;
