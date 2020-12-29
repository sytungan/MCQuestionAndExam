import React, {Component, useState} from 'react';
import {View} from 'react-native';
import {Button, ButtonGroup, Overlay, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'modal-react-native-web';
import Question from './Question';
import Answer from './Answer';
const getExam = require('./getXam')

export default class Quiz extends Component {
    constructor(props){
        super(props);
        this.state = {
            quiz:[],
            studentID:'',
            testID:1111,
            isGetResult : false,
            score: 0,
            isSubmit: false,
            overlayVisible: false,
            isGetExam:false
        }
    }
    arraysEqual = (a, b) => {
        a.sort();
        b.sort();
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
    }
    setChoose = (choose, idx) => {
        let newItem = this.state.quiz;
        newItem[idx].ChooseID = choose;
        this.setState({quiz: newItem});
    }

    checkAnswer = (left, right) => {
        if (Array.isArray(left) && Array.isArray(right)) {
            return this.arraysEqual(left, right);
        }
        else {
            return left == right;
        }
    }

    async Exam(){
        var exam;
        await getExam.getQuestion(1).then(function(res){
            exam = res
            console.log('res exam' , res)
        })
        var answer;
        await getExam.getAnswer(1).then(function(res){
            answer = res[0]
            console.log('úa òa' , res[0])
        })
        var final = exam.map(function(item , i){
           
            var chose = undefined;
            var ans = answer.filter(function(x , idx){
                console.log('x' , x)
                
                if (item.QuestionID == x.QuestionID && item.Version == x.Version){
                    console.log(1)
                    if (x.Result == 1){
                        if (chose != undefined){
                            var m = [chose];
                            chose = m;
                            chose.push(x.AnswerID)
                        }else{
                            chose = x.AnswerID;
                        }
                    }
                    var a = {AnswerID : x.AnswerID , Content : x.Content}
                    console.log(a)
                    return a
                }
            })
            console.log('aasaaas ' , ans)
            var temp = {
                QuestionID: item.QuestionID,
                Content: item.Content,
                QuestionType: item.QuestionType,
                ResultID: chose,
                ChooseID:'',
                Answers: ans
            } 
            return temp;
        })
        this.setState({
            quiz:final
        })
        console.log(final)
    }

    getResult(){
        let { quiz , score , studentID , testID} = this.state;
        
        var answerSheet = quiz.map(function(item , idx){
            var a = {answer:item.ChooseId , questionID:item.id}
            return a
        })
        var temp = {
            studentID:studentID,
            score:score,
            testID:testID,
        }
        temp['record'] = answerSheet
        
        this.setState({
            isGetResult: true
        })
        setTimeout( async () => {
            console.log('answer' , temp)
         

            // axios.post({
            //     methob:'post',
            //     url: '',
            //     data:{
            //         resultText: temp
            //     },
            //     timeout: 200
            // })
    
        } , 500)
    }


    render(){
        const toggleOverlay = () => {
            this.setState({overlayVisible: !this.state.overlayVisible});
        };
        if (this.state.isSubmit == true && this.state.isGetResult == false) {
            this.getResult()
        };
        if (!this.state.isGetExam){
            this.setState({
                isGetExam : true
            })
            this.Exam()
        }
        return(
            <View>
                {this.state.quiz.map((ele, idx) => (
                    <View>
                    <Question
                        question={ele}
                        idx={idx+1}
                    />
                    <Answer
                        answer={ele.Answers}
                        type={ele.QuestionType}
                        setChoose={this.setChoose}
                        idx={idx}
                    />
                    </View>
                )
                )}
                <View>
                <Button 
                    title="Nộp bài"
                    type="outline"
                    disabled={this.state.isSubmit}
                    onPress={ () => {
                        let numOfCorrect = 0;
                        this.state.quiz.map((ele, idx) => {
                            if (this.checkAnswer(ele.ResultID, ele.ChooseID)) {
                                numOfCorrect += 1
                            }
                        }
                        )
                        this.setState({score: (numOfCorrect/this.state.quiz.length)*10});
                        this.setState({isSubmit: true});
                        this.setState({overlayVisible: !this.state.overlayVisible});
                    }
                    }
                />
                <Overlay isVisible={this.state.overlayVisible} onBackdropPress={toggleOverlay}>
                    <View>
                        <Text style={{textAlign: 'center'}} h4>Điểm của bạn là: </Text>
                        <Text style={{color: 'orange',textAlign: 'center'}} h3>{this.state.score} </Text>
                        <View style={{ flexDirection: 'row' }}>
                        <Button
                        title="Xem lại đề"
                        type="outline"
                        onPress={toggleOverlay}
                        />
                        <Button
                        title="OK"
                        type="outline"
                        onPress={toggleOverlay}
                        />
                        </View>
                    </View>
                </Overlay>
                </View>
            </View>
        );
    }
}