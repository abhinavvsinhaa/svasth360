import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import {styleConstants} from '../constants/constant';
import SelectDropdown from 'react-native-select-dropdown';
import axiosInstance from '../api/axios';

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [designation, setDesignation] = useState('CMO');
  const [specialization, setSpecialization] = useState(null);
  const [college, setCollege] = useState(null);
  const [yearOfCollegeCompletion, setYearOfCollegeCompletion] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState(null);
  const [medicalRegistrationNumber, setMedicalRegistrationNumber] =
    useState(null);
  const [registrationCouncil, setRegistrationCouncil] = useState(null);
  const [registrationYear, setRegistrationYear] = useState(null);

  const updateUser = async () => {
    try {
    console.log(userData.id);
      const res = await axiosInstance.patch(`doctor/${userData.id}`, {
        designation,
        specialization,
        college,
        yearOfCollegeCompletion,
        yearsOfExperience,
        medicalRegistrationNumber,
        registrationCouncil,
        registrationYear,
      });
      if (res.data) Alert.alert('User updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getUser() {
      const data = await AsyncStorage.getItem('@Me');
      console.log('profile', data);
      setUserData(JSON.parse(data));
      setDesignation(JSON.parse(data.designation));
      setUserId(JSON.parse(data.id));
      setSpecialization(JSON.parse(data.specialization));
      setYearOfCollegeCompletion(JSON.parse(data.yearOfCollegeCompletion));
      setYearsOfExperience(JSON.parse(data.yearsOfExperience));
      setMedicalRegistrationNumber(JSON.parse(data.medicalRegistrationNumber));
      setRegistrationCouncil(JSON.parse(data.registrationCouncil));
      setRegistrationYear(JSON.parse(data.registrationYear));
      setSpecialization(JSON.parse(data.specialization));
      setCollege(JSON.parse(data.college));
    }
    getUser();
  }, []);

  return (
    <>
      {userData && (
        <SafeAreaView style={styles.container}>
          <ImageBackground
            source={require('../assets/images/Background.png')}
            resizeMode="cover"
            style={styles.backgroundImage}>
            <Text style={styles.heading}>Profile</Text>
            <Text style={{marginTop: 10, color: styleConstants.BLUE}}>
              Personal Details
            </Text>
            <Image
              source={require('../assets/images/DoctorSamplePhoto.png')}
              style={{
                borderRadius: 200,
                marginTop: 10,
                width: 120,
                height: 120,
              }}
            />
            <Text style={styles.details}>{userData.name}</Text>
            <ScrollView style={{width: '100%', marginVertical: 10}}>
              <SelectDropdown
                data={['CMO', 'MS', 'SMO', 'BMO', 'MO']}
                defaultValue={userData.designation}
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
                  marginTop: 10,
                }}
                onSelect={(selectedItem, index) => {
                  setDesignation(selectedItem);
                }}
              />
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
                defaultValue={userData.specialization}
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
                  marginTop: 10,
                }}
                onSelect={(selectedItem, index) => {
                  setSpecialization(selectedItem);
                }}
              />
              {/* <Text style={styles.details}>+91 98399 26626</Text> */}

              <Text style={{marginTop: 10, color: styleConstants.BLUE}}>
                Base level qualification
              </Text>
              <TextInput
                placeholder="Enter college/institute"
                style={styles.input}
                value={college}
                onChangeText={setCollege}
              />
              <TextInput
                placeholder="Year of completion"
                style={styles.input}
                value={yearOfCollegeCompletion}
                onChangeText={setYearOfCollegeCompletion}
              />
              <TextInput
                placeholder="Years of experience"
                style={styles.input}
                value={yearsOfExperience}
                onChangeText={setYearsOfExperience}
              />
              <Text style={{marginTop: 10, color: styleConstants.BLUE}}>
                Medical registration
              </Text>
              <TextInput
                placeholder="Type registration number"
                style={styles.input}
                value={medicalRegistrationNumber}
                onChangeText={setMedicalRegistrationNumber}
              />
              <TextInput
                placeholder="Type registration council"
                style={styles.input}
                value={registrationCouncil}
                onChangeText={setRegistrationCouncil}
              />
              <TextInput
                placeholder="Type registration year"
                style={styles.input}
                value={registrationYear}
                onChangeText={setRegistrationYear}
              />
            </ScrollView>
            <Pressable style={styles.nextButton} onPress={updateUser}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </ImageBackground>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  heading: {
    color: styleConstants.BLUE,
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  details: {
    marginTop: 10,
  },
  nextButton: {
    backgroundColor: styleConstants.BLUE,
    fontSize: 20,
    color: styleConstants.SAND,
    borderRadius: 100,
    width: '50%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: styleConstants.SAND,
    textAlign: 'center',
  },
});
