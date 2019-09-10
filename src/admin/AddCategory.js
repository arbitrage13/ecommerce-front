import React , {useState} from 'react';
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import { Link } from "react-router-dom"
import {createCategory} from "./apiAdmin"

const AddCategory = () => {
    //need state
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    //destructure use and token from localStorage
    const {user, token} = isAuthenticated()

    const handleChange = (e) =>{
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = (e) =>{
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make request to api to create category
        createCategory(user._id, token, {name}) // why name???
        .then(data => {
            if(data.error){
                setError(true)
            }else{
                setError('');
                setSuccess(true);
            }
        })
    }
    const newCategoryForm = () => (
        //2methods to handlechange and to handle formsubmit
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label htmlFor="" className="text-muted">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    onChange={handleChange} 
                    value={name}
                    autoFocus
                    required />
                   
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showSuccess =() =>{
        if(success){
            return <h3 className="text-success">{name} is created</h3>
        }
    }
    const showError = () => {
        if(error){
            return <h3 className="text-danger">Category should be unique {error} </h3>
        }
    }

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    )

    return (
        <Layout 
        title="Add a new category"
        description={`G'day ${user.name}, ready to add a new category`}>

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        

       
        
        </Layout>
    )
};

export default AddCategory;