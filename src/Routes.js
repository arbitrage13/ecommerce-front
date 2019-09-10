import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoutes'
import Dashboard from './user/UserDashboard'
import AdminRoute from './auth/AdminRoute'
import AdminDashboard from './user/AdminDashboard'
import Addcategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component = {Home}/>
                <Route path="/signin" exact component = {Signin}/>
                <Route path = "/signup" exact component = {Signup}/>
                
                <PrivateRoute path ="/user/dashboard" exact component = {Dashboard} />
                <AdminRoute path ="/admin/dasfhboard" exact component = {AdminDashboard} />
                <AdminRoute path = "/create/category" exact component = {Addcategory} />
                <AdminRoute path = "/create/product" exact component = {AddProduct} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
