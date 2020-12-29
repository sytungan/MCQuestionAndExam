import React, { Component } from 'react';
const axios = require('axios')
export async function handleSignUp(email, password , role) {
    // await axios({
    //     method : 'post',
    //     url: '',
    //     data:{
    //         email : email,
    //         password : password,
    //         role: role
    //     },
    //     time : 200
    // })

    // await axios.get('').then(function(res){
    //     return res.data;
    // }).catch(function(err){
    //     console.log(err);
    //     return false;
    // })

    return false;
}

export async function handleLogin(email , password) {
    // await axios({
    //     method: 'post',
    //     url: '',
    //     data :{
    //         email : email,
    //         password : password
    //     },
    //     timeout:200
    // })

    // await axios.get('').then(function(res){
    //     return res.data;
    // }).catch(function(err){
    //     console.log(err);
    //     return false;
    // })
    return true
}