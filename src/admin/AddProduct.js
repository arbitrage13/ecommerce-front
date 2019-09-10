import React , {useState, useEffect} from 'react';
import Layout from "../core/Layout";
import {isAuthenticated} from "../auth";
import { Link } from "react-router-dom"
import { createProduct, getCategories } from "./apiAdmin"



const AddProduct = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        quantity:'',
        photo:'',
        shipping:'',
        loading:false,
        error:'',
        createProduct:'',
        redirectToProfile: false,
        formData:''
    })
    //values that destructuring from the state
    const {
        name,
        description,
        price,
        categories,
        category,
        quantity,
        photo,
        shipping,
        loading,
        error,
        createProduct,
        redirectToProfile ,
        formData
    } = values
    //load categories and set form data
    const init = () =>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({
                    ...values, 
                    categories: data, 
                    formData: new FormData()})
            }
        })
    }

    //to make the data avialable as soon as it typed
    useEffect(()=>{
        init();
    },[]);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        //set the state
        setValues({...values, [name] : value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, error:'', loading: true});

        createProduct(user._id, token, formData)
        .then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({
                    ...values, 
                    name:'',
                    description:'',
                    photo:'',
                    price:'',
                    quantity:'',
                    loading: false,
                    createProduct: data.name
                })
            }
        })
    }
    const newPostForm = () => (
        <form action="" className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label htmlFor="" className="btn btn-secondary">
                    <input onChange= {handleChange('photo')} type="file" name="photo" accept="/image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className= "text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" name="" id="" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label htmlFor="">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label htmlFor="">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label htmlFor="">Category</label>
                <select onChange={handleChange('category')} className="form-control" >
                <option value="">Please select</option>
                    {categories && 
                        categories.map((c,i)=> (
                            //look through the categories
                            <option key ={i} value= {c._id}>{c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                        <option value="0" className="">No</option>
                        <option value="1" className="">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={name} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
        {error}
        </div>
    )
    const showSuccess = () =>(
        <div className="alert alert-info" style={{display: createProduct ? '': 'none'}}>
        <h2>{`${createProduct}`} is created !</h2>
        </div>
    );

    const showLoading = () => (
        loading && <div className="alert alert-showSuccess">
            Loading...
        </div>
            
    )

    return (
        <Layout 
        title="Add a new Product"
        description={`G'day ${user.name}, ready to add a new category`}>

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        

       
        
        </Layout>
    )
}

export default AddProduct