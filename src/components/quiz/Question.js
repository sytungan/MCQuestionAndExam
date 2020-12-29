import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {Button} from 'react-native-elements';

const Question = (props) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button
            title={"Câu " + (props.idx + 1)}
            type="clear"
            />
            <Text style={{ alignSelf : "center" }} h5> {props.question.Text}</Text>
        </View>
    );
}

export default Question;