import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  Text,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import axiosInstance from '../api/axios';
import {styleConstants} from '../constants/constant';
import { useAuth } from '../context/Auth';

export const FillSignUpDetails = ({navigation, route}) => {
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [district, setDistrict] = useState('');
  const [block, setBlock] = useState(null);
  const [blockData, setBlockData] = useState([]);
  const [healthcareFacility, setHealthcareFacility] = useState('');
  const { mobileNumber, user } = route.params;
  const { signIn } = useAuth();

  const findBlockOfDistrict = district => {
    const distt = String(district).toLowerCase();
    setBlock('')
    switch (distt) {
      case 'bilaspur':
        setBlockData([
          'Bilaspur Sadar',
          'Ghumarwin',
          'Jhandutta',
          'Shree Naina Devi',
        ]);
        break;
      case 'chamba':
        setBlockData([
          'Bharmour',
          'Bhattiyat',
          'Chamba',
          'Mehla',
          'Pangi',
          'Saluni',
          'Tisa',
        ]);
        break;
      case 'hamirpur': 
        setBlockData([
          'Bamson',
          'Bhoranj',
          'Bijhri',
          'Hamirpur',
          'Nadaun',
          'Tira Sujanpur'
        ]);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (district != '' && designation != 'CMO' && designation != 'MS') findBlockOfDistrict(district);
    else if (designation == 'CMO' || designation == 'MS') setBlock(null)
  }, [district, designation]);

  const handleRegisterButton = async () => {
    try {
      if (
        fullName == '' ||
        designation == '' ||
        specialization == '' ||
        healthcareFacility == '' ||
        district == '' || 
        block == ''
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
  
      // const res = await axiosInstance.post('doctor', {
      //   name: fullName,
      //   designation,
      //   mobileNumber,
      //   lattitude: '',
      //   longitude: "",
      //   specialization,
      //   healthcareFacilityName: healthcareFacility
      // })
      // console.log(res.data)
      await signIn(JSON.parse(user))
    } catch (error) {
      Alert.alert("User already registered with mobile number")
      console.error(error);
    }
    
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.label}>DESIGNATION</Text>
          <SelectDropdown
            data={['CMO', 'MS', 'SMO', 'BMO', 'MO']}
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
              setDesignation(selectedItem);
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
          <Text style={styles.label}>DISTRICT</Text>
          <SelectDropdown
            data={[
              'Bilaspur',
              'Chamba',
              'Hamirpur',
              // 'Kangra',
              // 'Kinnaur',
              // 'Kullu',
              // 'Lahaul & Spiti',
              // 'Mandi',
              // 'Shimla',
              // 'Sirmaur',
              // 'Solan',
              // 'Una',
            ]}
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
              setDistrict(selectedItem);
            }}
          />
        </View>
        {designation != 'CMO' &&
          designation != 'MS' &&
          designation != '' &&
          district != '' && (
            <View style={styles.inputDiv}>
              <Text style={styles.label}>BLOCK</Text>
              <SelectDropdown
                data={blockData}
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
                  setBlock(selectedItem);
                }}
              />
            </View>
          )}
        <View style={styles.inputDiv}>
          <Text style={styles.label}>HEALTHCARE FACILITY</Text>
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
              setHealthcareFacility(selectedItem);
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
    </SafeAreaView>
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
