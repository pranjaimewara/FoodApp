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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styleConstant from '../../constants/styles';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import LinearGradient from 'react-native-linear-gradient';

class FingerprintScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  enableBiometricAuth = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics
      .isSensorAvailable()
      .then(resultObject => {
        const {available, biometryType} = resultObject;

        if (available && biometryType === BiometryTypes.TouchID) {
          Alert.alert(
            'TouchID',
            'Would you like to enable TouchID authentication for the next time?',
            [
              {
                text: 'Yes please',
                onPress: async () => {
                  Alert.alert(
                    'Success!',
                    'TouchID authentication enabled successfully!',
                  );
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else if (available && biometryType === BiometryTypes.FaceID) {
          Alert.alert(
            'FaceID',
            'Would you like to enable FaceID authentication for the next time?',
            [
              {
                text: 'Yes please',
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
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          Alert.alert(
            'Device Supported Biometrics',
            'Biometrics authentication is supported.',
          );
        } else {
          Alert.alert(
            'Biometrics not supported',
            'This device does not support biometric authentication.',
          );
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert(
          'Error',
          'An error occurred while checking biometrics availability.',
        );
      });
  };

  // handleBiometricAuth = async () => {
  //   const success = await authenticate();
  //   if (success) {
  //     Alert.alert('Success', 'Biometric authentication successful');
  //   } else {
  //     Alert.alert('Authentication failed', 'Biometric authentication failed');
  //   }
  // };

  handleBiometricAuth = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Authenticate to continue',
      });

      if (success) {
        Alert.alert('Success', 'Biometric authentication successful');
        return true;
      } else {
        Alert.alert('Authentication failed', 'Biometric authentication failed');
        return false;
      }
    } catch (error) {
      console.error('[handleBiometricAuth] Error:', error);
      Alert.alert('Error', 'Biometric authentication failed from device');
      return false;
    }
  };

  updateState(newState) {
    this.setState(prevState => ({
      ...prevState,
      ...newState,
    }));
  }

  goBackToFingerprint = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack('NewPin');
            }}>
            <AntDesign name="arrowleft" size={23} color="black" />
          </TouchableOpacity>
          <Text style={styles.headingText}>Set Your Fingerprint</Text>
        </View>
        <View style={styles.scannerContainer}>
          <Text style={styles.fingerprintDescription}>
            Add a fingerprint to make your account more secure.
          </Text>
          <Image
            style={styles.fingerprintImage}
            source={require('../../src/assets/images/fingerprint.png')}
            resizeMode="contain"
          />
          <Text style={styles.scannerText}>
            Please click continue to add a fingerprint to make your account more
            secure.
          </Text>
        </View>
        <View style={styles.btnBox}>
          <TouchableOpacity
            onPress={this.goBackToFingerprint}
            style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleBiometricAuth}
            style={styles.continueBtn}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  headContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    paddingTop: 50,
    paddingLeft: 25,
    gap: 15,
    alignItems: 'center',
  },
  headingText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scannerContainer: {
    width: '75%',
    alignItems: 'center',
    marginTop: '25%',
    // backgroundColor: 'red',
  },
  fingerprintDescription: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: '25%',
  },
  fingerprintImage: {
    width: '100%',
    height: '35%',
    marginBottom: '25%',
  },
  scannerText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  btnBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'yellow',
    marginTop: 20,
    paddingVertical: 30,
    gap: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  skipBtn: {
    width: '45%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#E1E0FC',
    justifyContent: 'center',
  },
  continueBtn: {
    width: '45%',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#775EFF',
    justifyContent: 'center',
  },
  skipText: {
    color: '#4830F2',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  continueText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
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

export default FingerprintScanner;
