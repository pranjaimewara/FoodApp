import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
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
import axios from 'axios';

import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

// Yup validation logic
const validationSchema = Yup.object().shape({
  phone: Yup.number()
    // .typeError("That doesn't look like a phone number")
    // .positive("A phone number can't start with a minus")
    // .integer("A phone number can't include a decimal point")
    .min(10)
    .required('A phone number is required'),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    // .matches(/\d/, 'Password must have a number')
    // .matches(/[^A-Za-z 0-9]/g, 'Password must have a special character')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
});

class ApiLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      isChecked: false,
      initialValues: {
        phone: '',
        password: '',
        error: '',
      },
      hidePass: true,
      emailfocus: false,
      passwordfocus: false,
    };
  }

  goBack = () => {
    this.props.navigation.goBack('SignUp');
  };

  handlePost = async (phone, password) => {
    // phone and password are parameters
    try {
      const res = await axios.post(
        'https://arrowssocialnetwork1-466346-ruby.b466346.dev.eastus.az.svc.builder.cafe/bx_block_login/login',
        {
          data: {
            attributes: {
              full_phone_number: phone,
              password: password,
            },
          },
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      );

      if (res.status === 200) {
        console.log('Status Code: ', res.status);
        console.log('Response:', res.data); // Log the response data
        return true; // Indicate successful login
      } else {
        this.setState({error: `Unexpected status code: ${res.status}`});

        return false; // Indicate unsuccessful login
      }
    } catch (error) {
      console.log('Error:', error);
      return false; // Indicate unsuccessful login
    }
  };

  handleLogin = async (values, {resetForm}) => {
    const isLoginSuccessful = await this.handlePost(
      values.phone,
      values.password,
    );
    // values.phone and values.password are arguements which we are taking through values of Formik form.

    if (isLoginSuccessful) {
      if (this.state.isChecked) {
        try {
          await AsyncStorage.setItem('signInput', JSON.stringify(values));
          this.props.navigation.replace('Screen4');
          ToastAndroid.show('Signed up Successfully!', ToastAndroid.LONG);
          console.log('User: ', values);
        } catch (err) {
          console.log('Error during storing:', err);
        }
      } else {
        this.props.navigation.replace('Screen4');
        ToastAndroid.show('Signed up Successfully!', ToastAndroid.LONG);
        console.log('User: ', values);
      }
    } else {
      ToastAndroid.show(
        'Login failed. Please check your credentials.',
        ToastAndroid.LONG,
      );
      resetForm();
    }
  };

  // handlePost = async (phone, password) => {
  //   try {
  //     const res = await axios.post(
  //       'https://arrowssocialnetwork1-466346-ruby.b466346.dev.eastus.az.svc.builder.cafe/bx_block_login/login',
  //       {
  //         data: {
  //           attributes: {
  //             full_phone_number: phone,
  //             password: password,
  //           },
  //         },
  //       },
  //       {
  //         headers: {'Content-Type': 'application/json'},
  //       },
  //     );

  //     if (res.status === 200) {
  //       console.log('Status Code: ', res.status);
  //       console.log('Response:', res.data); // Directly log the response data
  //       return true; // Indicate successful login
  //     } else {
  //       this.setState({error: `Unexpected status code: ${res.status}`});
  //       return false; // Indicate unsuccessful login
  //     }
  //   } catch (error) {
  //     console.log('Error:', error);
  //     return false; // Indicate unsuccessful login
  //   }
  // };

  // Updated handleLogin method to call handlePost first
  // handleLogin = async values => {
  //   const {phone, password} = values;

  //   // First, call the API to authenticate the user
  //   const isLoginSuccessful = await this.handlePost(phone, password);

  //   if (isLoginSuccessful) {
  //     // If login is successful, check if "Remember me" is checked and store credentials
  //     if (this.state.isChecked) {
  //       try {
  //         await AsyncStorage.setItem('signInput', JSON.stringify(values));
  //         console.log('User credentials stored:', values);
  //       } catch (err) {
  //         console.log('Error during storing:', err);
  //       }
  //     }
  //     // Navigate to next screen
  //     this.props.navigation.replace('Screen4');
  //     ToastAndroid.show('Signed in Successfully!', ToastAndroid.LONG);
  //   } else {
  //     // Handle login failure
  //     ToastAndroid.show(
  //       'Login failed. Please check your credentials.',
  //       ToastAndroid.LONG,
  //     );
  //   }
  // };

  // Retreiving User credentials using componentDidMount.

  componentDidMount() {
    GoogleSignin.configure({});
    const getLoginInput = async () => {
      try {
        const storedLoginValue = await AsyncStorage.getItem('signInput');
        if (storedLoginValue) {
          this.setState({initialValues: JSON.parse(storedLoginValue)});
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
            <View style={styles.image}>
              <Image
                source={require('../../src/assets/images/envoLetter.png')}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.imgText}>Login to Your account</Text>
            </View>
          </View>
          <View>
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
                resetForm,
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
                    placeholder="phone"
                    onChangeText={handleChange('phone')}
                    onBlur={() => {
                      handleBlur('phone'), this.setState({emailfocus: false});
                    }}
                    keyboardType="number-pad"
                    value={values.phone}
                    placeholderTextColor={'gray'}
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
                      top: 91,
                      left: 22,
                    }}>
                    <FontAwesome name="lock" size={18} color="gray" />
                  </View>

                  <TextInput
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={() => {
                      handleBlur('password'),
                        this.setState({passwordfocus: false});
                    }}
                    autoCapitalize="none"
                    secureTextEntry={this.state.hidePass}
                    textContentType="password"
                    value={values.password}
                    placeholderTextColor={'gray'}
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
                      top: 91,
                      left: 290,
                    }}
                    onPress={() => {
                      this.setState({hidePass: !this.state.hidePass});
                    }}>
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
                    {errors.phone && touched.phone && (
                      <Text style={{color: 'red', textAlign: 'center'}}>
                        {errors.phone}
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
                    disabled={!isValid}>
                    <Text style={styles.BtnText}>Sign in</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ForgotPassword');
                    }}>
                    <Text style={{color: 'blue', textAlign: 'center'}}>
                      Forgot the password?
                    </Text>
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
                  this.props.navigation.navigate('SignUp');
                }}>
                <Text style={styles.signupText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ApiLogin;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headIcon: {
    marginTop: 40,
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
    marginTop: 30,
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
    width: 330,
    marginTop: 15,
    height: 15,
  },
  checkMarkContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
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