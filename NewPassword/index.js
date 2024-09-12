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
  Modal,
  TouchableWithoutFeedback, // Import this for dismissing modal
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styleConstant from '../../constants/styles';
import LottieView from 'lottie-react-native';

// Yup validation logic
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(/[^A-Za-z 0-9]/g, 'Password must have a special character')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required')
    .label('Password Confirmation'),
});

class NewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
      isChecked: false,
      initialValues: {
        password: '',
        passwordConfirmation: '',
      },
      isModalVisible: false, // Move isModalVisible out of initialValues
      hidePass: true,
    };
  }

  goBack = () => {
    this.props.navigation.goBack('OtpVerify');
  };

  handleLogin = async values => {
    if (this.state.isChecked) {
      try {
        await AsyncStorage.setItem('passwordInput', JSON.stringify(values));
        this.toggleModal();
        setTimeout(() => {
          this.toggleModal;
          this.props.navigation.replace('ClassProfile');
          ToastAndroid.show('Signed up Successfully!', ToastAndroid.LONG);
          console.log('User: ', values);
        }, 2000);
      } catch (err) {
        console.log('Error during storing:', err);
      }
    } else {
      this.toggleModal();
      setTimeout(() => {
        this.props.navigation.replace('ClassProfile');
        ToastAndroid.show('Signed up Successfully!', ToastAndroid.LONG);
        console.log('User: ', values);
      }, 2000);
    }
  };

  componentDidMount() {
    const getLoginInput = async () => {
      try {
        const storedPasswordValue = await AsyncStorage.getItem('passwordInput');
        if (storedPasswordValue) {
          this.setState({initialValues: JSON.parse(storedPasswordValue)});
        }
      } catch (error) {
        console.log('Error during getting input', error);
      }
    };
    getLoginInput();
  }

  //   toggleModal = () => {
  //     this.setState({isModalVisible: !this.state.isModalVisible});
  //   };
  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
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
          <View style={styles.headContainer}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack('LoginClass');
              }}>
              <AntDesign name="arrowleft" size={23} color="black" />
            </TouchableOpacity>
            <Text style={styles.headingText}>Create New Password</Text>
          </View>
          <View style={styles.imgContainer}>
            <View style={styles.image}>
              <Image
                source={require('../../src/assets/images/newpassword.png')}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.imgText}>Create New Password</Text>
            </View>
          </View>
          {/* <Button title="Open modal" onPress={this.toggleModal} /> */}
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
              }) => (
                <View style={styles.inputContainer}>
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: 17,
                      left: 22,
                    }}>
                    <FontAwesome name="lock" size={18} color="gray" />
                  </View>

                  <TextInput
                    placeholder="enter your new password"
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
                      top: 17,
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
                      position: 'absolute',
                      zIndex: 1,
                      top: 87,
                      left: 22,
                    }}>
                    <FontAwesome name="lock" size={18} color="gray" />
                  </View>

                  <TextInput
                    placeholder="confirm your new password"
                    onChangeText={handleChange('passwordConfirmation')}
                    onBlur={() => {
                      handleBlur('passwordConfirmation'),
                        this.setState({passwordfocus: false});
                    }}
                    autoCapitalize="none"
                    secureTextEntry={this.state.hidePass}
                    textContentType="password"
                    value={values.passwordConfirmation}
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
                      top: 87,
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
                    {errors.password && touched.password && (
                      <Text style={{color: 'red'}}>{errors.password}</Text>
                    )}
                    {errors.passwordConfirmation &&
                      touched.passwordConfirmation && (
                        <Text style={{color: 'red'}}>
                          {errors.passwordConfirmation}
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
                    <Text style={styles.BtnText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>

            {/* Modal View */}
            <Modal
              statusBarTranslucent
              visible={this.state.isModalVisible}
              transparent={true}
              animationType="slide">
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback onPress={this.toggleModal}>
                  <View style={styles.overlayTouchable} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Image
                    source={require('../../src/assets/images/congratsModal.png')}
                    style={{
                      width: 220,
                      height: 210,
                      marginTop: 10,
                      alignSelf: 'center',
                    }}
                    resizeMode="cover"
                  />
                  <View style={{width: '85%'}}>
                    <Text style={{color: 'black', textAlign: 'center'}}>
                      Your account is ready to use. You will be redirected to
                      the Home page in a few seconds.
                    </Text>
                  </View>
                  <LottieView
                    source={require('../../src/assets/images/envoLottie.json')}
                    autoPlay
                    loop
                    speed={1}
                    style={{width: 100, height: 120}}
                  />

                  {/* <Button title="Close Modal" onPress={this.toggleModal} /> */}
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default NewPassword;

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
    paddingTop: 30,
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
    marginTop: 30,
    textAlign: 'center',
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
  checkMarkContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    gap: 20,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  modalContent: {
    width: '80%',
    height: '55%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 100,
    height: 300,
    alignItems: 'center',
  },
  Loginbtn: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: '#2A52BD',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  logintxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
