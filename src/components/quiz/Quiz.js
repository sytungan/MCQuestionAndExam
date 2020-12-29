import React, {Component, useState} from 'react';
import {View} from 'react-native';
import {Button, ButtonGroup, Overlay, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'modal-react-native-web';
import Question from './Question';
import Answer from './Answer';

export default class Quiz extends Component {
    state = {
        quiz: [
            {
                QuestionID: 25106,
                Content: "Có mấy loại Service?",
                QuestionType: "S",
                ResultID: 104121,
                ChooseID: "",
                Answers: [
                    { AnswerID: 104118, Content: "3" },
                    { AnswerID: 104119, Content: "4" },
                    { AnswerID: 104120, Content: "1" },
                    { AnswerID: 104121, Content: "2" }
                ]
            },
            {
                QuestionID: 25107,
                Content: "Trong IntentService, phương thức onHandlerIntent sẽ được tự động gọi trong phương thức nào?",
                QuestionType: "M",
                ResultID: [104124,104122],
                ChooseID: "",
                Answers: [{
                    AnswerID: 104122,
                    Content: "onServiceConnected()"
                }, {
                    AnswerID: 104123,
                    Content: "onServiceDisConnected()"
                }, {
                    AnswerID: 104124,
                    Content: "onStartCommand()"
                }, {
                    AnswerID: 104125,
                    Content: "onBind()"
                }]
            }
        ],
        score: 0,
        isSubmit: false,
        overlayVisible: false
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

    render(){
        const toggleOverlay = () => {
            this.setState({overlayVisible: !this.state.overlayVisible});
        };
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