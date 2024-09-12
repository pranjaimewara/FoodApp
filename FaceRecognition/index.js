import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {authenticate} from './Bio';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  enableBiometricAuth = () => {
    const rnBiometrics = new ReactNativeBiometrics();

    rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        const {available, biometryType} = resultObject;

        // Check if Face ID is available
        if (available && biometryType === BiometryTypes.FaceID) {
          Alert.alert(
            'FaceID Authentication',
            'Would you like to enable FaceID authentication for next time?',
            [
              {
                text: 'Yes, enable FaceID',
                onPress: async () => {
                  Alert.alert(
                    'Success!',
                    'FaceID authentication enabled successfully!',
                  );
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else {
          // Alert that FaceID is not available
          Alert.alert(
            'FaceID not supported',
            'This device does not support FaceID.',
          );
        }
      })
      .catch(error => {
        console.error('Error checking biometrics:', error);
        Alert.alert(
          'Error',
          'An error occurred while checking biometric availability.',
        );
      });
  };

  handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();

      const result = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate with FaceID',
        cancelButtonText: 'Cancel',
      });

      if (result.success) {
        Alert.alert('Success', 'FaceID authentication successful');
      } else {
        Alert.alert('Authentication failed', 'FaceID authentication failed');
      }
    } catch (error) {
      console.error('[handleBiometricAuth] Error:', error);
      Alert.alert('Error', 'Biometric authentication failed');
    }
  };

  updateState(newState) {
    this.setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView>
          <LinearGradient
            colors={['#c7fff4', '#fffaeb', '#ffffff']}
            style={styles.Bcontainer}>
            <View style={styles.container}>
              <View style={styles.header}>
                <Text style={styles.title}>Welcome back..!!</Text>
                <Text style={styles.subtitle}>Sign in to your account</Text>
              </View>

              <View style={styles.form}>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Email address</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    placeholder="darshana.wijebahu@gmail.com"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    value={this.state.email}
                    onChangeText={email => this.updateState({email})}
                  />
                </View>

                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    autoCorrect={false}
                    placeholder="********"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.updateState({password})}
                  />
                </View>
                {/* The Function That call to tigger avalible BiometricAuth*/}
                <View style={styles.formAction}>
                  <TouchableOpacity onPress={this.handleBiometricAuth}>
                    <LinearGradient
                      colors={['#4c669f', '#3b5998', '#192f6a']}
                      style={styles.btn}>
                      <Text style={styles.btnText}>Sign in</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  {/* The Function That call to find check availible*/}
                  <TouchableOpacity onPress={this.enableBiometricAuth}>
                    <LinearGradient
                      start={{x: 1, y: 1}}
                      end={{x: 1, y: 0}}
                      colors={['#240042', '#a142ff', '#240042']}
                      style={styles.btnE}>
                      <Text style={styles.btnText}>
                        Availible BiometricAuth
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.formFooter}>
                    Don't have an account?{' '}
                    <Text style={{textDecorationLine: 'underline'}}>
                      Sign up
                    </Text>
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.formFooter}>
                    <Text style={{textDecorationLine: 'underline'}}>
                      {' '}
                      use Finger Print or Face ID
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Image
              source={{
                uri: 'https://raw.githubusercontent.com/ShanCodeWay/ShanCodeWay/main/linkdean.png',
              }}
              style={styles.banner}
              resizeMode="contain"
            />
          </LinearGradient>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Bcontainer: {
    flex: 1,
  },
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 42,
    fontWeight: 'bold',
    color: '#001f33',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#929292',
    textAlign: 'center',
  },
  /** Form */
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    elevation: 5,
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  btnE: {
    marginTop: 20,
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    paddingLeft: 10,

    width: '100%',
    height: 400,
    paddingRight: 10,
    borderRadius: 50,
  },
  banner: {
    width: '100%',
    height: 300,
  },
});
