import React, { Component } from 'react';
import './Interviewer_Event.css';
import { Link } from 'react-router-dom';

class Interviewer_Event extends Component {
    constructor(props) {
        super(props);
        this.state = {

            slots: [
                {
                    endTime: "",
                    id: "",
                    noOfInterviewsEnrolled: [
                        {
                            noOfInterviewsTaken: "",
                            userid: ""
                        }
                    ],
                    startTime: ""
                }

            ]
        }
        this.toogle = this.toogle.bind(this);

        this.update = this.update.bind(this);
    }

    toogle() {

    }
    update() {

    }
    componentDidMount() {
        var key = this.props.location.state.key;


        var data = this.props.location.state.slotData;
        console.log(data[0].endTime);
        console.log(data[0].noOfInterviewsEnrolled);


        this.setState({

            slots: [
                {
                    endTime: data.endTime,
                    startTime: data.startTime,
                    id: data.id,
                    noOfInterviewsEnrolled: [
                        {
                            noOfInterviewsTaken: data.noOfInterviewsEnrolled,
                            userid: data.userid
                        }
                    ],



                }]
        });



    }


    render() {
        let my = this;
        return (
            <div id="IE_body">

                <div class="container box1">

                    <div class="row">
                        <div class="col-lg-3"><p id="IE_time1"><i class="fas fa-clock">&nbsp; &nbsp; </i> <span id="IE_time2">{this.state.slots[0].endTime}</span></p></div>
                        {my.state.slots.map(function (data) {

                            return (<div>
                                <div class="col-lg-3"> <p id="IE_count">{}</p></div>
                                <div class="col-lg-3">
                                    <div id="IE_tog">
                                        <label class="switch">
                                            <input type="checkbox" onClick={my.toogle} />
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
