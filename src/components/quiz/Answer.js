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
        return (
            <View>
            {this.props.type == "S" ?  
                this.props.answer.map((qAnswer, idx) => (
                    <View  style={{ flexDirection: 'row' }}>
                    <CheckBox
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checkedColor='green'
                    checked = {this.state.choose == qAnswer.Id}
                    onPress={()=>{
                        this.props.setChoose(qAnswer.Id, this.props.idx);
                        this.setState({choose: qAnswer.Id})
                    }}
                    />
                    <Text style={{ alignSelf : "center" }}> {qAnswer.Text}</Text>
                    </View>
                ))
                :
                this.props.answer.map((qAnswer, idx) => 
                    <View  style={{ flexDirection: 'row' }}>
                    <CheckBox
                    checked = {this.state.chooseList.indexOf(qAnswer.Id) != -1}
                    checkedColor='green'
                    onPress={()=>{
                        this.props.setChoose(this.state.chooseList, this.props.idx);
                        let newItem = this.state.chooseList;
                        if (newItem.indexOf(qAnswer.Id) != -1) {
                            newItem.splice(newItem.indexOf(qAnswer.Id), 1);
                        }
                        else {
                            newItem.push(qAnswer.Id)
                        }
                        this.setState({chooseList: newItem}); 
                    }}
                    />
                    <Text style={{ alignSelf : "center" }}> {qAnswer.Text}</Text>
                    </View>
                )
            }
            </View>
        );
    }
}
