import {Component} from 'react';
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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Pranjai',
      otpFocus: false,
      emailFocus: false,
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
            <Text style={styles.headingText}>Forgot Password</Text>
          </View>
          <View style={styles.imgContainer}>
            <View style={styles.image}>
              <Image
                source={require('../../src/assets/images/forgot.png')}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.imgText}>
                Select which contact details should we use to {'\n'}reset your
                password
              </Text>
            </View>
          </View>
          <View style={styles.otpContainer}>
            <TouchableOpacity
              style={[
                styles.otpBox,
                this.state.otpFocus ? styles.otpFocusBox : null,
              ]}
              onPress={() => {
                this.setState({otpFocus: true, emailFocus: false}); // Reset emailFocus
              }}>
              <View style={styles.iconBox}>
                <AntDesign name="message1" size={23} color="blue" />
              </View>
              <View style={styles.contactBox}>
                <Text style={{color: 'gray'}}>via SMS</Text>
                <Text style={{color: 'black'}}>+1 111********99</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.otpBox,
                this.state.emailFocus ? styles.emailFocusBox : null,
              ]}
              onPress={() => {
                this.setState({emailFocus: true, otpFocus: false}); // Reset otpFocus
              }}>
              <View style={styles.iconBox}>
                <FontAwesome name="envelope" size={20} color="#4F4AD0" />
              </View>
              <View style={styles.contactBox}>
                <Text style={{color: 'gray'}}>via Email</Text>
                <Text style={{color: 'black'}}>pra****mewara02@gmail.com</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('OtpVerify');
            }}
            style={styleConstant.GetStartedBtn}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
export default ForgotPassword;

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
  },
  image: {
    width: 350,
    height: 250,
    backgroundColor: 'white',
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
    marginTop: 15,
    gap: 20,
    marginBottom: 35,
  },
  otpBox: {
    width: 320,
    height: 100,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E7E7E7',
    flexDirection: 'row',
    paddingLeft: 20,
    gap: 20,
  },
  otpFocusBox: {
    width: 320,
    height: 100,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    flexDirection: 'row',
    paddingLeft: 20,
    gap: 20,
    backgroundColor: '#EBEAFE',
  },
  emailFocusBox: {
    width: 320,
    height: 100,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    flexDirection: 'row',
    paddingLeft: 20,
    gap: 20,
    backgroundColor: '#EBEAFE',
  },
  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#EBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactBox: {
    flexDirection: 'column',
    gap: 15,
  },
});
