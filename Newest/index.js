import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';

const Newest = () => {
  const DATA = [
    {
      id: '1',
      image: require('../../src/assets/images/London.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
    },
    {
      id: '2',
      image: require('../../src/assets/images/London.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
    },
    {
      id: '3',
      image: require('../../src/assets/images/London.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
    },
    {
      id: '4',
      image: require('../../src/assets/images/mountain.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
    },
    {
      id: '5',
      image: require('../../src/assets/images/London.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
    },
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.card}>
        <ImageBackground
          source={item.image}
          style={styles.imageBackground}
          imageStyle={{borderRadius: 15}}>
          <View style={styles.content}>
            <Text style={styles.heading}>{item.heading}</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <View style={styles.bottomView}>
              <Image source={item.profile} style={styles.profileImage} />
              <View>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.positionText}>{item.position}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Newest;

const styles = StyleSheet.create({
  card: {
    // padding: 10,
    width: 300,
    height: 250,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  cardContainer: {
    width: 250,
    height: 340,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
    backgroundColor: 'red',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: 'yellow',
  },
  heading: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  descriptionText: {
    color: 'white',
    fontSize: 15,
    marginTop: 20,
  },
  bottomView: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  nameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  positionText: {
    color: 'white',
    fontSize: 14,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  imageBackground: {
    width: 300,
    height: 250,
    borderRadius: 15,
  },
  content: {
    // backgroundColor: 'yellow',
    position: 'absolute',
    width: 300,
    height: 250,
    borderRadius: 15,
    padding: 20,
  },
});
