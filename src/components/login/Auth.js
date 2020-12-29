import React, { Component } from 'react';
const axios = require('axios')
export async function handleSignUp(email, password , role) {
    var temp = false;
    await axios({
        method : 'post',
        url: 'http://192.168.1.122:3000/insertUser',
        data:{
            username : email,
            password : password,
            LecFlag: role
        },
        time : 200
    }).then(function(res){
        console.log("qweqwdmqo124asd1231w ",res.data.length >= 1)
        console.log("1212312312930131",res.data)
        if (res.data) {
            console.log('ddddddasasdasda')
            temp = true;
        }
        else {
            temp = false;
        }
    })
    .catch(function(err){
        console.log(err);
        temp = false
    })

    // await axios.get('').then(function(res){
    //     return res.data;
    // }).catch(function(err){
    //     console.log(err);
    //     return false;
    // })

    return temp;
}

export async function handleLogin(email , password) {
    var temp = false;
    await axios({
        method: 'post',
        url: "http://192.168.1.122:3000/auth",
        data :{
            email : email,
            password : password
        },
        timeout:500,
        header:{
            header1: "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept",
            header2: 'Access-Control-Allow-Origin: *'
        }
    }).then(function(res){
        console.log("qweqwdmqow ",res.data.length >= 1)

        console.log("aaaaaaaaa",res.data[0])
        if (res.data.length >= 1) {
            console.log('ddddddasasdasda')
            temp = true;
        }
        else {
            temp = false;
        }
    })
    .catch(function(err){
        console.log(err);
        temp = false
    })
   
    return temp;
  
}