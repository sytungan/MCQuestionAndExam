import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RootNavigator from '../../navigation/RootNavigator';
const axios = require('axios')


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


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/bg_screen2.png');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


export default class Login extends Component {
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
		anwser:[{content:'' , key:false} , {content:'' , key:false}]
    };
		this.updateIndex = this.updateIndex.bind(this);
		
		this.contribute = this.contribute.bind(this)
	
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

 

	async contribute() {
		let { content, description, descriptionFile , anwser} = this.state;
		this.setState({ isLoading: true });
		var temp;
		console.log('isloading' , content , description , descriptionFile)
		// Simulate an API call
		setTimeout(() => {
		LayoutAnimation.easeInEaseOut();
		if (content == '') this.contentInput.shake()
		this.setState({
			isLoading: false,		
		});
		}, 1500);

		setTimeout(async () => {
		LayoutAnimation.easeInEaseOut();
		if (content == '') return
		if (anwser.length() <= 1 ) return
		
		await axios({
			method : 'post',
			url :'',
			data:{
				content: content,
				description: description,
				descriptionFile: descriptionFile,
				anwser : anwser
			},
			timeout : 200
		}).catch(function (error) {
			console.log(error);
			return;
  		});

		}, 1600);

		
	}

  render() {
    let {
      selectedCategory,
      isLoading,
     
      isConfirmationValid,
      content,
	  description,
	  descriptionFile,
      passwordConfirmation,
	} = this.state;
	
	const isLoginPage = selectedCategory === 0;
	
	const isSignUpPage = selectedCategory === 1;
	
	const buttons = ['Student', 'Lecture'];
  	const { selectedIndex } = this.state;



	console.log(this.state.numOfAnswer)
	console.log('content' , this.state.content)
    if (this.state.authencation == true) 
      return(<RootNavigator/>);

    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <View>
            <KeyboardAvoidingView
              contentContainerStyle={styles.loginContainer}
              behavior="position"
            >
              <View style={styles.titleContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.titleText}>BEAUX</Text>
                </View>
                <View style={{ marginTop: -10, marginLeft: 10 }}>
                  <Text style={styles.titleText}>VOYAGES</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                
               
              </View>
             
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
                    // icon={
                    //   <Icon
                    //     name="lock"
                    //     type="simple-line-icon"
                    //     color="rgba(0, 0, 0, 0.38)"
                    //     size={25}
                    //     style={{ backgroundColor: 'transparent' }}
                    //   />
                    // }
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
								console.log(temp)
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