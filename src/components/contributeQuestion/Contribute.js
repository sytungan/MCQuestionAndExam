import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RootNavigator from '../../navigation/RootNavigator';
const axios = require('axios')
import DropDownPicker from 'react-native-dropdown-picker';


import {
  StyleSheet,
	Text,
	View,
  ImageBackground,
  Dimensions,
  LayoutAnimation,
  UIManager,
  KeyboardAvoidingView,
} from 'react-native';

import { Input, Button, Icon, Alert , ButtonGroup, CheckBox } from 'react-native-elements';
import { set, sub } from 'react-native-reanimated';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_screen2.png');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);


export default class Contribute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
		  description: '',
		  descriptionFile:'',
      isLoading: false,
      isContent: true,
      isAnswer: true,
	  	authencation: false,
		  selectedIndex: 1,
		  numOfAnswer:2,
		  anwser:[{content:'' , key:false} , {content:'' , key:false}],
		  subjectOfSem :[],
		  isGetSubject : false,
		  listSubject:[],
		  subject: 0,
		  QuestionID: 0
		  
    };
		this.updateIndex = this.updateIndex.bind(this);
		this.getMaxID = this.getMaxID.bind(this)
		this.contribute = this.contribute.bind(this)
		this.getSubject = this.getSubject.bind(this)
		this.addAnswer = this.addAnswer.bind(this);
		this.removeAnswer = this.removeAnswer.bind(this);
  	}
	
	removeAnswer(){
		if (this.state.numOfAnswer == 1) return
		this.setState({
			numOfAnswer: this.state.numOfAnswer - 1
		})
		var temp = this.state.anwser
		temp.pop()
		this.setState({
			anwser: temp
		})
	}

	addAnswer(){
		this.setState({
			numOfAnswer: this.state.numOfAnswer + 1
		})
		var temp = this.state.anwser

		temp.push({content:'' , key:false})
		this.setState({
			anwser: temp
		})
	}
	updateAuthencation(res){
		this.setState( { authencation:res})
	}
	
	updateIndex (selectedIndex) {
  		this.setState({selectedIndex})
	}

	async getSubject(){
		var temp;
		await axios({
			method : 'post',
			url : 'http://192.168.1.122:3000/getSubjectOfSemester',
			data:{
				semester_id: 2
			},
			timeout: 1000
		}).then(function(res){
			temp = res.data[0]
			console.log('semeter cua tao' , temp)
		}).catch(function(err){
			console.log(err)
			return;
		})
	

		var x = temp.map((item) =>{
					var a = {label: item.SubjectName, value: item.SubjectID}
					// console.log(a)
					return a
		})
		this.setState({
			subjectOfSem : temp,
			isGetSubject : true,
			listSubject : x
		})
	}
	async getMaxID(){
		var maxID = 0;
		var temp2;
		await axios({
			method : 'get',
			url : 'http://192.168.1.122:3000/getAllQuestion',
			timeout: 1000
		}).then(function(res){
			temp2 = res.data
			console.log('ques cua tao' , temp2)
		}).catch(function(err){
			console.log(err)
			return;
		})
		
		temp2.map(function(item){
			if (maxID < item.QuestionID){
				maxID = item.QuestionID;
			}
		})

		this.setState({
			QuestionID : maxID
		})
	}
	async contribute() {
		this.getMaxID();
		let { content, description, descriptionFile  , anwser , subject , QuestionID} = this.state;
		var i = 0;
		var qType = 'S';
		anwser.map( function(item) {
			if (item.key == true) i++;
		})
		var outcome;
		await axios({
			method: 'get',
			url: 'http://localhost:3000/getAllLearningOutcome',
			timeout: 500
		}).then(function(res){
			outcome = res.data
			console.log('outcomess ' ,res.data)
		}).catch(function(res){
			console.log(res)
		})
		// console.log( 'tang tang tang',outcome)
		outcome = outcome.filter(function(item){
	
			return item.SubjectID == subject
		})
		console.log( 'tang tang tang' ,outcome)
		if (i > 1) qType = 'M';
		this.setState({ isLoading: true });
		var temp , succes;
		var isPost = true;
		console.log('isloading' , content , description , descriptionFile , anwser , subject )
		// Simulate an API call
		await setTimeout(() => {
		LayoutAnimation.easeInEaseOut();
		if (content == '') {
			this.contentInput.shake()
			isPost = false
		}
		this.setState({
			isLoading: false,		 
		});
		
		}, 1500);
		if (isPost == false) return
		await axios({
			method: 'post',
			url: 'http://localhost:3000/insertnewQuestion_Answer',
			data:{
				question: {
					content : content,
					question_type : qType,
					outcome_id : outcome[0].OutcomeID,
					subject_id : subject,
					lecturer_id: 1
				}
			},
			timeout: 1000
		}).then(function(res){
			console.log(res)
		}).catch(function(res){
			console.log(res)
		})
		console.log('is posting')
		var index = 0;
		var a = setInterval(async () => {
				await axios({
					method: 'post',
					url: 'http://localhost:3000/insertnewAnswerOfQuestion',
					data:{
						question_id : QuestionID + 1,
						content : anwser[index].content,
						result :  anwser[index].key ? 1 : 0
					},
					timeout:3000
				}).then(function(res){
					console.log(res.data)
				}).catch(function(res){
					console.log(res)
					return
				})
				console.log('is posting')
				if (index == anwser.length - 1) this.clearTime(a)
				else index++;
			}, 5000)

	} 
	clearTime(a){
		clearTimeout(a);
	}
  render() {
  let {
      isLoading,
      content,
	    description,
	    descriptionFile,
	} = this.state;
	if (this.state.isGetSubject == false ) {
		this.getSubject();
	}
    if (this.state.authencation == true) 
      return(<RootNavigator/>);
				
	console.log( 'list sub' , this.state.listSubject)
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View>
            <KeyboardAvoidingView
              behavior="position"
            >
              <View style={styles.titleContainer}>
      
              </View>
              
					<DropDownPicker
				items={
				
				
					this.state.isGetSubject ? this.state.listSubject : [
					{label: 'Chọn môn học', value: 0, icon: () => <Icon name="flag" size={18} color="#900" />}
				]
					
				}
				defaultValue={this.state.subject}
				containerStyle={{height: 40, width: 300 }}
				style={{backgroundColor: '#fafafa'}}
				itemStyle={{
					justifyContent: 'flex-start'
				}}
				dropDownStyle={{backgroundColor: '#fafafa'}}
				onChangeItem={item => this.setState({
					subject: item.value
				})}
				/>
               
            
				
              <View style={styles.formContainer}>
                <Input
                //   leftIcon={
                //     <Icon
                //       name="envelope-o"
                //       type="font-awesome"
                //       color="rgba(0, 0, 0, 0.38)"
                //       size={25}
                //       style={{ backgroundColor: 'transparent' }}
                //     />
                //   }
                  value={content}
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Content'
                  containerStyle={{
                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                  }}
                  ref={(input) => (this.contentInput = input)}
                  onChangeText={(content) => this.setState({ content })}
                />
                <Input
                //   leftIcon={
                //     <Icon
                //       name="lock"
                //       type="simple-line-icon"
                //       color="rgba(0, 0, 0, 0.38)"
                //       size={25}
                //       style={{ backgroundColor: 'transparent' }}
                //     />
                //   }
                  value={description}
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  containerStyle={{
                    marginTop: 16,
                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                  }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Descripton'
                //   ref={(input) => (this.descriptionInput = input)}
                  onChangeText={(description) => this.setState({ description })}
                />
               
                  <Input
                    
                    value={descriptionFile}
                    keyboardAppearance="light"
                    keyboardType="default"
                    returnKeyType={'done'}
                   
                    containerStyle={{
                      marginTop: 16,
                      borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                    }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder={'Url of discription file'}
                    // ref={(descriptionFile) => (this.setState.descriptionFile = descriptionFile)}
                    onChangeText={(descriptionFile) =>
                      this.setState({ descriptionFile })
                    }               
                  />
				   {
				   this.state.anwser.map((item , idx) => 
					<View style={{ flexDirection: 'row' }}>
						<Input
						value={item.content}
						keyboardAppearance="light"
						keyboardType="default"
						returnKeyType={'done'}
						label = {'Answer '+ (idx+1).toString()}
						containerStyle={{
						marginTop: 16,
						borderBottomColor: 'rgba(0, 0, 0, 0.38)',
						}}
						inputStyle={{ marginLeft: 10 }}
						placeholder={'Answer'}
						// ref={(descriptionFile) => (this.setState.descriptionFile = descriptionFile)}
						onChangeText={(value) =>{
							var temp = this.state.anwser;
							temp[idx] = {content:value , key: false}
							this.setState({
								anwser : temp
							})
							
						}
						}	
					/>
						<CheckBox
							style={{ alignSelf : "center" }}
						
							title='Answer true'
							checkedIcon='dot-circle-o'
							uncheckedIcon='circle-o'
							checked={item.key}
							onPress = {() => {
								var temp = this.state.anwser;
								temp[idx] = {content:item.content , key: !item.key}
								this.setState({
									anwser : temp
								})
								// console.log(temp)
							}
							}
						/>
					</View>
				   )
 					 }		
					<CheckBox
						center
						title='Click Here to Add Answer'
						iconRight
						iconType='material'
						checkedIcon='clear'
						uncheckedIcon='add'
						checkedColor='red'

						onPress={() => this.addAnswer()}
					/>

					<CheckBox
						center
						title='Click Here to Remove Answer'
						iconRight
						iconType='material'
						checkedIcon='clear'
						uncheckedIcon='add'
						checkedColor='red'

						onPress={() => this.removeAnswer()}
					/>
					<Button
  
						buttonStyle={styles.loginButton}
						containerStyle={{ marginTop: 32, flex: 0 }}
						activeOpacity={0.8}
						title= 'Contribute'
						onPress={this.contribute}
						titleStyle={styles.loginTextButton}
						loading={isLoading}
						disabled={isLoading}
               		 />
					
              
              </View>
            </KeyboardAvoidingView>
            {/* <View style={styles.helpContainer}>
              <Button
                title={'Forgot your account'}
                titleStyle={{ color: 'white' }}
                buttonStyle={{ backgroundColor: 'transparent' }}
                underlayColor="transparent"
                onPress={() => console.log('Go forgot')}
              />
            </View> */}
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowSelector: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorContainer: {
    flex: 1,
    alignItems: 'center',
  },
  selected: {
    position: 'absolute',
    borderRadius: 50,
    height: 0,
    width: 0,
    top: -5,
    borderRightWidth: 70,
    borderBottomWidth: 70,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 10,
    height: 50,
    width: 200,
  },
  titleContainer: {
    height: 150,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    backgroundColor: 'transparent',
    opacity: 0.54,
  },
  selectedCategoryText: {
    opacity: 1,
  },
  titleText: {
    color: 'white',
    fontSize: 30,
  },
  helpContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
});