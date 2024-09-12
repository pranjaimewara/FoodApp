import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Notification = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <View style={styles.main}>
        <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack('LoginClass');
            }}>
            <AntDesign name="arrowleft" size={23} color="white" />
          </TouchableOpacity>
          <Text style={styles.headingText}>Push Notifications</Text>
        </View>
        <ScrollView
          style={{backgroundColor: 'black'}}
          contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
          <View style={styles.boxContainer}>
            <View style={styles.box}>
              <Text style={styles.boxHeading}>
                Posts from people you follow
              </Text>
              <View style={styles.arrowBox}>
                <Text style={styles.boxText}>Posts</Text>
                <TouchableOpacity>
                  <FontAwesome name="angle-right" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={styles.postCountText}>0 People</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxHeading}>
                Related to you and your posts
              </Text>
              <View style={styles.arrowBox}>
                <Text style={styles.boxText}>Mentions and replies</Text>
                <TouchableOpacity>
                  <FontAwesome name="angle-right" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={styles.postCountText}>Tailored for you</Text>
              <View style={styles.arrowBox}>
                <Text style={styles.boxText}>Repost</Text>
                <TouchableOpacity>
                  <FontAwesome name="angle-right" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={styles.postCountText}>Tailored for you</Text>
              <View style={styles.arrowBox}>
                <Text style={styles.boxText}>Likes</Text>
                <TouchableOpacity>
                  <FontAwesome name="angle-right" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={styles.postCountText}>Tailored for you</Text>
              <View style={styles.topicsBox}>
                <Text style={styles.boxText}>Photo tags</Text>
                <TouchableOpacity>
                  <FontAwesome name="check-circle" size={19} color="#5516E4" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxHeading}>Followers and contacts</Text>
              <View style={styles.topicsBox}>
                <Text style={styles.boxText}>New followers</Text>
                <TouchableOpacity>
                  <FontAwesome name="check-circle" size={19} color="#5516E4" />
                </TouchableOpacity>
              </View>
              <View style={styles.topicsBox}>
                <Text style={styles.boxText}>Contact join Arrows</Text>
                <TouchableOpacity>
                  <FontAwesome name="check-circle" size={19} color="#5516E4" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxHeading}>Direct Messages</Text>
              <View style={styles.topicsBox}>
                <Text style={styles.boxText}>Direct Messages</Text>
                <TouchableOpacity>
                  <FontAwesome name="check-circle" size={19} color="#5516E4" />
                </TouchableOpacity>
              </View>
              <View style={styles.arrowBox}>
                <Text style={styles.boxText}>Message reactions</Text>
                <TouchableOpacity>
                  <FontAwesome name="angle-right" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxHeading}>Recommendations from Arrows</Text>

              <View style={styles.topicsBox}>
                <Text style={styles.boxText}>Topics</Text>
                <TouchableOpacity>
                  <FontAwesome name="check-circle" size={19} color="#5516E4" />
                </TouchableOpacity>
              </View>
              <View style={styles.topicsBox}>
                <Text style={styles.boxText}>Recommendations</Text>
                <TouchableOpacity>
                  <FontAwesome name="check-circle" size={19} color="#5516E4" />
                </TouchableOpacity>
              </View>
              <View style={styles.topicsBox}>
                <Text style={styles.boxText}>Stories</Text>
                <TouchableOpacity>
                  <FontAwesome name="check-circle" size={19} color="#5516E4" />
                </TouchableOpacity>
              </View>
              <View style={styles.topicsBox}>
                <Text style={styles.boxText}>Live broadcasts</Text>
                <TouchableOpacity>
                  <FontAwesome name="check-circle" size={19} color="#5516E4" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxHeading}>News from Arrows</Text>
              <View style={styles.topicsBox}>
                <Text style={styles.newsText}>News</Text>
                <TouchableOpacity>
                  <FontAwesome name="circle-o" size={20} color="#393939" />
                </TouchableOpacity>
              </View>
              <View style={styles.topicsBox}>
                <Text style={styles.featureText}>
                  First look at new features
                </Text>
                <TouchableOpacity>
                  <FontAwesome name="circle-o" size={20} color="#393939" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxHeading}>Arrows for Professionals</Text>
              <View style={styles.topicsBox}>
                <Text style={styles.newsText}>Ads campaigns</Text>
                <TouchableOpacity>
                  <FontAwesome name="circle-o" size={20} color="#393939" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  headContainer: {
    height: '13%',
    width: '100%',
    flexDirection: 'row',
    paddingTop: 50,
    paddingLeft: 25,
    gap: 15,
    alignItems: 'center',
  },
  headingText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  boxContainer: {
    alignItems: 'center',
  },
  box: {
    paddingVertical: 10,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#131313',
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 20,
    paddingLeft: 13,
    paddingRight: 16,
  },
  boxHeading: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  boxText: {
    color: 'white',
    fontSize: 14.5,
  },
  topicsBox: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowBox: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 4,
  },
  newsText: {
    color: 'gray',
    fontSize: 15,
  },
  featureText: {
    color: 'gray',
    fontSize: 15,
  },
});
