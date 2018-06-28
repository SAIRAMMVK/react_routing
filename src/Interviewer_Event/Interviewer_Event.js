import React, { Component } from 'react';
import './Interviewer_Event.css';
import { Link } from 'react-router-dom';

class Interviewer_Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Interested:"",
         value :0,
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

            ],
            slotId:"",
            getToogle:"false"
            
        }
        this.toogle = this.toogle.bind(this);

        this.update = this.update.bind(this);
        this.call = this.call.bind(this);
    }
    call(e)
    {
        var d = parseInt(this.state.value) + parseInt(e.target.value);

    this.setState(
        {
            value:d
        }
    )
    }

    toogle(id) {

        this.setState({
            slotId:id,
            getToogle:true
        });

        var self = this;
        
        // console.log(id)
        // var d  = this.state.slots[id].noOfInterviewsEnrolled[0].noOfInterviewsTaken;
        // console.log(d);
              
        //    this.setState({
        //        noOfInterviewsEnrolled:
        //    });

        var key = this.props.location.state.key;
         var uid = this.props.location.state.userid;
         var username = this.props.location.state.username;
         console.log("username" + username);
    
      var changedData
        console.log(key);

        fetch("https://perl-react-project.firebaseio.com/event/"+ key+ ".json").then(res =>res.json())
        .then(function(data)
    {

          //console.log(data)

        var index = -1;
        var count = 0;

        console.log(data.slots[id]);
        
       var s = data.slots[id].noOfInterviewsEnrolled;

       for(var i=0;i<s.length;i++)
       {
           if(s[i].id==uid)
             index=i;
       }
    var d ;

    console.log(index);
    console.log("id " + uid)
    if(index==-1)
    {
  data.slots[id].noOfInterviewsEnrolled.push({
         id:uid,
         username:username,
         noOfInterviewsTaken:0
    })
}
else{
d = data.slots[id].noOfInterviewsEnrolled[index].noOfInterviewsTaken +=1;

}

    
    
       
    data.Interested +=1;
    data.id=uid;
    self.setState({
        Interested:data.Interested
        
    });
    
      fetch("https://perl-react-project.firebaseio.com/event/"+key+".json", {
            method: 'PUT',
    
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
          
           
            return res;
        }).catch(err => err);
    
    })
       

    

       

    // console.log(dt);


    }
    update() {

        var key = this.props.location.state.key;
        var uid = this.props.location.state.userid;
        var username = this.props.location.state.username;
        var v = this.state.value;
        
        
           if(this.state.getToogle==true)
           {
           fetch("https://perl-react-project.firebaseio.com/event/"+key+".json").then(res => res.json())
           .then(data =>
        {
            
            var slotid  = this.state.slotId;
            
        var index = -1;
  

      
        
       var s = data.slots[slotid].noOfInterviewsEnrolled;

       for(var i=0;i<s.length;i++)
       {
           if(s[i].id==uid)
             index=i;
       }
       console.log(index);
     
       
      
       if(index==-1)
       {
        data.slots[slotid].noOfInterviewsEnrolled.push({
            id:uid,
            username:username,
            noOfInterviewsTaken:0
       })
       }
       else{
       data.slots[slotid].noOfInterviewsEnrolled[index].noOfInterviewsTaken +=v;
       }

       
      fetch("https://perl-react-project.firebaseio.com/event/"+key+".json", {
        method: 'PUT',

        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
      
       
        return res;
    }).catch(err => err);

        })
           }
    }
    componentDidMount() {
   
    var self = this;
 console.log(this.props);


        var data = this.props.location.state.slotData;
        var key = this.props.location.state.key;
        console.log(key)


            fetch("https://perl-react-project.firebaseio.com/event/"+ key+".json").then(res => res.json())
            .then(function(data)
        {
                    self.setState({
                        slots:data.slots
                    });
        })

      
    //     console.log(data)
    //     console.log(data[0].endTime);
    //   console.log(data[0].noOfInterviewsEnrolled[0].noOfInterviewsTaken)
    //   console.log(this.state.slots[0].noOfInterviewsEnrolled[0].noOfInterviewsTaken)

        // this.setState({

        //     slots: [
        //         {
        //             endTime: data[0].endTime,
        //             startTime: data[0].startTime,
        //             id: data[0].id,
        //             noOfInterviewsEnrolled: [
        //                 {
        //                     noOfInterviewsTaken: "9",
        //                     userid: "1"
        //                 }
        //             ],



        //         },
        //         {
        //             endTime: data[0].endTime,
        //             startTime: data[0].startTime,
        //             id: data[0].id,
        //             noOfInterviewsEnrolled: [
        //                 {
        //                     noOfInterviewsTaken: "10",
        //                     userid: "1"
        //                 }
        //             ],



        //         }]
        // });



    }


    render() {
        let my = this;
        let count =-1;
        return (
          

             

                
          
                   <div>
                       

                          

                                {my.state.slots.map(function (data,i) {
                                    
                                
                            return (
                                <div>
                                  <div id="IE_body">
                                   <div class="container box1">
                                  <div class="row">
                        <div class="col-lg-3"><p id="IE_time1"><i class="fas fa-clock">&nbsp; &nbsp; </i> <span id="IE_time2">{data.startTime} - {data.endTime}</span></p></div>
                                
                                <div class="col-lg-3"> <p id="IE_count">{data.noOfInterviewsEnrolled.length}</p></div>
                                <div class="col-lg-3">
                                    <div id="IE_tog">
                                        <label class="switch">
                                            <input type="checkbox"  onClick={my.toogle.bind(this,i)} />
                                            <span class="slider round" ></span>
                                        </label></div>
                                </div>
                                <div class="col-lg-3">
                                    <h4 id="IE_tot"> <span >Total Interviews </span>
                                        <input type="text" class="form-control" id="IE_total" onChange={my.call} />
                                    </h4>
                                </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            
                            );

                        })}




       
                    

                

                <button id="IE_upd" type="button" class="btn btn-lg btn-success" onClick={my.update}>
                    Update
                </button>
               
 </div>

        );
    }

}
export default Interviewer_Event;