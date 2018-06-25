import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class AdminDashboard extends Component {
    render() {
        return (
            <div>
             <h1> Admin Dashboard</h1>
             <Link to="/charts">Charts</Link>
             <Link to="/createEvent">CreateEvent</Link>
             <Link to="/Admin_Event">View and update</Link>
             
            </div>
        );
    }
}

export default AdminDashboard;