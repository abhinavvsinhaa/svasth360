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
import { log } from 'react-native-reanimated';
import SelectDropdown from 'react-native-select-dropdown';
import axiosInstance from '../api/axios';
import {styleConstants} from '../constants/constant';
import {useAuth} from '../context/Auth';

export const FillSignUpDetails = ({navigation, route}) => {
  // personal details
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [district, setDistrict] = useState('');
  const [block, setBlock] = useState(null);
  const [healthcareFacilityType, setHealthcareFacilityType] = useState('');
  const [healthcareFacilityName, setHealthcareFacilityName] = useState('');

  let matchDesignationWithHF = new Map();
  matchDesignationWithHF.set('CMO', 'zh');
  matchDesignationWithHF.set('MS', 'zh');
  matchDesignationWithHF.set('SMO', 'ch');
  matchDesignationWithHF.set('BMO', 'phc');

  const {mobileNumber, user} = route.params;
  const {signIn, signUp, zimLogIn} = useAuth();

  const [disabled, setDisabled] = useState(true);

  // store data requested from API
  const [apiData, setAPIData] = useState(undefined);

  // dropdown data
  const [districtsName, setDistrictsName] = useState([]);
  const [blocksName, setBlocksName] = useState([]);
  const [showAvailableHealthcareFacility, setShowAvailableHealthcareFacility] =
    useState([]);

  const [districtMap, setDistrictMap] = useState(new Map());
  const [blockMap, setBlockMap] = useState(new Map());

  // find blocks of choosen district
  const findBlockOfDistrict = async district => {
    setBlocksName([]);
    setBlockMap(new Map());

    const dst = apiData.districts.filter((district) => {
      return district.name == 'Kangra'
    })
    
    // console.log(dst)
    const blockMap = new Map();
    const __block = dst[0].blocks.map(__block => {
      blockMap.set(String(__block.name), String(__block._id))
      console.log(__block.name, __block._id)
      return __block.name
    })

    // console.log(__block)
    setBlocksName(__block)
    setBlockMap(new Map(blockMap))
  };

  const fetchHF = async () => {
    try {
      setShowAvailableHealthcareFacility([]);
      if (designation != 'MO') {
        // Alert.alert('called');
        const hf = matchDesignationWithHF.get(designation);
        const stateId = '63d745c21dfbee793b8a05ad';
        // const districtId = await districtMap.get(district);
        const districtId = '63d745c61dfbee793b8a05b0'
        console.log(block)
        const blockId = (block != null) ? blockMap.get(block) : '';
        console.log(blockId)
        // const blockId = '63d745ca1dfbee793b8a05b5'
        // Alert.alert(districtId);
        // Alert.alert(blockId);
        console.log(blockId)
        // Alert.alert(hf);
        const res = await axiosInstance.get(
          `${hf}?stateId=${stateId}&districtId=${districtId}&blockId=${blockId}`,
        );
        console.log('Available HFs', res.data);
        const hfs = res.data.map(__hf => {
          return __hf.name
        });

        setShowAvailableHealthcareFacility(hfs)
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch districts of Himachal Pradesh
  async function fetchDistricts() {
    try {
      setDistrictsName([]);

      const res = await axiosInstance.get('district');
      setAPIData(res.data);

      res.data.districts.map(__district => {
        setDistrictMap(__district.name, __district.id);
        setDistrictsName([...districtsName, __district.name]);
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // fetch all districts
    // setBlocksName([]);
    // setDistrictsName([]);
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (district != '' && designation != 'CMO' && designation != 'MS')
      findBlockOfDistrict(district);
    else if (designation == 'CMO' || designation == 'MS' && district != '') {
      setBlock(null)
    };
  }, [district, designation]);

  useEffect(() => {
    fetchHF();
  }, [designation, block])

  const handleRegisterButton = async () => {
    try {
      if (
        fullName == '' ||
        designation == '' ||
        specialization == '' ||
        healthcareFacilityName == '' ||
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

      const res = await axiosInstance.post('doctor', {
        name: fullName,
        mobileNumber,
        designation,
        specialization,
        healthcareFacilityType,
        healthcareFacilityName,
        stateName: 'Himachal Pradesh',
        districtName: district,
        blockName: block,
      });
      console.log(res.data);

      await signIn(res.data);
      await zimLogIn({
        userID: String(res.data.id),
        userName: String(res.data.id),
      });
    } catch (error) {
      console.error('error while registering', error)
      // Alert.alert('User already registered with mobile number');
      // Alert.alert(error);
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
          <Text style={styles.label}>NAME *</Text>
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
          <Text style={styles.label}>DESIGNATION *</Text>
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
          <Text style={styles.label}>SPECIALIZATION *</Text>
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
          <Text style={styles.label}>DISTRICT *</Text>
          <SelectDropdown
            // data={districtsName}
            data={['Kangra']}
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

              setDistrict('Kangra');
              // if (designation == 'CMO' || designation == 'MS') {
              //   await fetchHF();
              //   setDisabled(false);
              // }
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
                data={blocksName}
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
                  // await fetchHF();
                  // fetchHF();
                  // setDisabled(false);
                }}
              />
            </View>
          )}
        <View style={styles.inputDiv}>
          <Text style={styles.label}>HEALTHCARE FACILITY NAME *</Text>
          <SelectDropdown
            // disabled={disabled}
            data={showAvailableHealthcareFacility}
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
              setHealthcareFacilityName(selectedItem);
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
