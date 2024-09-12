import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styleConstant from '../../constants/styles';

const slides = [
  {
    key: 1,
    title: 'Grab all events now only \n in your hands',
    text: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic',
    image: require('../../src/assets/images/pic1.png'),
  },
  {
    key: 2,
    title: 'Easy payment and fast \n event ticketing',
    text: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic',
    image: require('../../src/assets/images/pic2.png'),
  },
  {
    key: 3,
    title: 'Lets go to your favourite \n event right now',
    text: 'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic',
    image: require('../../src/assets/images/pic3.png'),
  },
];

class EventScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRealApp: false,
    };
  }

  _renderItem = ({item}) => {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View style={styles.main}>
          <View style={styles.imageContainer}>
            <Image
              source={item.image}
              style={styles.pic1Image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.text}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styleConstant.GetStartedBtn}>
        <Text style={styles.BtnText}>Next</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styleConstant.GetStartedBtn}>
        <Text style={styles.BtnText}>Get Started</Text>
      </View>
    );
  };

  onDone = () => {
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
        dotStyle={styles.dotStyle} // Apply custom style to dots
        activeDotStyle={styles.activeDotStyle} // Apply custom style to active dot
        bottomButton
        onDone={this.onDone}
      />
    );
  }
}

export default EventScreen1;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  pic1Image: {
    width: 310,
    marginTop: 60,
  },
  textContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    top: 500,
    padding: 20,
  },
  title: {
    color: '#442CED',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 35,
    marginTop: 10,
  },
  description: {
    color: 'black',
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotStyle: {
    backgroundColor: '#cccccc', // Change to your desired color for inactive dots
    width: 10, // Adjust the width of the dot
    height: 10, // Adjust the height of the dot
    borderRadius: 5, // Make it a circle
    
  },
  activeDotStyle: {
    backgroundColor: '#442CED', // Change to your desired color for active dot
    width: 12, // Adjust the width of the active dot
    height: 12, // Adjust the height of the active dot
    borderRadius: 6, // Make it a circle
  },
  BtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomBtn: {
    width: 320,
    height: 50,
    borderWidth: 1,
    // marginTop: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#452CF1',
  },
});
