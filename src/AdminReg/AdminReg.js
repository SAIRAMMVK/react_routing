import React, { Component } from 'react';
import './AdminReg.css'
class AdminReg extends Component {

    constructor(props) {

        super(props);
        this.state = {
            adminId:"",
            isValid: 'false',
            eventname: '',
            eventname_error: "false",
            eventSkills: [],
            eventSkills_error: 'false',
            eventLocation: [],
            eventLocation_error: 'false',
            eventReg_details: {
                eventsname: '',
                date: "",
                start_time: "",
                end_time: "",
                eventsLocation: "",
                eventsSkills: ""
            }
        }
        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {

        console.log("id" + this.props);
        var self = this;
        var skillName = [];

        fetch("https://islot-7edda.firebaseio.com/Skill_mngmn.json").then(res => res.json())
            .then(
                function (data) {
                    //console.log(data);
                    var keys = Object.keys(data);
                    for (var i = 0; i < keys.length; i++) {
                        var k = keys[i];
                        if (skillName.indexOf(data[k].SkillName) == -1) {
                            skillName.push(data[k].SkillName);
                            console.log(data[k].SkillName);
                        }

                    }
                    self.setState({
                        eventSkills: skillName
                    });

                }
            );
    }
    submit() {

        var start_time = "6.00am";
        var end_time = "11.00pm";
        var startTimeArray = start_time.split('.');
        var endTimeArray = end_time.split('.');
        var startTimeValue = parseInt(startTimeArray[0]);
        var endTimeValue = parseInt(endTimeArray[0]);

        var checkAmOrPm1 = start_time.substring(start_time.length - 2, start_time.length);
        var checkAmOrPm2 = end_time.substring(end_time.length - 2, end_time.length)


        // console.log(startTimeArray);
        // console.log(endTimeArray);
        // console.log(startTimeValue);
        // console.log(endTimeValue);
        // console.log(checkAmOrPm1);
        // console.log(checkAmOrPm2);

        var slotObject = [];
        var count = 0;
        var obj = {
            startTime: "",
            endTime: "",
            noOfInterviewsEnrolled: [
                {
                    id: "",
                    noOfInterviewsTaken: ""
                }
            ]
        }
        var st, et;

        if (checkAmOrPm1 == "am" && checkAmOrPm2 == "pm") {
            var diff = Math.abs(startTimeValue - (12 + endTimeValue));
            console.log(diff);

            count = Math.floor(diff / 2);
            for (var i = 0; i < count; i++) {
                if (startTimeValue + 2 < 12) {
                    st = startTimeValue + ":am";
                    et = startTimeValue + 2 + ":am";
                    startTimeValue += 2;
                }
                else if (startTimeValue + 2 >= 12) {
                    if (startTimeValue < 12)
                        st = startTimeValue + ":am";
                    else if(startTimeValue==12)
                    {
                        st ="12:pm"; 
                    }
                    else
                        st = Math.abs(12 - startTimeValue) + ":pm";
                    if (startTimeValue + 2 == 12)
                        et = "12:pm";
                    else
                        et = startTimeValue + 2 - 12 + ":pm";
                    startTimeValue += 2;

                }

                obj ={
                    startTime:st,
                    endTime:et,
                    noOfInterviewsEnrolled:
                    {
                        id:"",
                        noOfInterviewsTaken:""
                    }
                }
                slotObject.push(obj);

               // console.log(st + "  " + et);


            }
        }
        else if (checkAmOrPm1 == "pm" && checkAmOrPm2 == "am") {
            var diff = Math.abs(startTimeValue - (12 + endTimeValue));
            count = Math.floor( diff / 2);

            console.log(diff);
            for (var i = 0; i < count; i++) {

                if (startTimeValue + 2 < 12) {
                    st = startTimeValue + ":pm";
                    et = startTimeValue + 2 + ":pm";
                    startTimeValue += 2;
                }
                else if (startTimeValue + 2 >= 12) {
                    if (startTimeValue <= 12)
                        st = startTimeValue + ":pm";
                    else
                        st = Math.abs(12 - startTimeValue) + ":am";

                    et = startTimeValue + 2 - 12 + ":am";
                    startTimeValue += 2;
                }
                
                obj ={
                    startTime:st,
                    endTime:et,
                    noOfInterviewsEnrolled:
                    {
                        id:"",
                        noOfInterviewsTaken:""
                    }
                }
                slotObject.push(obj);

               // console.log(st + " " + et);
            }
        }
        else {
            diff = Math.abs(startTimeValue - endTimeValue);
            count = diff / 2;
            for (var i = 0; i < count; i++) {
                st = startTimeValue + checkAmOrPm1;
                et = startTimeValue + 2 + checkAmOrPm1;

                
                obj ={
                    startTime:st,
                    endTime:et,
                    noOfInterviewsEnrolled:
                    {
                        id:"",
                        noOfInterviewsTaken:""
                    }
                }
                slotObject.push(obj);
              //  console.log(st + "  " + et);
                startTimeValue += 2;


            }
        }
        console.log(slotObject);
        
            fetch('https://perl-react-project.firebaseio.com/event.json', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        startTime:"9.00am",
                        endTime: "1.00pm",
                        eventDate: "07/29/2018",
                        eventName: "C walk-in",
                        id: "05",
                        isClosed: "false",
                        location: "hyderabad",
                        skill: "C",
                        slots: slotObject
                    }
                )
            }).then(res => res.json())
                .then(res => console.log(res));
        }
    

    checkEventName(value) {
        if (value != "") {
            return true;
        }
        else {
            return false;
        }
    }
    checkNameContainsNumber(value) {
        for (var i = 0; i < value.length; i++) {
            if (value[i] >= 0 && value[i] <= 9)
                return true;
        }
        return false;
    }
    checkSkills(value) {

        if (value.length != 0) {
            document.getElementById("skills_error").innerHTML = "";
            return true;

        }
        else {
            return false;
        }
    }




    eventName_error() {
        document.getElementById("eventname_error").innerHTML = "Name is required";
    }
    nameContainsNumber_error() {
        document.getElementById("eventname_error").innerHTML = "no number to be used";
    }
    // eventSkills_error()    
    // {
    //     document.getElementById("eventSkills_error").innerHTML ="skills is required";
    // }
    // eventLocation_error()    
    // {
    //     document.getElementById("eventLocation_error").innerHTML ="location is required";
    // }

    change(name, e) {
        if (name == "eventSkills" || name == "eventLocation") {
            var options = e.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            console.log(value);
        }
        else {
            var value = e.target.value;
        }
        this.setState(
            {
                [name]: value
            }
        );

        this.validate(name, value);
    }




    validate(name, value) {
        if (name == "eventname") {
            if (!this.checkEventName(value)) {
                this.eventName_error();
            }
            else if (this.checkNameContainsNumber(value)) {
                this.nameContainsNumber_error();
            }
            else {
                this.setState({
                    eventReg_details:
                        {
                            eventsname: value,
                        },
                    eventname: value,
                    eventname_error: 'true',
                });
            }
            //  console.log(value);
            // console.log(this.state.name);
            //console.log(this.state.interviewer_details.uname);

        }

        //     else if(name == "eventskills")
        //     {
        //          if(!this.checkSkills(value))
        //          {
        //              this.skills_error();
        //          }

        //          else{
        //              this.setState({
        //                 eventReg_details : 
        //                 {
        //                     eventsSkills : value,  
        //                 },
        //                  eventSkills : value,
        //                  eventSkills_error : 'true'
        //              })
        //          }
        //         //  console.log(value);
        //         //  console.log(this.state.eventSkills);
        //      }
        //     else if(name == "eventlocation")
        //     {
        //          if(!this.eventCheckLocation(value))
        //          {
        //              this.eventlocation_error();
        //          }

        //          else{
        //              this.setState({
        //                 eventReg_details : 
        //                 {
        //                    eventsLocation : value,  
        //                 },
        //                  eventLocation : value,
        //                  eventLocation_error : 'true'
        //              })
        //          }
        //         //  console.log(value);
        //         //  console.log(this.state.eventLocation);
        //      }
    }

    render() {
        return (
            <div>
                <h3>Drive Registration</h3>
                <div className="container1">
                    <div >
                        <label class="control-label col-sm-2" htmlfor="dname">Name</label>
                        {/* <label class="control-label col-sm-2" htmlfor="uname">Username</label> */}
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="dname" name="eventname" placeholder="Enter Drivename" onChange={this.change.bind(this, 'eventname')} /><br />
                        </div>
                        {this.state.eventName_error && <span id="eventname_error"></span>}
                    </div>
                    <div >
                        <label class="control-label col-sm-2" htmlfor="date">Date</label>
                        <div class="col-sm-10">
                            <input type="Date" class="form-control" id="ddate" placeholder="Enter DriveDate" /><br />
                        </div>
                    </div>
                    <div >
                        <label class="control-label col-sm-2" htmlfor="stime">Start Time</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="stime" placeholder="Enter Start Time" /><br />
                        </div>
                    </div>
                    <div >
                        <label class="control-label col-sm-2" htmlfor="etime">End Time</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="etime" placeholder="Enter End Time" /><br />
                        </div>
                    </div>
                    <div>
                        <label htmlfor="skills" class="control-label col-sm-2" id="slab" name="eventSkills">Skills</label>
                        <select multiple class="col-xs-2" name="eventSkills" onChange={this.change.bind(this, 'eventSkills')}>
                            {this.state.eventSkills.map(function (skill) {
                                return (<option value={`${skill}`}>{skill}</option>);
                            })}

                        </select>
                    </div>
                    {this.state.eventSkills_error && <span id="eventSkills_error"></span>}
                    <div>
                        <label htmlfor="location" class="control-label col-sm-2" id="llab" name="eventLocation">Location</label>
                        <select multiple class="col-xs-2" name="eventlocation" onChange={this.change.bind(this, 'eventLocation')}>
                            <option value="Chennai">Chennai</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Pune">Pune</option>
                        </select></div>
                    {this.state.eventLocation_error && <span id="eventLocation_error"></span>}


                    <div class=" col-xs-10">
                        <button type="reset" class="btn btn-primary">Clear</button>
                        <button onClick={this.submit} type="submit" class="btn btn-primary">Create Event</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default AdminReg;  