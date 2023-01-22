import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Text,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {styleConstants} from '../constants/constant';

export const FillSignUpDetails = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [institution, setInstitution] = useState('');

  const handleRegisterButton = () => {
    if (
      fullName == '' ||
      gender == '' ||
      specialization == '' ||
      institution == ''
    ) {
      Alert.alert(
        'Incomplete Details',
        'Please fill all the details specified to register.',
        [
          {
            text: 'OK',
          },
        ],
        {
          cancelable: 'true',
        },
      );
      return;
    }

    console.log(fullName, gender, specialization, institution);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Background.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Image source={require('../assets/images/Logo.png')} />
        <View style={styles.inputDiv}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={text => setFullName(text)}
            style={styles.input}
            autoCorrect={false}
            autoCapitalize={'words'}
            autoComplete={'off'}
          />
        </View>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>GENDER</Text>
          <SelectDropdown
            data={['Male', 'Female']}
            // defaultValue="Male"r
            buttonTextStyle={{
              textAlign: 'left',
              color: styleConstants.BLUE,
              fontSize: 14,
            }}
            rowTextStyle={{
              textAlign: 'left',
              color: styleConstants.BLUE,
            }}
            buttonStyle={{
              width: '100%',
              backgroundColor: '#FFF',
              borderRadius: 10,
              textAlign: 'left',
            }}
            onSelect={(selectedItem, index) => {
              setGender(selectedItem);
            }}
          />
        </View>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>SPECIALIZATION</Text>
          <SelectDropdown
            data={[
              'Paediatrics',
              'Surgery',
              'Dermatology',
              'Medicine',
              'ENT',
              'Psychiatry',
              'Ophthalmology',
              'Pathology',
              'Orthopaedics',
              'Radiology',
              'Anaesthesiology',
              'Endocrinology',
              'Dietitics',
              'Cardiology',
              'General',
            ]}
            // defaultValue=""
            buttonTextStyle={{
              textAlign: 'left',
              color: styleConstants.BLUE,
              fontSize: 14,
            }}
            rowTextStyle={{
              textAlign: 'left',
              color: styleConstants.BLUE,
            }}
            buttonStyle={{
              width: '100%',
              backgroundColor: '#FFF',
              borderRadius: 10,
              textAlign: 'left',
            }}
            onSelect={(selectedItem, index) => {
              setSpecialization(selectedItem);
            }}
          />
        </View>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>INSTITUTION</Text>
          <SelectDropdown
            data={['ZH', 'CH', 'PHC', 'CHC']}
            buttonTextStyle={{
              textAlign: 'left',
              color: styleConstants.BLUE,
              fontSize: 14,
            }}
            rowTextStyle={{
              textAlign: 'left',
              color: styleConstants.BLUE,
            }}
            buttonStyle={{
              width: '100%',
              backgroundColor: '#FFF',
              borderRadius: 10,
              textAlign: 'left',
            }}
            onSelect={(selectedItem, index) => {
              setInstitution(selectedItem);
            }}
          />
        </View>
        <View style={styles.inputDiv}>
          <Pressable
            style={styles.registerButton}
            onPress={handleRegisterButton}>
            <Text style={{color: '#fff'}}>Register</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  inputDiv: {
    width: '75%',
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    // width: '75%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: styleConstants.BLUE,
  },
  registerButton: {
    backgroundColor: styleConstants.BLUE,
    opacity: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
});
