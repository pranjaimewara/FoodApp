import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  Button,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styleConstant from '../../constants/styles';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }

  goBack = () => {
    this.props.navigation.goBack('EventScreen1');
  };

  goToSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  componentDidMount() {
    GoogleSignin.configure({});
  }

  googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.props.navigation.navigate('Screen4');
      ToastAndroid.show('Sign in successful', ToastAndroid.LONG);
      console.log('userinfo', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
      } else {
      }
    }
  };

 

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View style={styles.main}>
          <TouchableOpacity onPress={this.goBack} style={styles.headIcon}>
            <AntDesign name="arrowleft" size={25} color="black" />
          </TouchableOpacity>
          <View style={styles.imgContainer}>
            <View style={styles.image}>
              <Image
                source={require('../../src/assets/images/signin.png')}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.imgText}>Let's you in</Text>
            </View>
          </View>
          <View style={styles.socialIconBox}>
            <TouchableOpacity style={styleConstant.socialBtn}>
              <Ionicons name="logo-facebook" size={25} color="#1888ED" />
              <Text style={styles.facebookText}>Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.googleLogin}
              style={styleConstant.socialBtn}>
              <Image
                source={require('../../src/assets/images/Google.png')}
                style={styles.googlImage}
              />
              <Text style={styles.facebookText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styleConstant.socialBtn}>
              <Ionicons name="logo-apple" size={25} color="black" />
              <Text style={styles.facebookText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signInContainer}>
            <Image
              source={require('../../src/assets/images/line.png')}
              style={styles.lineImage}
            />
            <TouchableOpacity
              style={styleConstant.GetStartedBtn}
              onPress={() => {
                this.props.navigation.navigate('LoginClass');
              }}>
              <Text style={styles.BtnText}>Sign in with password</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity onPress={this.goToSignUp}>
                <Text style={styles.signupText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SignIn;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headIcon: {
    marginTop: 50,
    right: 150,
  },
  imgContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: 250,
    marginTop: 50,
  },
  image: {
    width: 350,
    height: 150,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  imgText: {
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  facebookText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  socialIconBox: {
    gap: 16,
  },
  googlImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  signInContainer: {
    alignItems: 'center',
  },
  lineImage: {
    width: 280,
    marginTop: 20,
    marginBottom: 20,
  },
  BtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  accountText: {
    color: '#C6C6C6',
  },
  signupText: {
    color: '#775EFF',
    fontWeight: 'bold',
  },
});
