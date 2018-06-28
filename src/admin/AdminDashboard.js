import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './AdminDashboard.css';
class AdminDashboard extends Component {
    constructor() {
        super();
        this.state = {
            adminId:"",
            recentEventArray: [
                {
                    endTime: "2.00pm",
                    eventDate: "06/20/2018",
                    eventName: "Angular walk-in",
                    id: "01",
                    key:"",
                    adminId:"",
                    isClosed: "false",
                    location: "hyderabad",
                    skill: "Angular",
                    startTime: "9.00am",
                    slots: [
                        {
                            endTime: "10.00am",
                        
                            noOfInterviewsEnrolled: [
                                {
                                    noOfInterviewsTaken: "15",
                                    id: "1",
                                    username:"mani"
                                }
                            ],
                            startTime: "9.00am"
                        }

                    ]
                }
            ],
            upcomingEventArray : [
                {
                    endTime: "2.00pm",
                    eventDate: "06/20/2018",
                    eventName: "Angular walk-in",
                    id: "01",
                    key:"",
                    adminId:"",
                    isClosed: "false",
                    location: "hyderabad",
                    skill: "Angular",
                    startTime : "12.00pm",
                    slots: [  
                        {
                            endTime: "10.00am",
                            
                            noOfInterviewsEnrolled: [
                                {
                                    noOfInterviewsTaken: "15",
                                    id: "1",
                                    username:"kumar"
                                }
                            ],

                            startTime: "9.00am"
                        }

                    ]
                }
            ]
        }
    }
    signOut() {
        // fire.auth().signOut();
        // console.log(this.state.recevent);
    }
    componentDidMount() {

        console.log(this.props);
        var adminId = this.props.location.state.userid;
        this.setState({
               adminId:adminId
        });
        const self = this;
        var recevent = {};
        var upevent = {};
        var i1 = 0, i2 = 0;
        var event = {};
        fetch("https://perl-react-project.firebaseio.com/event.json").then(res => res.json())
            .then(function (data) {
                ///  console.log(data);
                var keys = Object.keys(data);
                for (var i = 0; i < keys.length; i++) {
                    var  k = keys[i];
                    var date = data[k].eventDate;
                    var d1 = date.split('/');
                    var gm = d1[0];
                    var gd = d1[1];
                    var gy = d1[2];

                    var d = new Date().toLocaleString();
                    d1 = d.split('/');
                    var cm = d1[0];
                    var cd = d1[1];
                    var cy = d1[2];
                    //  console.log(cd);


                    // if ((Math.abs(cm - gm) == 0 && ((cd -gd) <= 0)||((cd-gd) > -5))){
                        console.log("ids " + data.adminId + "  " + self.state.adminId)

                    
                        //recent events 
                        if(Math.abs(cm-gm)==0 &&  (gd-cd<-7  || gd-cd <=0))
                        {

                        recevent[i1] = data[k];
                        i1++;
                        console.log("recent");
                    }
                    else
                    {
                        //upcoming events
                        upevent[i2] = data[k];
                        i2++;
                        console.log("upcoming");

                    }
                

                }
                console.log(Object.keys(recevent).length);
                console.log(Object.keys(upevent).length);
                //console.log(recevent.size);
                var  keyData = Object.keys(data);
                
                for (var x = 0; x < Object.keys(recevent).length; x++) {
                    const recEventObj = {
                        id: x,
                    key:keyData[x],
                    startTime: recevent[x].startTime,
                    endTime: recevent[x].endTime,
                    eventDate: recevent[x].eventDate,
                    eventName: recevent[x].eventName,
                    isClosed: recevent[x].isClosed,
                    location: recevent[x].location,
                    skill: recevent[x].skill,
                    slots: [
                        {
                            endTime: recevent[x].endTime,
                            id: x,
                            noOfInterviewsEnrolled: [
                                {
                                    noOfInterviewsTaken: recevent[x].noOfInterviewsEnrolled,
                                    id: recevent[x].id
                                }
                            ],
                            startTime: recevent[x].startTime

                        
                    }]
                    }
                    const joined = self.state.recentEventArray.concat(recEventObj);

                    self.setState({
                        recentEventArray: (joined)
                    });

                }
                var  keyData = Object.keys(data);

                console.log(keyData)
                
                for (var x = 0; x < Object.keys(upevent).length; x++) {
                    const upEventObj = {
                        id: x,
                    key:keyData[x],                        
                   startTime: upevent[x].startTime,    
                    endTime:   upevent[x].endTime,
                    eventDate: upevent[x].eventDate,
                    eventName: upevent[x].eventName,
                    isClosed:  upevent[x].isClosed,
                    location:  upevent[x].location,
                    skill:     upevent[x].skill,
                    slots: [
                        {
                            endTime: upevent[x].endTime,
                            id: x,
                            noOfInterviewsEnrolled: [
                                {
                                    noOfInterviewsTaken: upevent[x].noOfInterviewsEnrolled,
                                    id: upevent[x].id
                                }
                            ],
                            startTime: upevent[x].startTime

                        
                    }]
                    }
                    const joined = self.state.upcomingEventArray.concat(upEventObj);
                    console.log(joined);

                    self.setState({
                        upcomingEventArray: (joined)
                    });

                }
                //console.log(self.state.recentEventArray);
                // this.check(recevent);
            }
            )





        //console.log(this.state.recentEventArray);
    }

    
    render() {

        var self = this;

        return (
            <div>
                <nav id="ID_head_nav" class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <span id="ID_topic">Islot </span>
                        </div>
                        <span id="ID_main_head">Admin Dashboard</span>
                        <button class="btn btn-primary"><li><Link to="/adminReg" id="ID_settings_name" >create Event</Link></li></button>

                        <div class="dropdown" id="ID_settings_page">
                            <a  class="dropdown-toggle" type="button" data-toggle="dropdown"><i id="ID_settings" class="fas fa-cogs"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a id="ID_settings_name" href="#">Profile settings</a></li>
                                <li><a id="ID_settings_name" href="#">Location Management</a></li>
                                <li><a id="ID_settings_name" href="#">Skill Management</a></li>
                               
                            </ul>
                        </div>
                        <button id="ID_logout"class="btn btn-danger" onClick={this.signOut}><Link to="/">Logout</Link></button>

                    </div>


                </nav>
                <div  class="row">
                    <div id="ID_box_container"class="col-lg-9 line">
                        <h3 id="ID_rec">Recent Events </h3>
                        <div class="row">
                        {this.state.recentEventArray.map(function (data) {
                              
                              return (  <div id="ID_card" class="col-lg-3">
                                    <h3 id="ID_card_heading">{data.eventName}</h3>
                                    <h4 id="ID_card_date">{data.eventDate}</h4>
                                    <h4 id="ID_card_start_time">Start Time: <span id="ID_st">{data.startTime}</span></h4>
                                    <h4 id="ID_card_stop_time">End Time: <span id="ID_et">{data.endTime}</span></h4>
                                    <button id="ID_view_data" type="button" class="btn btn-lg btn-success"    >
                                    <Link to={{ pathname: '/Admin_Event', state: { 
                                         key:data.key,
                                      //  key:"-LG-qV3AWXOgl672h5Q2",
                                        slotData:data.slots,
                                        userid:self.state.adminId,
                                        username:self.props.location.state.username
                                        
                                 
                } }}>Click</Link> 
                                    </button>
                                </div>)
                            }) }
                        

                        </div>
                        
                </div>





                <div id ="ID_box_container">
                    <h3 id="ID_rec">up event<div> </div></h3>
                    <div class="row">
                    {this.state.upcomingEventArray.map(function (data) {
                              
                              return (  <div id="ID_card" class="col-lg-3">
                                    <h3 id="ID_card_heading">{data.eventName}</h3>
                                    <h4 id="ID_card_date">{data.eventDate}</h4>
                                    <h4 id="ID_card_start_time">Start Time: <span id="ID_st">{data.startTime}</span></h4>
                                    <h4 id="ID_card_stop_time">End Time: <span id="ID_et">{data.endTime}</span></h4>
                                    <button id="ID_view_data"  type="button" class="btn btn-lg btn-success"><Link to="/eventDetail">click</Link></button>
                                </div>)
                            }) }
                    </div>
                </div>


            </div>
            </div>
        );
    }
}

export default AdminDashboard;