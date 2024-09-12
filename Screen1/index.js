import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';

// Yup validation logic
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').label('Name'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Email is required')
    .label('Email'),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .label('Password'),
});

const Screen1 = ({navigation}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handling login logic and Storing user credentials
  const handleLogin = async values => {
    if (isChecked) {
      try {
        await AsyncStorage.setItem('loginInput', JSON.stringify(values));
        navigation.replace('MyDrawer');
        ToastAndroid.show('Logged in Successfully!', ToastAndroid.LONG);
        console.log('User: ', values);
      } catch (err) {
        console.log('Error during storing :', err);
      }
    } else {
      ToastAndroid.show(
        'Please allow the Terms & Conditions',
        ToastAndroid.LONG,
      );
    }
  };

  // Retrieving User Credentials on every Reload
  useEffect(() => {
    const getLoginInput = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('loginInput');
        if (storedValue) {
          setInitialValues(JSON.parse(storedValue));
        }
      } catch (error) {
        console.log('Error during getting input', error);
      }
    };
    getLoginInput();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F0F0F0'}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.main}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', 'white']}
            useAngle={true}
            angle={180}
            style={styles.container1}>
            <Text style={styles.heading}>Welcome</Text>
          </LinearGradient>
          <View style={styles.container2}>
            <BlurView
              style={styles.absolute}
              blurType="light"
              blurAmount={50}
              // reducedTransparencyFallbackColor="white"
            />
            <View style={styles.innerContainer}>
              <Text style={styles.heading2}>Register with</Text>
              <View style={styles.socialIcons}>
                <View style={styles.Icons}>
                  <Image
                    source={require('../../src/assets/images/facebook.png')}
                    style={styles.Imageicons}
                  />
                </View>
                <View style={styles.Icons}>
                  <Image
                    source={require('../../src/assets/images/apple-logo.png')}
                    style={styles.Imageicons}
                  />
                </View>
                <View style={styles.Icons}>
                  <Image
                    source={require('../../src/assets/images/Google.png')}
                    style={styles.Imageicons}
                  />
                </View>
              </View>
              <View style={styles.lineBox}>
                <Text style={styles.lineText}>or</Text>
              </View>
              <View style={styles.inputContainer}>
                {/* Formik Login Form */}

                <Formik
                  initialValues={initialValues}
                  enableReinitialize
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                  }) => (
                    <View>
                      <TextInput
                        placeholder="Name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        autoCorrect={false}
                        placeholderTextColor={'gray'}
                        style={styles.inputBox}
                      />
                      {errors.name && touched.name && (
                        <Text style={{color: 'red'}}>{errors.name}</Text>
                      )}
                      <TextInput
                        placeholder="Email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        autoCorrect={false}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        value={values.email}
                        placeholderTextColor={'gray'}
                        style={styles.inputBox}
                      />
                      {errors.email && touched.email && (
                        <Text style={{color: 'red'}}>{errors.email}</Text>
                      )}

                      <TextInput
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        autoCapitalize="none"
                        secureTextEntry
                        textContentType="password"
                        value={values.password}
                        placeholderTextColor={'gray'}
                        style={styles.inputBox}
                      />

                      {errors.password && touched.password && (
                        <Text style={{color: 'red'}}>{errors.password}</Text>
                      )}
                      <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={!isValid}>
                        <LinearGradient
                          colors={['white', '#3b5998', '#192f6a']}
                          useAngle={true}
                          angle={180}
                          style={styles.button}>
                          <Text style={styles.buttonText}>SIGNUP</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>

                {/* Terms & Conditions logic */}

                <View style={styles.conditionBox}>
                  <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                    {!isChecked ? (
                      <Image
                        source={require('../../src/assets/images/blankCheckBox.png')}
                        style={{width: 20, height: 20}}
                      />
                    ) : (
                      <Image
                        source={require('../../src/assets/images/CheckedBox.png')}
                        style={{width: 20, height: 20}}
                      />
                    )}
                  </TouchableOpacity>

                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black'}}>I agree with the </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Agreement');
                      }}>
                      <Text style={{color: 'black', fontWeight: '900'}}>
                        Terms and Conditions
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  container1: {
    width: 340,
    height: 200,
    borderWidth: 1,
    marginTop: 80,
    borderRadius: 15,
  },
  heading: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    marginTop: 30,
  },
  container2: {
    width: 300,
    height: 550,
    borderWidth: 1,
    borderRadius: 15,
    position: 'absolute',
    top: 180,
    alignItems: 'center',
    borderColor: 'white',
    overflow: 'hidden', // Ensures the blur effect is contained
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  heading2: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  Icons: {
    width: 50,
    height: 50,
    borderColor: '#D7D7D7',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  Imageicons: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  lineBox: {
    flexDirection: 'row',
    gap: 5,
  },
  lineText: {
    color: 'gray',
    fontSize: 20,
    marginTop: 10,
  },
  inputContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputBox: {
    width: 270,
    height: 50,
    // borderWidth: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CBCBCB',
    // borderColor: '#EAEAE7',
    // borderRadius: 10,
    paddingLeft: 20,
    marginTop: 20,
    color: 'black',
  },
  inputText: {
    color: 'black',
    fontWeight: '900',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 15,
  },
  conditionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 15,
  },
  button: {
    width: 270,
    height: 50,
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
