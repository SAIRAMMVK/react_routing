import React, { Component } from 'react';
import './Event_Detail.css';
let self = this;
class Event_Detail extends Component {

  constructor()
  {
    super();
    this.state = {
      slots:[
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
    this.points = this.points.bind(this);
  }
  points(user)
  {
   
     var key = this.props.location.state.key;
      console.log(user);

    fetch("https://perl-react-project.firebaseio.com/user.json").then(res =>res.json())
    .then(function(data)
    {
    
          var keys = Object.keys(data);
          for(var i=0;i<keys.length;i++)
          {
            var k = keys[i];
           
            const someid = data[k].id;
            
           
              if(someid==user)
              {
              data =  data[k].points + 10;

              fetch("https://perl-react-project.firebaseio.com/user/"+ keys[i]+".json", {
                method: 'PUT',
        
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
              
               
                return res;
            }).catch(err => err);
    
              }


          }
        
        
        
    })
  }

    componentDidMount()
    {
      var self  = this;
      var key = this.props.location.state.key;
      console.log(key);
      fetch("https://perl-react-project.firebaseio.com/event/"+key+".json").then(res => res.json())
      .then(function(data)
    {
      console.log(data);
       self.setState({
         slots:data.slots
       });

    })

    }
  render() {

    let self = this;
    return (
      <div >
        
        <nav id="ID_head_nav" class="navbar navbar-inverse">
          <div class="container-fluid">
         
            <div class="navbar-header">
              <span id="ID_topic">Islot </span>
            </div>
            <span id="ID_main_head">Angular walk in</span>

            <div class="dropdown" id="ID_settings_page">
              <a class="dropdown-toggle" type="button" data-toggle="dropdown"><i id="ID_settings" class="fas fa-cogs"></i>
              </a>
              <ul class="dropdown-menu">
                <li><a id="ID_settings_name" href="#">Profile settings</a></li>
                <li><a id="ID_settings_name" href="#">Location Management</a></li>
                <li><a id="ID_settings_name" href="#">Skill Management</a></li>
              </ul>
            </div>

          </div>


        </nav>

        <ul class="nav nav-pills">
          <li class="active"><a data-toggle="pill" href="#ED_view"><span id="ED_V">View</span></a></li>
          <li><a data-toggle="pill" href="#ED_update"><span id="ED_U">Update</span></a></li>

        </ul>
        
        <div class="tab-content">
        {self.state.slots.map(function(data)
          {
             return(
               <div>
              <div id="ED_view" class="tab-pane fade in active">
              <div class="container" id="ED_viewpage">

              
                <h3 id="ED_timeslots">{data.startTime} - {data.endTime}</h3>
              <span id="vada" class="btn">{data.noOfInterviewsEnrolled.length}</span>
                
                </div>
                <div class="row" id="ED_inside">
                {data.noOfInterviewsEnrolled.map(function(d)
                {
                  return (
                  <div class="col-lg-6" id="ED_insidecontent">
                  <i class="fas fa-user-circle" id="ED_inside_i"></i>
                  <span id="ED_inside_span"> {d.username}</span>
                </div>
                  )
                })}
                
              </div>

                </div>
                </div>
             )
          })}
          
           

              </div>
          

          
          <div id="ED_update" class="tab-pane fade">
            <div class="container row" id="ED_updatepage">

            {self.state.slots.map(function(data)
            {
               return (
                 data.noOfInterviewsEnrolled.map(function(d)
                {
                   return (
                       <div>

                         <div class="col-lg-4">
                <h4 id="ED_name">  {d.username}  </h4>
              </div>
              <div class="col-lg-4">
                <h4 id="ED_updatepoints"><span>  {d.noOfInterviewsTaken}</span>  </h4>
              </div>
              <div class="col-lg-4">
                <button class="btn  btn-primary" id="ED_update" onClick={self.points.bind(this,d.id)}>Approve</button>
                            </div>
                         </div>
                   )
                })
               )
            })}
              
              </div>
              <button id="ED_updatebutton" class="btn btn-lg btn-success">Close Event</button>
            </div>

          </div>
        
        );
      }
    }
    
    export default Event_Detail;
