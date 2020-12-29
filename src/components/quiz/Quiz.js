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
                Id: 25106,
                Text: "Có mấy loại Service?",
                Type: "S",
                AnswerId: 104121,
                ChooseId: "",
                Answers: [
                    { Id: 104118, Text: "3" },
                    { Id: 104119, Text: "4" },
                    { Id: 104120, Text: "1" },
                    { Id: 104121, Text: "2" }
                ]
            },
            {
                Id: 25107,
                Text: "Trong IntentService, phương thức onHandlerIntent sẽ được tự động gọi trong phương thức nào?",
                Type: "M",
                AnswerId: [104124,104122],
                ChooseId: "",
                Answers: [{
                    Id: 104122,
                    Text: "onServiceConnected()"
                }, {
                    Id: 104123,
                    Text: "onServiceDisConnected()"
                }, {
                    Id: 104124,
                    Text: "onStartCommand()"
                }, {
                    Id: 104125,
                    Text: "onBind()"
                }]
            }
        ],
        score: 0,
        isSubmit: false,
        overlayVisible: false
    }

    arraysEqual = (a, b) => {
        return a.sort() == b.sort();
    }
    setChoose = (choose, idx) => {
        let newItem = this.state.quiz;
        newItem[idx].ChooseId = choose;
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
                        idx={idx}
                    />
                    <Answer
                        answer={ele.Answers}
                        type={ele.Type}
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
                            if (this.checkAnswer(ele.AnswerId, ele.ChooseId)) {
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
                <Overlay ModalComponent={Modal} isVisible={this.state.overlayVisible} onBackdropPress={toggleOverlay}>
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