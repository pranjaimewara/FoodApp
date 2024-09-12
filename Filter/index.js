import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
const Filter = () => {
  // Sample data
  const data = [
    {id: '1', category: 'Fruits', name: 'Apple'},
    {id: '2', category: 'Fruits', name: 'Banana'},
    {id: '3', category: 'Vegetables', name: 'Carrot'},
    {id: '4', category: 'Vegetables', name: 'Tomato'},
    {id: '5', category: 'Dairy', name: 'Milk'},
  ];
  const [selectedTab, setSelectedTab] = useState('Fruits');
  // Function to filter data based on selected tab
  const filteredData = data.filter(item => item.category === selectedTab);
  const renderTab = tab => (
    <TouchableOpacity
      key={tab}
      onPress={() => setSelectedTab(tab)}
      style={{
        padding: 10,
        backgroundColor: selectedTab === tab ? 'lightblue' : 'lightgrey',
      }}>
      <Text>{tab}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={{flex: 1, padding: 20}}>
      {/* Render Tabs */}
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        {['Fruits', 'Vegetables', 'Dairy'].map(tab => renderTab(tab))}
      </View>
      {/* Render Filtered Data */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={{padding: 10, borderBottomWidth: 1, borderColor: '#ccc'}}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};
export default Filter;
