import React, {Component} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

class ClassProps extends Component {
  render() {
    return (
      <View>
        <Text style={{color: 'black', fontSize: 20}}>
          Student name: {this.props.name}
        </Text>
      </View>
    );
  }
}

export default ClassProps;

const styles = StyleSheet.create({
  inputBox: {
    width: 320,
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CBCBCB',
    paddingLeft: 20,
    marginTop: 20,
    color: 'black',
  },
});
