import {Component, createRef} from 'react';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styleConstant from '../../constants/styles';

class OtpVerify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Pranjai',
      otpFocus: false,
      firstRef: React.createRef(),
      secondRef: React.createRef(),
      thirdRef: React.createRef(),
      fourthRef: React.createRef(),
    };
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View style={styles.main}>
          <View style={styles.headContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack('LoginClass');
              }}
              style={styles.headIcon}>
              <AntDesign name="arrowleft" size={23} color="black" />
            </TouchableOpacity>
            <Text style={styles.headingText}>Otp Code Verification</Text>
          </View>
          <View style={styles.imgContainer}>
            <Text style={styles.imgText}>
              Code has been send to +1 111********99
            </Text>
            <View style={styles.otpContainer}>
              <TextInput
                onFocus={() => {
                  this.setState({otpFocus: true});
                }}
                onBlur={() => {
                  this.setState({otpFocus: false});
                }}
                style={[
                  styles.otpBox,
                  this.state.otpFocus ? styles.otpFocusBox : null,
                ]}
                placeholder=""
                keyboardType="number-pad"
                textAlign="center"
                maxLength={1}
                ref={this.state.firstRef}
                autoFocus={true}
                showSoftInputOnFocus={true}
                onChangeText={value => {
                  if (!value) return;
                  this.state.secondRef.current.focus();
                }}
              />
              <TextInput
                onFocus={() => {
                  this.setState({otpFocus: true});
                }}
                onBlur={() => {
                  this.setState({otpFocus: false});
                }}
                style={[
                  styles.otpBox,
                  this.state.otpFocus ? styles.otpFocusBox : null,
                ]}
                placeholder=""
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                ref={this.state.secondRef}
                onChangeText={value => {
                  if (!value) {
                    this.state.firstRef.current.focus();
                    return;
                  }
                  this.state.thirdRef.current.focus();
                  console.log('Third: ', value);
                }}
              />
              <TextInput
                onFocus={() => {
                  this.setState({otpFocus: true});
                }}
                onBlur={() => {
                  this.setState({otpFocus: false});
                }}
                style={[
                  styles.otpBox,
                  this.state.otpFocus ? styles.otpFocusBox : null,
                ]}
                placeholder=""
                keyboardType="number-pad"
                textAlign="center"
                maxLength={1}
                ref={this.state.thirdRef}
                onChangeText={value => {
                  if (!value) {
                    this.state.secondRef.current.focus();
                    return;
                  }
                  this.state.fourthRef.current.focus();
                  console.log('Third: ', value);
                }}
              />
              <TextInput
                onFocus={() => {
                  this.setState({otpFocus: true});
                }}
                onBlur={() => {
                  this.setState({otpFocus: false});
                }}
                style={[
                  styles.otpBox,
                  this.state.otpFocus ? styles.otpFocusBox : null,
                ]}
                placeholder=""
                keyboardType="number-pad"
                textAlign="center"
                maxLength={1}
                ref={this.state.fourthRef}
                onChangeText={value => {
                  if (!value) {
                    this.state.thirdRef.current.focus();
                  }
                  return;
                }}
              />
            </View>
            <Text style={styles.resendText}>Resend code in</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('NewPassword');
            }}
            style={styleConstant.GetStartedBtn}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Verify</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
export default OtpVerify;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headContainer: {
    height: 80,
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    paddingTop: 40,
    paddingLeft: 25,
    gap: 15,
    alignItems: 'center',
  },
  headIcon: {
    // marginTop: 40,
    // right: 150,
  },
  headingText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  imgContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: 315,
    alignItems: 'center',
    marginTop: 10,
    // backgroundColor: 'red',
    paddingTop: 50,
    marginBottom: 280,
  },
  imgText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
  },
  otpContainer: {
    alignItems: 'center',
    marginTop: 50,
    gap: 20,
    flexDirection: 'row',
  },
  otpBox: {
    width: 55,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E7E7E7',
    color: 'black',
    textAlign: 'center',
  },
  otpFocusBox: {
    width: 55,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: '#DEEBFF',
    textAlign: 'center',
  },
  resendText: {
    color: 'black',
    marginTop: 60,
    marginBottom: 40,
  },
});
