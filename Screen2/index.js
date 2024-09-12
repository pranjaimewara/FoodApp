import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Screen2 = ({navigation}) => {
  const DATA = [
    {
      id: '1',
      image: require('../../src/assets/images/London.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 15,
      },
      textStyle: {color: 'black', marginTop: 5},
      containerStyle: {
        backgroundColor: 'red',
        width: 150,
        height: 100,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
      },
    },
    {
      id: '2',
      image: require('../../src/assets/images/Indiagate.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 15,
      },
      textStyle: {color: 'black', marginTop: 5},
      containerStyle: {
        backgroundColor: 'red',
        width: 150,
        height: 100,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
      },
    },
    {
      id: '3',
      image: require('../../src/assets/images/Jaipur.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      horizontal: true,
      imageStyle: {
        height: 130,
        width: 130,
        borderWidth: 1,
        borderRadius: 15,
        marginRight: 170,
      },
      textStyle: {
        color: 'black',
        fontSize: 16,
        position: 'absolute',
        bottom: 120,
        left: 40,
        width: 130,
      },
      containerStyle: {
        backgroundColor: '#d8d8d8',
        height: 150,
        width: 120,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
        bottom: 50,
        left: 40,
      },
      angleicon: {
        marginBottom: 100,
      },
    },
    {
      id: '4',
      image: require('../../src/assets/images/mountain.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 15,
      },
      textStyle: {color: 'black', marginTop: 5},
      containerStyle: {
        backgroundColor: 'red',
        width: 150,
        height: 100,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
      },
    },
    {
      id: '5',
      image: require('../../src/assets/images/NewYork.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 15,
      },
      textStyle: {color: 'black', marginTop: 5},
      containerStyle: {
        backgroundColor: 'red',
        width: 150,
        height: 100,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
      },
    },
    {
      id: '6',
      image: require('../../src/assets/images/London.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 15,
      },
      textStyle: {color: 'black', marginTop: 5},
      containerStyle: {
        backgroundColor: 'red',
        width: 150,
        height: 100,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
      },
    },
    {
      id: '7',
      image: require('../../src/assets/images/Indiagate.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 15,
      },
      textStyle: {color: 'black', marginTop: 5},
      containerStyle: {
        backgroundColor: 'red',
        width: 150,
        height: 100,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
      },
    },
    {
      id: '8',
      image: require('../../src/assets/images/Jaipur.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      horizontal: true,
      imageStyle: {
        height: 130,
        width: 130,
        borderWidth: 1,
        borderRadius: 15,
        marginRight: 170,
      },
      textStyle: {
        color: 'black',
        fontSize: 16,
        position: 'absolute',
        bottom: 120,
        left: 40,
        width: 130,
      },
      containerStyle: {
        backgroundColor: '#d8d8d8',
        height: 150,
        width: 120,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
        bottom: 50,
        left: 40,
      },
      angleicon: {
        marginBottom: 100,
      },
    },
    {
      id: '9',
      image: require('../../src/assets/images/mountain.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 15,
      },
      textStyle: {color: 'black', marginTop: 5},
      containerStyle: {
        backgroundColor: 'red',
        width: 150,
        height: 100,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
      },
    },
    {
      id: '10',
      image: require('../../src/assets/images/NewYork.jpeg'),
      description: 'Lorem ipsum dolor sit amet,',
      imageStyle: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderRadius: 15,
      },
      textStyle: {color: 'black', marginTop: 5},
      containerStyle: {
        backgroundColor: 'red',
        width: 150,
        height: 100,
        alignItems: 'center',
      },
      articleText: {
        color: 'red',
      },
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#EEEEEE'}}>
      <View style={styles.Icons}>
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <View>
            <FontAwesome name="navicon" size={20} color="black" />
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', gap: 10}}>
          <FontAwesome name="bell" size={20} color="gray" />
          <FontAwesome name="shopping-basket" size={20} color="gray" />
        </View>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container1}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={20} color="gray" />
          </View>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'gray'}
            style={styles.textInputBox}
          />
          <View style={styles.socialIcons}>
            <View style={styles.FollowIcons}>
              <Image
                source={require('../../src/assets/images/followers.png')}
                style={styles.Imageicons}
              />
            </View>
            <Text style={styles.FollowingText}>Following</Text>
            <Text style={styles.lineText}>|</Text>
            <View style={styles.FollowIcons}>
              <Image
                source={require('../../src/assets/images/trend.png')}
                style={styles.Imageicons}
              />
            </View>
            <Text style={styles.TrendingText}>Trending</Text>
          </View>
        </View>
        <View style={styles.container2}>
          {DATA.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.card,
                item.horizontal ? styles.cardFull : styles.cardHalf,
              ]}>
              <Image style={[item.imageStyle]} source={item.image} />
              <View style={{marginTop: 10}}>
                <Text style={[item.textStyle]}>{item.description}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Text style={item.articleText}>Read Article </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'white',
    height: 130,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20,
  },
  Icons: {
    paddingTop: 35,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    height: 75,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInputBox: {
    width: 320,
    height: 50,
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 10,
    paddingLeft: 40,
    color: 'black',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  FollowIcons: {
    width: 35,
    height: 35,
    borderColor: '#D7D7D7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Imageicons: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  FollowingText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
  lineText: {
    color: '#DFDFDF',
    fontSize: 20,
  },
  TrendingText: {
    color: '#9A9A9A',
    fontSize: 20,
  },
  container2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  description: {
    color: 'black',
    fontSize: 13,
    marginRight: 10,
    marginTop: 5,
  },
  ArticleText: {
    color: '#8E009A',
    fontWeight: 'bold',
    marginTop: 10,
    right: 30,
  },
  searchBar: {
    position: 'absolute',
    marginTop: 35,
    left: 35,
  },
  image: {
    width: 100,
    height: 130,
    borderWidth: 1,
    borderRadius: 15,
  },
  card: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  cardHalf: {
    width: '48%',
  },
  cardFull: {
    width: '100%',
    height: 150,
  },
});
