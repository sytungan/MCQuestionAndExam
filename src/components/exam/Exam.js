import React, { Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Modal from 'modal-react-native-web';
import { ListItem, Avatar, Text, Button , Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import Question from '../quiz/Question';
import Answer from '../quiz/Answer';
export default class Exam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            question: '',
            overlayVisible: false,
            questionObj: ''
        }
    }
    render () {
        const toggleOverlay = () => {
            this.setState({overlayVisible: !this.state.overlayVisible});
        };
        const list = [
            [
              {
                QuestionID: 1,
                Version: 1,
                Content: "Câu lệnh 'addu' dùng để làm gì ?",
                QuestionType: "S",
                Answers:   [
                    {
                      QuestionID: 1,
                      Version: 1,
                      AnswerID: 1,
                      Content: "Cộng",
                      Result: 1
                    },
                    {
                      QuestionID: 1,
                      Version: 1,
                      AnswerID: 2,
                      Content: "Trừ",
                      Result: 0
                    },
                    {
                      QuestionID: 1,
                      Version: 1,
                      AnswerID: 3,
                      Content: "Nhân",
                      Result: 0
                    },
                    {
                      QuestionID: 1,
                      Version: 1,
                      AnswerID: 4,
                      Content: "Chia",
                      Result: 0
                    }
                ],
                OutcomeID: 1,
                SubjectID: 1,
                LecturerID: 1,
                DateCreated: "2020-12-23T17:00:00.000Z"
              },
              {
                QuestionID: 2,
                Version: 1,
                Content: "Câu lệnh for được mô tả ra sao trong asm ?",
                QuestionType: "M",
                OutcomeID: 2,
                SubjectID: 1,
                LecturerID: 1,
                DateCreated: "2020-12-22T17:00:00.000Z"
              },
              {
                QuestionID: 3,
                Version: 1,
                Content: "Lệnh sub hay lệnh subu là trừ trong MIPS ?",
                QuestionType: "S",
                OutcomeID: 1,
                SubjectID: 1,
                LecturerID: 1,
                DateCreated: "2020-12-26T17:00:00.000Z"
              },
            ],
          ]
    return (
        <View  style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }}>
        <DropDownPicker
            items={[
                {label: 'Giải tích 2', value: 'gt2', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
                {label: 'Kiến trúc máy tính', value: 'ktmt', icon: () => <Icon name="flag" size={18} color="#900" />},
                {label: 'Cấu trúc dữ liệu và giải thuật', value: 'dsa', icon: () => <Icon name="flag" size={18} color="#900" />},
            ]}
            defaultValue={this.state.subject}
            containerStyle={{height: 40, width: 300}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
            onChangeItem={item => this.setState({
                subject: item.value
            })}
        />
        <Text></Text>
        <View>{
        list[0].map((ele, i) => (
            console.log(ele),
            <ListItem key={i} bottomDivider onPress={()=>{
                this.setState({questionObj: ele})
                this.setState({overlayVisible: true})
            }
            }>
                <ListItem.Content>
                <ListItem.Title>{ele.Content}</ListItem.Title>
                <ListItem.Subtitle>{ele.QuestionID}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        ))
        }
        </View>
        <Overlay isVisible={this.state.overlayVisible} onBackdropPress={toggleOverlay}>
            <View>
                <Question
                    question={this.state.questionObj}
                    idx={"hỏi"}
                />
                <Answer
                    answer={this.state.questionObj.Answers}
                    type={this.state.questionObj.QuestionType}
                    setChoose={this.setChoose}
                    idx={-1}
                />
                <Button
                title="OK"
                type="outline"
                onPress={toggleOverlay}
                />
            </View>
        </Overlay>

        
        {/* <View>
        {
            list.map((l, i) => (
            <ListItem key={i} bottomDivider onPress={() => console.log("Hihi")}>
                <Avatar source={{uri: l.avatar_url}} />
                <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            ))
        }
        </View> */}
        </View>
    )
    }
}