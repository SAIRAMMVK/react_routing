import React, { Component } from 'react';
import './App.css';

import Form from './DriveRegistration/DriveRegistration';
import './DriveRegistration/DriveRegistration.css';
import AdminDashboard from './admin/AdminDashboard';
import Interviewer_Dashboard from './Interviewer_Dashboard/Interviewer_Dashboard';
import Event_Detail from './Event_Detail/Event_Detail';
import Interviewer_Event from './Interviewer_Event/Interviewer_Event';
// import fire from './Fire';
import HomePage from './HomePage/HomePage';
import AdminReg from './admin/admin-registration';
import InterviewerReg from './interviewer/registration';
// import HomePage from './HomePage/HomePage';
import Chart from './admin/analytics';
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
            <Route path="/signup_admin" component={AdminReg} />
            <Route path="/interview_dash" component={Interviewer_Dashboard} />
            <Route path="/EventDetail" component={Interviewer_Event} />
            <Route path="/Admin_Dash" component={AdminDashboard} />
            <Route path="/Admin_Event" component={Event_Detail}/>
            <Route path="/charts" component={Chart}/>
           
            <Route path="/createEvent" component={Form}/>
            <Route path="/skill" component={HomePage} />
            <Route path="/location" component={HomePage} />
            <Route path="/profile" component={HomePage} />
      </div>
        </Router>


    );
  }
}

export default App;
