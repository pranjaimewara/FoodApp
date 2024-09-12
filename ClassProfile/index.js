import {Component} from 'react';
import React from 'react';
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
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styleConstant from '../../constants/styles';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker';
import DropDownPicker from 'react-native-dropdown-picker';

class ClassProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedImage: null,
      selectedDate: new Date(),
      datePickerVisible: false,
      selectedCountryCode: '+91',
      selectedCountryFlag: '🇮🇳',
      phone: '',
      open: false,
      value: null,
      items: [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Others', value: 'others'},
      ],
    };
  }

  openDropdown = open => {
    this.setState({open});
  };

  setValue = callback => {
    this.setState(state => ({
      value: callback(state.value),
    }));
  };

  setItems = callback => {
    this.setState(state => ({
      items: callback(state.items),
    }));
  };

  showDatePicker = () => {
    this.setState({datePickerVisible: true});
  };

  hideDatePicker = () => {
    this.setState({datePickerVisible: false});
  };

  handleConfirm = date => {
    this.setState({selectedDate: date});
    this.hideDatePicker();
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  // Camera functionality --------------------------

  // Gallery image picker logic :-
  openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        this.setState({selectedImage: imageUri});
        this.saveImageUri(imageUri);
        this.setState({isModalVisible: false});
      }
    });
  };

  // Camera image picker logic
  handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        this.setState({selectedImage: imageUri});
        this.saveImageUri(imageUri);
        this.setState({isModalVisible: false});

        console.log(imageUri);
      }
    });
  };

  // Requesting permission through camera
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'Cool Photo App needs access to your camera ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.handleCameraLaunch();
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Storing the Image
  saveImageUri = async imageUri => {
    try {
      await AsyncStorage.setItem('profileImageUri', imageUri);
      console.log('Profile Image saved');
    } catch (error) {
      console.log('Error saving the Image', error);
    }
  };
  // Loading and getting the profileImage.

  componentDidMount() {
    loadImageUri = async () => {
      try {
        const uri = await AsyncStorage.getItem('profileImageUri');
        if (uri !== null) {
          this.setState({selectedImage: uri});
        }
      } catch (err) {
        console.log('Error during loading the Image', err);
      }
    };
    loadImageUri();
  }

  // deleting the image
  deleteImageUri = async () => {
    try {
      await AsyncStorage.removeItem('profileImageUri');
      this.setState({selectedImage: null});
      this.setState({isModalVisible: false});
      console.log('Image removed successfully');
    } catch (error) {
      console.log('Error during removing the Image', error);
    }
  };
  setSelected = (countryCode, flag) => {
    this.setState({
      selectedCountryCode: countryCode,
      selectedCountryFlag: flag,
    });
  };

  handlePhoneChange = text => {
    // Remove the country code if it is already there to prevent duplication
    const phoneNumberWithoutCode = text
      .replace(this.state.selectedCountryCode, '')
      .trim();
    this.setState({phone: phoneNumberWithoutCode});
  };

  render() {
    const {selectedDate, selectedCountryCode, selectedCountryFlag, phone} =
      this.state;
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString() : '';

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack('LoginClass');
            }}>
            <AntDesign name="arrowleft" size={23} color="black" />
          </TouchableOpacity>
          <Text style={styles.headingText}>Fill Your Profile</Text>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileBox}>
            {this.state.selectedImage ? (
              <Image
                source={{uri: this.state.selectedImage}}
                style={styles.userImage}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require('../../src/assets/images/sampleUser.png')}
                style={styles.userImage}
                resizeMode="contain"
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({isModalVisible: !this.state.isModalVisible});
            }}
            style={styles.editIcon}>
            <FontAwesome name="pencil-square" size={30} color="#452CF1" />
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}
          statusBarTranslucent>
          <View style={styles.overlay}>
            {/* Wrapping only the overlay with TouchableWithoutFeedback */}
            <TouchableWithoutFeedback onPress={this.toggleModal}>
              <View style={styles.overlayTouchable} />
            </TouchableWithoutFeedback>
            {/* The modal content is not wrapped with TouchableWithoutFeedback */}
            <View style={styles.modalView}>
              <View style={styles.modalHead}>
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={this.toggleModal}>
                  {/* Adding onPress to close button */}
                  <FontAwesome name="close" size={20} color="#980012" />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 22,
                    marginLeft: 90,
                  }}>
                  Profile photo
                </Text>
              </View>
              {/* Add any other content of the modal here */}
              <View style={styles.cameraContainer}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.requestCameraPermission();
                    }}
                    style={styles.cameraIcon}>
                    <FontAwesome name="camera" size={25} color="#452CF1" />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>Camera</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.openImagePicker();
                    }}
                    style={styles.cameraIcon}>
                    <FontAwesome name="image" size={25} color="#452CF1" />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>Gallery</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.deleteImageUri();
                    }}
                    style={styles.cameraIcon}>
                    <AntDesign name="delete" size={25} color="#452CF1" />
                  </TouchableOpacity>
                  <Text style={styles.iconText}>Delete</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.main}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.main}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Full  Name"
                  placeholderTextColor={'#C2C2C2'}
                  style={styles.inputBox}
                />
                <TextInput
                  placeholder="Nickname"
                  placeholderTextColor={'#C2C2C2'}
                  style={styles.inputBox}
                />
                <View style={styles.dobBox}>
                  <TextInput
                    placeholder="Date of Birth"
                    placeholderTextColor={'#C2C2C2'}
                    style={styles.inputBox}
                    value={formattedDate}
                  />
                  <DateTimePickerModal
                    date={this.state.selectedDate}
                    isVisible={this.state.datePickerVisible}
                    mode="date"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                  />

                  <TouchableOpacity
                    onPress={this.showDatePicker}
                    style={styles.calendarIcon}>
                    <FontAwesome name="calendar" size={13} color="gray" />
                  </TouchableOpacity>
                </View>
                <View style={styles.dobBox}>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={'#C2C2C2'}
                    style={styles.inputBox}
                  />
                  <TouchableOpacity style={styles.calendarIcon}>
                    <FontAwesome name="envelope-o" size={13} color="gray" />
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="+1000 000 000"
                  placeholderTextColor={'#C2C2C2'}
                  style={styles.countryTextInput}
                  value={`${phone}`}
                  keyboardType="number-pad"
                  onChangeText={text => this.handlePhoneChange(text)}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 305,
                    left: 26,
                    zIndex: 10, // Set a higher zIndex for the country picker
                  }}>
                  <CountryCodeDropdownPicker
                    selected={selectedCountryCode}
                    setSelected={(countryCode, flag) =>
                      this.setSelected(countryCode, flag)
                    }
                    countryCodeTextStyles={{
                      fontSize: 13,
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                    searchStyles={{
                      width: '95%',
                      backgroundColor: '#F3F3F3',
                      alignSelf: 'center',
                      borderWidth: 0,
                      borderColor: 'transparent',
                    }}
                    searchTextStyles={{color: 'black'}}
                    countryCodeContainerStyles={{
                      width: 70,
                      alignItems: 'center',
                      zIndex: 2,
                    }}
                    dropdownStyles={{
                      width: '95%',
                      backgroundColor: 'white',
                      zIndex: 2,
                      alignSelf: 'center',
                    }}
                    dropdownTextStyles={{color: 'black'}}
                  />
                </View>
              </View>
            </View>
            <View style={styles.dropdownBox}>
              <DropDownPicker
                open={this.state.open}
                value={this.state.value}
                items={this.state.items}
                setOpen={open => this.openDropdown(open)}
                setValue={this.setValue}
                setItems={this.setItems}
                style={[styles.genderBox, {zIndex: 1}]}
                placeholder="Select Gender"
                placeholderTextColor={'#C2C2C2'}
                containerStyle={{
                  width: '90%',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('TextDetection');
                }}
                style={styleConstant.GetStartedBtn}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default ClassProfile;

const styles = StyleSheet.create({
  main: {
    width: '100%',
  },
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
  profileContainer: {
    paddingTop: 20,
    width: '100%',
    height: 160,
    alignItems: 'center',
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  profileBox: {
    width: 125,
    height: 125,
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  editIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 110,
    left: 210,
  },
  inputContainer: {
    width: '100%',
    padding: 20,
    gap: 20,
    // backgroundColor: 'red'
  },
  inputBox: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    paddingLeft: 20,
    color: 'black',
    backgroundColor: '#F3F3F3',
  },
  genderBox: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    paddingLeft: 20,
    color: 'black',
    backgroundColor: '#F3F3F3',
    borderWidth: 0,
    marginBottom: 20,
    alignSelf: 'center',
  },
  countryTextInput: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    paddingLeft: 80,
    color: 'black',
    backgroundColor: '#F3F3F3',
  },
  dobBox: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'blue'
  },
  dropdownBox: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'yellow',
    alignItems: 'center',
  },
  calendarIcon: {
    zIndex: 1,
    right: 30,
  },
  closeIcon: {
    zIndex: 1,
    top: 316,
    left: 35,
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  overlayTouchable: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '22%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  modalHead: {
    width: '100%',
    paddingTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  cameraContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
    marginTop: 30,
  },
  cameraIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#452CF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: 'black',
  },
});
