import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Agreement = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#D8D8D8'}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack('Screen1');
          }}>
          <FontAwesome name="angle-left" size={25} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Terms and Conditions</Text>
      </View>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        translucent={true}
      />
      <View
        style={{
          width: 300,
          marginVertical: 30,
          height: 600,
          backgroundColor: 'red',
          padding: 20,
          borderRadius: 15,
          backgroundColor: 'white',
          alignSelf: 'center',
        }}>
        <ScrollView>
          <Text style={{color: 'black'}}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            The Extremes of Good and Evil) by Cicero, written in 45 BC.
          </Text>
          <Text style={{color: 'black', marginTop: 30}}>
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem
            Ipsum. Where does it come from? Contrary to popular belief, Lorem
            Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years
            old. Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
            Finibus Bonorum et Malorum".
          </Text>
          <Text style={{color: 'black'}}>
            This book is a treatise on the theory of ethics, very popular during
            the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
            sit amet..", comes from a line in section 1.10.32. The standard
            chunk of Lorem Ipsum used since the 1500s is reproduced below for
            those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
            Bonorum et Malorum" by Cicero are also reproduced in their exact
            original form, accompanied by English versions from the 1914
            translation by H. Rackham. Why do we use it? It is a long
            established fact that a reader will be distracted by the readable
            content of a page when looking at its layout.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Agreement;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 30,
    backgroundColor: 'white',
  },
  headerText: {
    color: 'black',
    fontSize: 17,
  },
});
