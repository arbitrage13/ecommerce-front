import {API} from "../config";
import { isFlowBaseAnnotation } from "@babel/types";


export const signup = (user) =>{
    return fetch(`${API}/signup`, {
        method: "POST",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err =>{
        console.log(err)
    })
};
export const signin = (user) =>{
    return fetch(`${API}/signin`, {
        method: "POST",
        header: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err =>{
        console.log(err)
    })
};

export const authenticate = (data, next)=>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
};

export const signout = (next) =>{
    if(typeof windown !== 'undefined'){
        localStorage.removeItem("jwt");
        next();
        return fetch(`${API}/signout`, {
            method: "GET",
        })
        .then(res =>{
            console.log('signout', res);
        })
        .catch(err=> console.log(err))
    }
};

export const isAuthenticated = () =>{
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false;
    }
};