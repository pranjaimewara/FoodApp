// import {Component} from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   TextInput,
//   PermissionsAndroid,
// } from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import styleConstant from '../../constants/styles';
// import MapView, {Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';
// import React from 'react';

// class Location extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       mLat: 0,
//       mLong: 0,
//     };
//   }

//   componentDidMount() {
//     this.requestLocationPermission();
//   }

//   requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Cool Photo App Location Permission',
//           message:
//             'Cool Photo App needs access to your location ' +
//             'so you can take awesome pictures.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('You can use the location');
//       } else {
//         console.log('Location permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         console.log(position);
//         setMLat(position.coords.latitude);
//         setMLong(position.coords.longitude);
//       },
//       error => {
//         // See error code charts below.
//         console.log(error.code, error.message);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   render() {
//     return (
//       <SafeAreaView
//         style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
//         <StatusBar
//           barStyle={'dark-content'}
//           backgroundColor={'transparent'}
//           translucent={true}
//         />
//         <View style={styles.headContainer}>
//           <TouchableOpacity
//             onPress={() => {
//               this.props.navigation.goBack('ClassProfile');
//             }}>
//             <AntDesign name="arrowleft" size={23} color="black" />
//           </TouchableOpacity>
//           <Text style={styles.headingText}>Set Your Location</Text>
//         </View>
//         <View style={{flex: 1}}>
//         <MapView
//             followsUserLocation={true}
//             testID="mapViewShowForm"
//             initialRegion={{
//               latitude: 26.9124,
//               longitude: 75.739639,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//             style={{...StyleSheet.absoluteFillObject, flex: 1}}
//             // region={this.state.region}
//             provider={PROVIDER_GOOGLE}
//             // onMapReady={() => this.onMapReady}
//             minZoomLevel={2}
//             maxZoomLevel={14}
//             zoomEnabled={true}
//             rotateEnabled={true}
//             pitchEnabled={true}
//             userLocationPriority="high"
//             moveOnMarkerPress={true}
//             showsScale={true}
//             showsCompass={true}
//             showsPointsOfInterest={true}
//             showsBuildings={true}>
//             <Marker
//               testID="googleMapMarker"
//               coordinate={{
//                 latitude: 26.9124,
//                 longitude: 75.739639,
//               }}
//             />
//           </MapView>
//           <TouchableOpacity
//             style={{
//               width: '90%',
//               height: 50,
//               alignSelf: 'center',
//               position: 'absolute',
//               backgroundColor: 'green',
//               bottom: 20, // Adjusted positioning
//             }}
//             onPress={this.getLocation}>
//             <Text>Get Current Location</Text>
//           </TouchableOpacity>
//         </View>
//         {/* <View style={styles.locationBox}>
//           <Text style={styles.locationHeading}>Location</Text>
//           <View style={styles.searchBox}>
//             <TextInput style={styles.inputBox} />
//           </View>
//           <View style={styleConstant.GetStartedBtn}>
//             <Text style={styles.btnText}>Continue</Text>
//           </View>
//         </View> */}
//       </SafeAreaView>
//     );
//   }
// }

// export default Location;

// const styles = StyleSheet.create({
//   headContainer: {
//     height: 80,
//     width: '100%',
//     flexDirection: 'row',
//     paddingTop: 50,
//     paddingLeft: 25,
//     gap: 15,
//     alignItems: 'center',
//   },
//   headingText: {
//     color: 'black',
//     fontWeight: 'bold',
//     fontSize: 20,
//   },
//   locationBox: {
//     width: '100%',
//     borderColor: 'black',
//     borderWidth: 1,
//     borderTopLeftRadius: 40,
//     borderTopRightRadius: 40,
//     position: 'absolute',
//     bottom: 0,
//     alignItems: 'center',
//     padding: 10,
//     paddingBottom: 30,
//   },
//   locationHeading: {
//     color: 'black',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   searchBox: {
//     marginTop: 20,
//     borderTopColor: '#D0D2D8',
//     borderBottomColor: '#D0D2D8',
//     borderTopWidth: 1.3,
//     borderBottomWidth: 1.3,
//     height: '45%',
//     width: '90%',
//     marginBottom: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 15,
//   },
//   inputBox: {
//     width: '100%',
//     height: 50,
//     borderRadius: 20,
//     paddingLeft: 20,
//     color: 'black',
//     backgroundColor: '#F7F7F7',
//   },
//   btnText: {
//     color: 'white',
//     fontSize: 15,
//     fontWeight: 'bold',
//   },
// });

Location
import {Component} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styleConstant from '../../constants/styles';
import MapView, {Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import React from 'react';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mLat: 0,
      mLong: 0,
    };
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setMLat(position.coords.latitude);
        setMLong(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        {/* <View style={styles.headContainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack('ClassProfile');
            }}>
            <AntDesign name="arrowleft" size={23} color="black" />
          </TouchableOpacity>
          <Text style={styles.headingText}>Set Your Location</Text>
        </View> */}
        <View style={{flex: 1, width:"100%"}}>
          {/* <MapView
            style={{width: '100%', height: '100%'}}
            initialRegion={{
              latitude: 28.693602091083623,
              longitude: 77.21464383448563,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onRegionChange={x => {
              console.log(x);
            }}>
            <Marker
              coordinate={{
                latitude: this.state.mLat,
                longitude: this.state.mLong,
              }}
            />
          </MapView> */}
          <MapView
            followsUserLocation={true}
            testID="mapViewShowForm"
            initialRegion={{
              latitude: 26.9124,
              longitude: 75.739639,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{...StyleSheet.absoluteFillObject, flex: 1}}
            // region={this.state.region}
            provider={PROVIDER_GOOGLE}
            // onMapReady={() => this.onMapReady}
            minZoomLevel={2}
            maxZoomLevel={14}
            zoomEnabled={true}
            rotateEnabled={true}
            pitchEnabled={true}
            userLocationPriority="high"
            moveOnMarkerPress={true}
            showsScale={true}
            showsCompass={true}
            showsPointsOfInterest={true}
            showsBuildings={true}>
            <Marker
              testID="googleMapMarker"
              coordinate={{
                latitude: 26.9124,
                longitude: 75.739639,
              }}
            />
          </MapView>

          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              alignSelf: 'center',
              position: 'absolute',
              backgroundColor: 'green',
              bottom: 20, // Adjusted positioning
            }}
            onPress={this.getLocation}>
            <Text>Get Current Location</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.locationBox}>
          <Text style={styles.locationHeading}>Location</Text>
          <View style={styles.searchBox}>
            <TextInput style={styles.inputBox} />
          </View>
          <View style={styleConstant.GetStartedBtn}>
            <Text style={styles.btnText}>Continue</Text>
          </View>
        </View> */}
      </SafeAreaView>
    );
  }
}

export default Location;

const styles = StyleSheet.create({
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
  locationBox: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    padding: 10,
    paddingBottom: 30,
  },
  locationHeading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBox: {
    marginTop: 20,
    borderTopColor: '#D0D2D8',
    borderBottomColor: '#D0D2D8',
    borderTopWidth: 1.3,
    borderBottomWidth: 1.3,
    height: '45%',
    width: '90%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  inputBox: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    paddingLeft: 20,
    color: 'black',
    backgroundColor: '#F7F7F7',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

