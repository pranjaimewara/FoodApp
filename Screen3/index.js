import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const Screen3 = ({navigation}) => {
  const DATA = [
    {
      id: '1',
      image: require('../../src/assets/images/London.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {
        width: 150,
        height: 250,
        borderWidth: 1,
        borderRadius: 15,
      },
      textStyle: {color: 'blue'},
      containerStyle: {
        backgroundColor: 'red',
        width: 150,
        height: 250,
        alignItems: 'center',
      },
    },
    {
      id: '2',
      image: require('../../src/assets/images/Indiagate.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {height: 150, width: 140, borderWidth: 1, borderRadius: 15},
      textStyle: {color: 'green'},
      containerStyle: {
        backgroundColor: '#e8e8e8',
        height: 150,
        width: 140,
        alignItems: 'center',
      },
    },
    {
      id: '3',
      image: require('../../src/assets/images/Jaipur.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      horizontal: true,
      imageStyle: {height: 150, width: 140, borderWidth: 1, borderRadius: 15},
      textStyle: {color: 'red', fontSize: 16},
      containerStyle: {
        backgroundColor: '#d8d8d8',
        height: 150,
        width: 140,
        alignItems: 'center',
      },
    },
    {
      id: '4',
      image: require('../../src/assets/images/mountain.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {height: 150, width: 140, borderWidth: 1, borderRadius: 15},
      textStyle: {color: 'purple'},
      containerStyle: {
        backgroundColor: '#c8c8c8',
        height: 150,
        width: 140,
        position: 'absolute',
        top: 170,
        left: 180,
        alignItems: 'center',
      },
    },
    {
      id: '5',
      image: require('../../src/assets/images/NewYork.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {width: 150, height: 250, borderWidth: 1, borderRadius: 15},
      textStyle: {color: 'orange', fontSize: 14},
      containerStyle: {
        backgroundColor: '#b8b8b8',
        width: 150,
        height: 250,
        alignItems: 'center',
        marginTop: 70,
      },
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack('Screen2');
          }}>
          <FontAwesome name="angle-left" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.main}>
          <LinearGradient
            colors={['#8914AB', '#3b5998', '#8914AB']}
            useAngle={true}
            angle={250}
            style={styles.container1}>
            <View style={styles.profilebox}>
              <View style={styles.profile}>
                <Image
                  source={require('../../src/assets/images/profile.jpeg')}
                  style={styles.profile}
                />
              </View>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profilePostion}>Marketing Manager</Text>
              <View style={styles.profileButtons}>
                <TouchableOpacity>
                  <View style={styles.followBtn}></View>
                  <Text style={styles.followText}>FOLLOW</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Linking.openURL('https://x.com/?lang=en')}>
                  <View style={styles.circleBtn}></View>
                  <FontAwesome
                    name="twitter"
                    size={16}
                    color="white"
                    style={styles.twitterIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.facebook.com/login/')
                  }>
                  <View style={styles.circleBtn}></View>
                  <FontAwesome
                    name="facebook"
                    size={16}
                    color="white"
                    style={styles.facebookIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.followingInfoBox}>
            <View style={styles.posts}>
              <Text style={styles.numberText}>555</Text>
              <Text style={styles.postsText}>Posts</Text>
            </View>
            <View style={styles.posts}>
              <Text style={styles.numberText2}>100M</Text>
              <Text style={styles.postsText}>Followers</Text>
            </View>
            <View style={styles.posts}>
              <Text style={styles.numberText2}>423</Text>
              <Text style={styles.postsText}>Following</Text>
            </View>
          </View>
          <View style={styles.container2}>
            <Text style={styles.heading2}>About me</Text>
            <Text style={styles.description}>
              Decisions: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. In placerat dignissim pellentesque.
              {'\n'}Interdum et malesuada fames ac ante ipsum primis in
              faucibus.
            </Text>
            <View style={styles.heading3}>
              <Text style={styles.AlbumText}>Album</Text>
              <TouchableOpacity>
                <Text style={styles.ViewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.container3}>
          {DATA.map(item => (
            <View
              key={item.id}
              style={[
                styles.card,
                item.containerStyle, // Apply the dynamic container style here
              ]}>
              <Image style={item.imageStyle} source={item.image} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  container1: {
    width: '90%',
    height: 270,
    borderRadius: 15,
    paddingTop: 45,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    marginTop: 40,
  },
  headerText: {
    color: 'black',
    fontSize: 17,
  },
  profilebox: {
    alignItems: 'center',
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  profilePostion: {
    color: '#D6D8DE',
    fontSize: 16,
  },
  profileButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  followBtn: {
    width: 110,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    opacity: 0.2,
    marginTop: 10,
  },
  followText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    position: 'absolute',
    marginLeft: 28,
    top: 20,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    opacity: 0.2,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  twitterIcon: {
    marginLeft: 13,
    position: 'absolute',
    top: 22,
  },
  facebookIcon: {
    marginLeft: 16,
    position: 'absolute',
    top: 23,
  },
  followingInfoBox: {
    padding: 10,
    width: 280,
    height: 65,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    borderColor: '#D6D8DE',
    position: 'absolute',
    top: 237,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  posts: {
    justifyContent: 'center',
  },
  numberText: {
    color: 'black',
    fontWeight: '900',
    fontSize: 17,
  },
  postsText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 13,
  },
  numberText2: {
    color: 'black',
    fontWeight: '900',
    fontSize: 17,
    marginLeft: 8,
  },
  container2: {
    height: '100%',
  },
  heading2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 60,
    marginLeft: 20,
  },
  description: {
    color: 'gray',
    fontSize: 14,
    marginLeft: 20,
    marginTop: 10,
    lineHeight: 25,
  },
  heading3: {
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  ViewAllText: {
    color: '#B719AE',
    fontWeight: 'bold',
    fontSize: 18,
  },
  AlbumText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  container3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 20,
  },
  card: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  cardText: {
    marginTop: 10,
    textAlign: 'center',
  },
});
