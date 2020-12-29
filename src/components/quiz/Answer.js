import React, {Component} from 'react';
import { CheckBox } from 'react-native-elements';
import {View, Button, Text} from 'react-native';
export default class Answer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choose: "",
            chooseList: []
        }
    }
    render() {
        if (!this.props.answer || this.props.answer === undefined) {
            return (<Text/>)
        }
        else
        return (
            <View>
            {this.props.type == "S" ?  
                this.props.answer.map((qAnswer, idx) => (
                    <View  style={{ flexDirection: 'row' }}>
                    <CheckBox
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checkedColor='green'
                    checked = {this.state.choose == qAnswer.AnswerID}
                    onPress={()=>{
                        if (this.props.setChoose) {
                            this.props.setChoose(qAnswer.AnswerID, this.props.idx);
                        }
                        this.setState({choose: qAnswer.AnswerID})
                    }}
                    />
                    <Text style={{ alignSelf : "center" }}> {qAnswer.Content}</Text>
                    </View>
                ))
                :
                this.props.answer.map((qAnswer, idx) => 
                    <View  style={{ flexDirection: 'row' }}>
                    <CheckBox
                    checked = {this.state.chooseList.indexOf(qAnswer.AnswerID) != -1}
                    checkedColor='green'
                    onPress={()=>{
                        if (this.props.setChoose) {
                            this.props.setChoose(this.state.chooseList, this.props.idx);
                        }
                        let newItem = this.state.chooseList;
                        if (newItem.indexOf(qAnswer.AnswerID) != -1) {
                            newItem.splice(newItem.indexOf(qAnswer.AnswerID), 1);
                        }
                        else {
                            newItem.push(qAnswer.AnswerID)
                        }
                        this.setState({chooseList: newItem}); 
                    }}
                    />
                    <Text style={{ alignSelf : "center" }}> {qAnswer.Content}</Text>
                    </View>
                )
            }
            </View>
        );
    }
}
