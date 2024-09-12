import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from 'react-native';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Pranjai',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('EventScreen1');
    }, 3000);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <View style={styles.main}>
          <ImageBackground
            source={require('../../src/assets/images/cellphone.jpg')}
            style={styles.imageBackground}
            imageStyle={{resizeMode: 'cover'}}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome to {'\n'} Eveno! 👋</Text>
              <View style={{marginTop: 20}}>
                <Text style={styles.description}>
                  The best event booking and online ticketing
                </Text>
                <Text style={styles.description}>
                  application in this century.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    marginTop: 570,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 37,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 20,
    fontFamily: 'OpenSans',
  },
  description: {
    color: '#E8E8E8',
    textAlign: 'center',
  },
});
