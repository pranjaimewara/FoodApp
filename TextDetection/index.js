import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ToastAndroid,
  StatusBar,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNTextDetector from 'rn-text-detector';
import {PermissionsAndroid} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const TextDetection = ({navigation}) => {
  const [state, setState] = useState({
    loading: false,
    image: null,
    textRecognition: null,
    showImage: false,
    toast: {
      message: '',
      isVisible: false,
    },
  });

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  async function onPress(type) {
    const cameraPermission = await requestCameraPermission();
    if (!cameraPermission) {
      ToastAndroid.show('Camera permission denied', ToastAndroid.SHORT);
      return;
    }

    setState({...state, loading: true});
    type === 'capture'
      ? launchCamera({mediaType: 'photo', saveToPhotos: true}, onImageSelect)
      : launchImageLibrary({mediaType: 'image'}, onImageSelect);
  }

  async function onImageSelect(media) {
    if (!media) {
      setState({...state, loading: false});
      return;
    }

    if (media && media.assets) {
      const file = media.assets[0].uri;

      // Dynamically import RNTextDetector
      const RNTextDetector = await import('rn-text-detector');

      if (RNTextDetector) {
        const textRecognition = await RNTextDetector.default.detectFromUri(
          file,
        );

        const ID_NUMBER = '5003 0517 7469'; // The ID number to match

        // Find an exact match for the numeric ID
        const matchText = textRecognition.findIndex(
          item => item.text.includes(ID_NUMBER), // Check if the detected text contains the ID number
        );

        const toastMessage =
          matchText > -1 ? 'ID Number Found!' : 'ID Number Not Found';

        // Show Toast message
        ToastAndroid.showWithGravityAndOffset(
          toastMessage,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );

        setState({
          ...state,
          textRecognition,
          image: file,
          loading: false,
          showImage: matchText > -1,
        });
        if (matchText > -1) {
          setTimeout(() => {
            navigation.navigate('NewPin');
          }, 3000);
        }
      } else {
        console.error('RNTextDetector is null');
        setState({...state, loading: false});
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <View style={styles.contentContainer}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack('ClassProfile');
            }}>
            <AntDesign name="arrowleft" size={23} color="#D7D9DF" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.photoTitle}>Photo ID Card</Text>
          <Text style={styles.photoDescription}>
            Please point the camera at the ID card
          </Text>
        </View>
        <ImageBackground
          style={styles.image}
          resizeMode="contain"
        //   imageStyle={{}}
          source={require('../../src/assets/images/scannerBox.png')}>
          {state.showImage && state.image ? ( // Display image only if ID number is matched and image is available
            <Image
              source={{uri: state.image}}
              style={styles.aadharimage}
              resizeMode="contain"
            />
          ) : (
            <Image
              style={styles.idCardImage}
              resizeMode="contain"
              source={require('../../src/assets/images/idCard.png')}
            />
          )}
        </ImageBackground>

        <View style={styles.iconBox}>
          <TouchableOpacity
            onPress={() => onPress('library')}
            style={styles.imageCircle}>
            <FontAwesome6 name="image" size={25} color="#513AF3" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onPress('capture')}
            style={styles.scannerCircle}>
            <AntDesign name="scan1" size={30} color="#D7D9DF" />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={() => onPress('capture')}>
          <Text>Take Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          onPress={() => onPress('library')}>
          <Text>Pick a Photo</Text>
        </TouchableOpacity> */}
        {/* <ScrollView>
          {!!state.textRecognition &&
            state.textRecognition.map((item, i) => (
              <Text
                key={i}
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'black',
                }}>
                {item.text}
              </Text>
            ))}
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default TextDetection;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#353844',
    paddingTop: 40,
    alignItems: 'center',
  },
  headContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 25,
    gap: 15,
    alignItems: 'center',
  },
  photoTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#D7D9DF',
  },
  photoDescription: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#A2A3A8',
    marginTop: 15,
  },
  image: {
    // flex:1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    marginBottom: 80,
    height: 400
  },
  aadharimage: {
    width: '80%',
    height: '47%',
    // backgroundColor: 'red',
    borderRadius: 30,
  },
  idCardImage: {
    width: '80%',
    height: '80%',

  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconBox: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginRight: 60,
  },
  imageCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEAFE',
  },
  scannerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#513AF3',
  },
};
