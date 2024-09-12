import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ImageBackground,
  Image,
  Button,
  ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {
  GoogleSignin,
  statusCodes,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

const Screen4 = ({navigation}) => {
  const signOut = async () => {
    try {
      const userInfo = await GoogleSignin.signOut();
      navigation.navigate('SignIn');
      ToastAndroid.show('Sign out successful', ToastAndroid.LONG);
    } catch (error) {
      console.error(error);
    }
  };
  const [selectedIndex, setSelectedIndex] = useState(0);

  const DATA = [
    {
      id: '1',
      image: require('../../src/assets/images/London.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Arrows',
    },
    {
      id: '2',
      image: require('../../src/assets/images/Indiagate.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Replies',
    },
    {
      id: '3',
      image: require('../../src/assets/images/Jaipur.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Likes',
    },
    {
      id: '4',
      image: require('../../src/assets/images/mountain.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Subscriber',
    },
    {
      id: '5',
      image: require('../../src/assets/images/NewYork.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Reels',
    },
    {
      id: '6',
      image: require('../../src/assets/images/villa1.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Arrows',
    },
    {
      id: '7',
      image: require('../../src/assets/images/Jaipur.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Replies',
    },
    {
      id: '8',
      image: require('../../src/assets/images/Indiagate.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Likes',
    },
    {
      id: '9',
      image: require('../../src/assets/images/NewYork.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Subscriber',
    },
    {
      id: '10',
      image: require('../../src/assets/images/mountain.jpeg'),
      heading: 'Neque porro quisquam',
      description: 'Lorem ipsum dolor sit amet, est qui dolorem',
      name: 'John',
      position: 'Marketing Manager',
      profile: require('../../src/assets/images/profile.jpeg'),
      status: 'Reels',
    },
  ];

  const renderContent = () => {
    const filteredData = filterData();
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };
  const filterData = () => {
    const statusArray = ['Arrows', 'Replies', 'Likes', 'Subscriber', 'Reels'];
    const selectedStatus = statusArray[selectedIndex];
    return DATA.filter(item => item.status === selectedStatus);
  };

  const handleIndexChange = index => {
    setSelectedIndex(index);
  };

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
    <SafeAreaView style={{flex: 1, backgroundColor: '#E8E8E8'}}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <View style={styles.Icons}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View style={{flexDirection: 'row', gap: 20}}>
            <FontAwesome name="navicon" size={20} color="black" />
            <Text style={styles.headerText}>Soft UI</Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 10}}>
          <FontAwesome
            name="bell"
            size={20}
            color="gray"
            style={styles.searchIcon}
          />
          <FontAwesome name="shopping-basket" size={20} color="gray" />
        </View>
      </View>
      <Button title="Sign Out" onPress={signOut} />

      <View style={styles.main}>
        <View style={styles.icn}>
          <ScrollView horizontal={true}>
            <SegmentedControlTab
              values={['Arrows', 'Replies', 'Likes', 'Subscriber', 'Reels']}
              selectedIndex={selectedIndex}
              onTabPress={handleIndexChange}
              tabsContainerStyle={styles.tabContainer}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              firstTabStyle={styles.firstTabStyle}
              lastTabStyle={styles.lastTabStyle}
              tabTextStyle={styles.tabTextStyle}
              activeTabTextStyle={styles.activeTabTextStyle}
            />
          </ScrollView>
        </View>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
};

export default Screen4;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
  },
  Icons: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  headerText: {
    color: 'black',
  },
  icn: {
    backgroundColor: 'white',
    height: 100,
    width: '100%',
    alignItems: 'center',
  },
  tabContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tabStyle: {
    borderColor: 'white',
    backgroundColor: 'gray',
    borderRadius: 40,
    height: 40,
    width: 80,
    marginRight: 10,
  },
  activeTabStyle: {
    backgroundColor: '#6c5ce7',
    borderRadius: 40,
    height: 40,
    width: 80,
  },
  tabTextStyle: {
    color: 'white',
  },
  activeTabTextStyle: {
    color: 'white',
  },
  tabContent: {
    padding: 20,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
  },
  firstTabStyle: {
    borderTopLeftRadius: 40, // Custom styling for the first tab
    borderBottomLeftRadius: 40,
  },
  lastTabStyle: {
    borderTopRightRadius: 40, // Custom styling for the last tab
    borderBottomRightRadius: 40,
  },

  // Flatlist Styling
  card: {
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
  },
  content: {
    position: 'absolute',
    width: 300,
    height: 250,
    borderRadius: 15,
    padding: 20,
  },
});
