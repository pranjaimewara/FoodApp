import React, {Component} from 'react';
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
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styleConstant from '../../constants/styles';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

// Yup validation logic
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required')
    .label('Email'),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(/[^A-Za-z 0-9]/g, 'Password must have a special character')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      isChecked: false,
      initialValues: {
        email: '',
        password: '',
      },
      hidePass: true,
      emailfocus: false,
      passwordfocus: false,
    };
  }

  goBack = () => {
    this.props.navigation.goBack('SignIn');
  };

  // Handling login logic and storing user credentials
  handleLogin = async values => {
    if (this.state.isChecked) {
      try {
        await AsyncStorage.setItem('loginInput', JSON.stringify(values));
        this.props.navigation.navigate('LoginClass');
        ToastAndroid.show('Signed up Successfully!', ToastAndroid.LONG);
        console.log('User: ', values);
      } catch (err) {
        console.log('Error during storing:', err);
      }
    } else {
      this.props.navigation.navigate('LoginClass');
      ToastAndroid.show('Signed up Successfully!', ToastAndroid.LONG);
      console.log('User: ', values);
    }
  };

  // Retreiving User credentials using componentDidMount.

  componentDidMount() {
    GoogleSignin.configure({});
    const getLoginInput = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('loginInput');
        if (storedValue) {
          this.setState({initialValues: JSON.parse(storedValue)});
        }
      } catch (error) {
        console.log('Error during getting input', error);
      }
    };
    getLoginInput();
  }

  // Google SignIn logic
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
            <Image
              source={require('../../src/assets/images/envoLetter.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.imgText}>Create New Account</Text>
          </View>
          <View style={styles.formikContainer}>
            {/* Formik Login Form */}
            <Formik
              initialValues={this.state.initialValues}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={this.handleLogin}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <View style={styles.inputContainer}>
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: 17,
                      left: 22,
                    }}>
                    <FontAwesome name="envelope" size={13} color="gray" />
                  </View>
                  <TextInput
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    // onBlur={handleBlur('email')}
                    onBlur={() => {
                      handleBlur('email'), this.setState({emailfocus: false});
                    }}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    autoCorrect={false}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={values.email}
                    placeholderTextColor={'#BDBDBD'}
                    style={[
                      styles.inputBox,
                      this.state.emailfocus ? styles.textFocusEmail : null,
                    ]}
                    onFocus={() => {
                      this.setState({emailfocus: true});
                    }}
                  />

                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: 97,
                      left: 22,
                    }}>
                    <FontAwesome name="lock" size={18} color="gray" />
                  </View>

                  <TextInput
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    // onBlur={handleBlur('password')}
                    onBlur={() => {
                      handleBlur('password'),
                        this.setState({passwordfocus: false});
                    }}
                    autoCapitalize="none"
                    secureTextEntry={this.state.hidePass}
                    textContentType="password"
                    value={values.password}
                    placeholderTextColor={'#BDBDBD'}
                    onFocus={() => {
                      this.setState({passwordfocus: true});
                    }}
                    style={[
                      styles.inputBox,
                      this.state.passwordfocus
                        ? styles.textFocusPassword
                        : null,
                    ]}
                  />

                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: 97,
                      left: 290,
                    }}
                    onPress={() =>
                      this.setState({hidePass: !this.state.hidePass})
                    }>
                    {!this.state.hidePass ? (
                      <FontAwesome name="eye" size={16} color="gray" />
                    ) : (
                      <FontAwesome name="eye-slash" size={16} color="gray" />
                    )}
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: 'row',
                      textAlign: 'center',
                      justifyContent: 'center',
                      gap: 20,
                      width: 200,
                      alignSelf: 'center',
                    }}>
                    {errors.email && touched.email && (
                      <Text style={{color: 'red', textAlign: 'center'}}>
                        {errors.email}
                      </Text>
                    )}
                    {errors.password && touched.password && (
                      <Text style={{color: 'red', textAlign: 'center'}}>
                        {errors.password}
                      </Text>
                    )}
                  </View>
                  <View style={styles.checkMarkContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({isChecked: !this.state.isChecked})
                      }>
                      {!this.state.isChecked ? (
                        <FontAwesome name="square-o" size={20} color="blue" />
                      ) : (
                        <FontAwesome
                          name="check-square-o"
                          size={20}
                          color="blue"
                        />
                      )}
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        marginBottom: 5,
                      }}>
                      Remember me
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styleConstant.GetStartedBtn}
                    onPress={handleSubmit}
                    >
                    <Text style={styles.BtnText}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            {/* Saving User Credentials */}
          </View>

          <View style={styles.signInContainer}>
            <Image
              source={require('../../src/assets/images/continueImage.png')}
              style={styles.lineImage}
            />
            <View style={styles.socialIconBox}>
              <TouchableOpacity style={styleConstant.socialIcon}>
                <Ionicons name="logo-facebook" size={25} color="#1888ED" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.googleLogin}
                style={styleConstant.socialIcon}>
                <Image
                  source={require('../../src/assets/images/Google.png')}
                  style={styles.googlImage}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styleConstant.socialIcon}>
                <Ionicons name="logo-apple" size={25} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.signupContainer}>
              <Text style={styles.accountText}>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('LoginClass');
                }}>
                <Text style={styles.signupText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SignUp;

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
    backgroundColor: 'white',
    height: 200,
    width: '100%',
    flexDirection: 'column',
    paddingTop: 20,
  },
  image: {
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'blue',
  },
  imgText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  facebookText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  socialIconBox: {
    gap: 20,
    flexDirection: 'row',
    marginTop: 25,
  },
  googlImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  signInContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  lineImage: {
    width: 280,
    height: 20,
    marginTop: 15,
  },
  checkMarkContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  accountText: {
    color: 'gray',
  },
  signupText: {
    color: 'blue',
    fontWeight: 'bold',
    left: 5,
  },
  formikContainer: {
    backgroundColor: 'white',
  },
  inputContainer: {
    gap: 25,
  },
  inputBox: {
    width: 320,
    height: 50,
    paddingLeft: 50,
    color: 'black',
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
  },
  textFocusEmail: {
    width: 320,
    height: 50,
    paddingLeft: 50,
    color: 'black',
    borderRadius: 20,
    backgroundColor: '#DEEBFF',
    borderColor: 'blue',
    borderWidth: 1,
  },
  textFocusPassword: {
    width: 320,
    height: 50,
    paddingLeft: 50,
    color: 'black',
    borderRadius: 20,
    backgroundColor: '#DEEBFF',
    borderColor: 'blue',
    borderWidth: 1,
  },
  BtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
