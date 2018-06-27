import React, { Component } from 'react';
import './Interviewer_Event.css';
import { Link } from 'react-router-dom';

class Interviewer_Event extends Component {
    constructor(props) {
        super(props);
        this.state = {

            slots: [
                {
                    endTime: "10:00am",
                    id: "1",
                    noOfInterviewsEnrolled: [
                        {
                            noOfInterviewsTaken: "10",
                            userid: "2"
                        }
                    ],
                    startTime: "6:00am"
                }

            ]
        }
        this.toogle = this.toogle.bind(this);

        this.update = this.update.bind(this);
    }

    toogle(id) {
        console.log(id)
        var d  = this.state.slots[id].noOfInterviewsEnrolled[0].noOfInterviewsTaken;
        console.log(d);
              
        //    this.setState({
        //        noOfInterviewsEnrolled:
        //    });
    }
    update() {

    }
    componentDidMount() {
        var key = this.props.location.state.key;


        var data = this.props.location.state.slotData;
        console.log(data)
        console.log(data[0].endTime);
      console.log(data[0].noOfInterviewsEnrolled[0].noOfInterviewsTaken)
      console.log(this.state.slots[0].noOfInterviewsEnrolled[0].noOfInterviewsTaken)

        this.setState({

            slots: [
                {
                    endTime: data[0].endTime,
                    startTime: data[0].startTime,
                    id: data[0].id,
                    noOfInterviewsEnrolled: [
                        {
                            noOfInterviewsTaken: "9",
                            userid: "1"
                        }
                    ],



                },
                {
                    endTime: data[0].endTime,
                    startTime: data[0].startTime,
                    id: data[0].id,
                    noOfInterviewsEnrolled: [
                        {
                            noOfInterviewsTaken: "10",
                            userid: "1"
                        }
                    ],



                }]
        });



    }


    render() {
        let my = this;
        let count =0;
        return (
            <div id="IE_body">

                <div class="container box1">

             {/* fhfg {this.state.slots[0].noOfInterviewsEnrolled[0].noOfInterviewsTaken} */}
                
          
                    <div class="row">
                        {my.state.slots.map(function (data) {

                          

                            return (<div>
                        <div class="col-lg-3"><p id="IE_time1"><i class="fas fa-clock">&nbsp; &nbsp; </i> <span id="IE_time2">{data.startTime} - {data.endTime}</span></p></div>
                                
                                <div class="col-lg-3"> <p id="IE_count">{
                                    data.noOfInterviewsEnrolled.map(function(d)
                                {
                                    return ( 
                                        <h1>{ d.noOfInterviewsTaken}</h1>
                                    )
                                })
                                }</p></div>
                                <div class="col-lg-3">
                                    <div id="IE_tog">
                                        <label class="switch">
                                            <input type="checkbox"  onClick={my.toogle.bind(this,count++)} />
                                            <span class="slider round" ></span>
                                        </label></div>
                                </div>
                                <div class="col-lg-3">
                                    <h4 id="IE_tot"> <span >Total Interviews </span>
                                        <input type="text" class="form-control" id="IE_total" />
                                    </h4>
                                </div>
                            </div>
                            
                            );

                        })}

 </div>


           </div>
                    

                

                <button id="IE_upd" type="button" class="btn btn-lg btn-success" onClick={my.update}>
                    Update
                </button>
               
 </div>

        );
    }

}
export default Interviewer_Event;
