import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
const Dashboard = () =>{

    const {user:{_id, name, email, role}} = isAuthenticated()

    const userLinks =() =>{
        return (
            <div className="card">
                <h4 className="card-heaer">User Links</h4>
                <ul className="list-group">
                <li className="list-group-item"><Link className="nav-link" to = "/cart"></Link>My Cart</li>
                <li className="list-group-item"><Link className="nav-link" to="/profile/update">Profile Update</Link></li>
                
            </ul>
            </div>
        )
    };
    const userInfo =() =>{
        return (
            <div className="card mb-5" >
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{(role === 1? 'Admin': 'Registered user')}</li>
                
            </ul>
        </div>
        )
    };

    const perchaseHistory = () =>{
        return (
            <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
            <li className="list-group-item">history</li> 
            </ul>
        </div>
        )
    }

    return (
        <Layout 
        title="Dashboard"
        description={`G'day ${name}`}
        className ="container">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {perchaseHistory()}
                </div>
            </div>
        

       
        
        </Layout>
    )
}

export default Dashboard;