import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('WelcomeScreen');
    }, 3000);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'white'}
        translucent={true}
      />
      {/* <LinearGradient
        colors={['white', '#3b5998', '#8914AB']}
        useAngle={true}
        angle={250}
        style={styles.main}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 40,
            textAlign: 'center',
          }}>
          InstaSlack
        </Text>
        <LottieView
          source={require('../../src/assets/images/InstaSlack.json')}
          autoPlay
          loop
          speed={1}
          style={{width: 300, height: 300}}
        />
      </LinearGradient> */}
      <View style={styles.main}>
        <View style={{marginTop: 300}}>
          <Image source={require('../../src/assets/images/Eveno.png')} />
        </View>
        <View >
          <LottieView
            source={require('../../src/assets/images/envoLottie.json')}
            autoPlay
            loop
            speed={1}
            style={{width: 100, height: 100}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 200,
  },
});
