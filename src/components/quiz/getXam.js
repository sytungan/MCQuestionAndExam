import React, { Component } from 'react';
const axios = require('axios')
export async function getQuestion(testID) {
    var temp ;
    await axios({
                method:'post',
                url: 'http://localhost:3000/get_question_of_exam',
                data:{
                    test_id : testID
                },
                timeout: 2000
        }).then(function(res){
            temp = res.data
            console.log( 'de thi cua tao',res.data)
        }).catch(function(err){
            console.log(err)
            return;
        })
    return temp[0]
}

export async function getAnswer(testID) {
    var temp ;
    await axios({
        method: 'post',
        url: "http://192.168.1.122:3000/get_all_answer_of_exam",
        data :{
            test_id : testID
        },
        timeout:2000,
        header:{
            header1: "Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept",
            header2: 'Access-Control-Allow-Origin: *'
        }
    }).then(function(res){

        console.log("anser uaa",res.data)
       temp = res.data
    })
    .catch(function(err){
        console.log(err);
        return
    })
   
    return temp;
  
}