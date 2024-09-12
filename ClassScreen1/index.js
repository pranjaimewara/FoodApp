// import React, {Component} from 'react';
// import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
// import axios from 'axios';
// // import ClassProps from '../ClassProps';

// const API_URL =
//   'https://api.gruppie.in/api/v1/login/category/app?category=school&appName=GC2';

// class Practice extends Component {
//   constructor() {
//     super();
//     // console.log('Constructor: Initializing state and props');
//     this.state = {
//       name: 'Pranjai',
//       phone: '',
//       password: '',
//     };
//   }

//   // componentDidMount() {
//   //   console.log('ComponentDidMount: Component has been mounted');
//   //   // You can perform side effects like API calls or setting up subscriptions here.
//   // }

//   // componentDidUpdate(prevProps, prevState) {
//   //   console.log('ComponentDidUpdate: Component has been updated');
//   //   // This is where you can respond to prop or state changes
//   //   console.log('Previous State:', prevState);
//   //   console.log('Current State:', this.state);
//   // }

//   componentWillUnmount() {
//     console.log('ComponentWillUnmount: Component is about to be unmounted');
//     // Clean up any subscriptions or listeners here
//   }

//   handleLogin = async () => {
//     try {
//       response = await axios.post(API_URL, {
//         userName: {
//           countryCode: 'IN',
//           phone: '9911111111',
//         },
//         password: '123456',
//       });

//       if (response.status === 200) {
//         console.log('API response: ', response.data);
//         console.log('Phone: ', response.data.phone);
//         console.log('Country Code: ', response.data.countryAlpha2Code);
//         console.log('Password: ', this.state.password);
//         this.setState({phone: ''});
//         this.setState({password: ''});
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   render() {
//     return (
//       <View>
//         <Text style={{color: 'black', fontSize: 20}}>Class Component</Text>
//         <Text style={{color: 'black', fontSize: 20}}>{this.state.name}</Text>
//         <TextInput
//           style={styles.inputBox}
//           placeholder="enter your phone number"
//           placeholderTextColor={'black'}
//           keyboardType="number-pad"
//           value={this.state.phone}
//           onChangeText={value => {
//             this.setState({phone: value});
//           }}
//         />
//         <TextInput
//           style={styles.inputBox}
//           placeholder="enter your password"
//           placeholderTextColor={'black'}
//           secureTextEntry
//           value={this.state.password}
//           onChangeText={value => {
//             this.setState({password: value});
//           }}
//         />
//         <Button
//           title="Login"
//           onPress={() => {
//             this.handleLogin();
//           }}
//         />
//       </View>
//     );
//   }
// }

// export default Practice;

// const styles = StyleSheet.create({
//   inputBox: {
//     width: 320,
//     height: 50,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#CBCBCB',
//     paddingLeft: 20,
//     marginTop: 20,
//     marginBottom: 20,
//     color: 'black',
//   },
// });

// import React, {Component} from 'react';
// import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
// import axios from 'axios';

// const API_URL =
//   'https://api.gruppie.in/api/v1/login/category/app?category=school&appName=GC2';

// class Practice extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       phone: '',
//       password: '',
//       error: '',
//     };
//   }

//   handleLogin = async () => {
//     try {
//       const response = await axios.post(API_URL, {
//         userName: {
//           countryCode: 'IN',
//           phone: '9911111111',
//         },
//         password: '123456',
//       });

//       if (response.status === 200) {
//         console.log('API response:', response.data);
//         console.log('Password: ', this.state.password);
//         this.setState({phone: ''});
//         this.setState({password: ''});
//       } else {
//         this.setState({error: response.status});
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center'}}>
//         <Text
//           style={{
//             color: 'black',
//             fontWeight: 'bold',
//             fontSize: 20,
//             marginTop: 20,
//           }}>
//           Login to Proceed
//         </Text>
//         <TextInput
//           placeholder="enter your phone number"
//           placeholderTextColor={'gray'}
//           keyboardType="number-pad"
//           style={styles.inputBox}
//           value={this.state.phone}
//           onChangeText={value => {
//             this.setState({phone: value});
//           }}
//         />
//         <TextInput
//           placeholder="enter your phone number"
//           placeholderTextColor={'gray'}
//           secureTextEntry
//           style={styles.inputBox}
//           value={this.state.password}
//           onChangeText={value => {
//             this.setState({password: value});
//           }}
//         />
//         <Button
//           title="Login"
//           onPress={() => {
//             this.handleLogin();
//           }}
//         />
//         {this.state.error && (
//           <Text style={styles.error}>{this.state.error}</Text>
//         )}
//       </View>
//     );
//   }
// }

// export default Practice;

// const styles = StyleSheet.create({
//   inputBox: {
//     width: 320,
//     height: 50,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#CBCBCB',
//     paddingLeft: 20,
//     marginTop: 20,
//     marginBottom: 20,
//     color: 'black',
//   },
// });

import React, {Component} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';

class CardList extends Component {
  constructor(props) {
    super(props);

    // Initialize state with selectedCardId
    this.state = {
      selectedCardId: null, // Track which card is selected
    };

    // Set default data if props.data is not provided
    this.data = this.props.data || [
      {id: 1, title: 'Card 1'},
      {id: 2, title: 'Card 2'},
      {id: 3, title: 'Card 3'},
    ];
  }

  handleCardPress = id => {
    // Update state with the selected card ID
    this.setState({selectedCardId: id});
  };

  renderCard = ({item}) => {
    const isSelected = this.state.selectedCardId === item.id;
    // isSelected this will give us a boolean result, whether the condition is true or not.

    return (
      <View style={[styles.card, isSelected && styles.selectedCard]}>
        <Text style={styles.cardText}>{item.title}</Text>
        <Button
          title="Open View"
          onPress={() => this.handleCardPress(item.id)}
        />
        {isSelected && (
          <View style={styles.selectedView}>
            <Text style={styles.selectedText}>Details for {item.title}</Text>
            {/* Add more views or actions specific to this card */}
          </View>
        )}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.data}
          renderItem={this.renderCard}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

// Default props in case data isn't passed from the parent

export default CardList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    elevation: 2,
  },
  selectedCard: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectedView: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  selectedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
