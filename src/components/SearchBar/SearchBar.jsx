import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import axiosInstance from '../../api/axios';
import {styleConstants} from '../../constants/constant';

export const SearchBar = ({navigation}) => {
  const [name, setName] = useState('');

  const handleSearchButton = async () => {
    if (name == '') {
      Alert.alert('Name cannot be left blank');
      return;
    }

    const res = await axiosInstance.get(`doctor/find?name=${name}`);
    console.log(res.data);
    navigation.navigate(
      'Search',
      JSON.stringify({
        doctors: res.data,
      }),
    );
  };

  useEffect(() => {
    setName('');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors with name"
          onChangeText={setName}
          value={name}
        />
        <Pressable
          style={styles.searchButton}
          onPress={handleSearchButton}>
          <Text style={styles.searchText}>Search</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
  },
  searchInput: {
    backgroundColor: '#fff',
    width: '75%',
  },
  searchButton: {
    backgroundColor: styleConstants.BLUE,
    width: '24.5%',
    margin: 3,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchText: {
    color: '#fff',
    margin: 0,
    padding: 0,
  },
});
