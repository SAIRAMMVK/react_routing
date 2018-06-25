import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './admin-registration.css';
import {Link} from 'react-router-dom';
export default class AdminReg extends Component {
    
    
    constructor(){
        super();
        this.state={
           fields:{},
           errors:{},
           skills:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event){
        let fields = this.state.fields;
        let field = event.target.name;
        if(field==="skills"){
            var options = event.target.options;
            var value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            fields[field]=value;
        }
        else{
            fields[field]=event.target.value;
        }
        this.setState({
            fields
        });
    }

    handleSubmit(event){
        console.log(this.state.fields);
        event.preventDefault();
        console.log(this.state.fields["skills"])
        
        if(this.handleValidation()){
        
        fetch('https://perl-react-project.firebaseio.com/user.json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    "Email":this.state.fields.email,
                    "Mobile":this.state.fields.mobile,
                    "Name":this.state.fields.name,
                    "Password":this.state.fields.password,
                    "Skills":this.state.fields.skills
                    
            })
            })
        }

        else{
            alert("Form has errors");
            fetch("https://perl-react-project.firebaseio.com/user.json").then(response=>response.json())
           .then(data =>{
              console.log(Object.keys(data));
            var l = Object.keys(data);
            for(var i=0;i<l.length;i++)
            {
                var  k = l[i];
                console.log(data[k]);
            }
           })
        }
    }

    
    handleValidation(){

        let fields =this.state.fields;
        let errors= {};
        let formIsValid = true;

        //NAME 
        if( !fields["name"] ){

            formIsValid=false;
            errors["name"] = "This field should not be empty";
        }
        else{
            var length = fields["name"].length;
            if ( length < 3 ){
                formIsValid = false;
                errors["name"] = "Please enter characters of more than 3";
            }
        }

        //PASSWORD
        if(!fields["password"]){
            formIsValid=false;
            errors["password"]="This field should not be empty";
        }
        else{
            var length  = fields["password"].length;
            if(length<3 || length>10){
                formIsValid=false;
                errors["password"]="password should not be less than 3 and greater than 10";
            }
            var passwordValid = fields["password"].match(/^[a-zA-Z0-9@!$%*]/);
                if(!passwordValid){
                    formIsValid=false;
                    errors["password"]="your password does not meet the complexity requirements";
                }
        }

        //EMAIL
        if(!fields["email"]){
            formIsValid=false;
            errors["email"]="This field should not be empty";
        }
        else{
            var emailValid = fields["email"].match(/^[a-zA-Z][a-zA-Z0-9]{5,}@virtusa.com$/);
            if(!emailValid)
            {
                formIsValid=false;
                errors["email"]="please enter a valid email address";
            }
        }

        //MOBILE
        if( !fields["mobile"] ){

            formIsValid=false;
            errors["mobile"] = "This field should not be empty";
        }
        else{
            var length = fields["mobile"].length;
            console.log(length);
            if ( length != 10  ){
                formIsValid = false;
                errors["mobile"] = "Please enter valid phone number ";
            }
        }
        this.setState({
            errors:errors
        })
        return formIsValid;
    }
    render() {
        return (
            <div className="ccontainer">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <fieldset>
                        <legend>Admin Registration</legend>
                        <div class="form-group">
                            <label for="name" class="cols-sm-2 control-label">Name</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-user fa"></i></span>
                                    <input type="text"  class="form-control" name="name"
                                    id="name" onChange={this.handleChange} value={this.state.fields["name"]} placeholder="Enter your Name" />
                                </div>
                                <span id="err">{this.state.errors["name"]}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="email" class="cols-sm-2 control-label">Email</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-envelope fa"></i></span>
                                    <input type="email"  class="form-control" name="email"
                                     onChange={this.handleChange} value={this.state.fields["email"]} id="email" placeholder="Enter your Email" />
                                   
                                </div>
                                <span id="err">{this.state.errors["email"]}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password" class="cols-sm-2 control-label">Password</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                    <input type="password" class="form-control" name="password" 
                                    onChange={this.handleChange} value={this.state.fields["password"]} id="pwd" placeholder="Enter your Password" />
                                   
                                </div>
                                <span id="err"> {this.state.errors["password"]}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="mobile" class="cols-sm-2 control-label">MobileNumber</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-mobile-phone fa-lg" aria-hidden="true"></i></span>
                                    <input type="text" class="form-control" name="mobile"
                                     onChange={this.handleChange} value={this.state.fields["mobile"]} id="mobile" placeholder="Enter your MobileNumber" />
                                   
                                </div>
                                <span id="err">{this.state.errors["mobile"]}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="location">Location</label>
                            <div className="input-group">
                                <select name="skills" onChange={this.handleChange} multiple >
                                    <option value="angular">Angular</option>
                                    <option value="css">CSS</option>
                                    <option value="html">HTML</option>
                                    <option value="javascript">Javascript</option>
                                    <option value="react">React</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                           <Link to="/Admin_Dash"> <input type="submit" value="Register Me!"/></Link>
                        </div>
                    </fieldset>
                </form>
                
            </div>
        );
    }
}