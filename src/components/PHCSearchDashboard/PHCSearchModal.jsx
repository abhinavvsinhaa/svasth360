import React, { useState, useEffect } from 'react';
import {Alert, Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {styleConstants} from '../../constants/constant';
import SelectDropdown from 'react-native-select-dropdown';
import axiosInstance from '../../api/axios';

export const PHCSearchModal = ({visible, setVisible, navigation}) => {
  const [apiData, setAPIData] = useState();

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState('');

  const [chcphc, setCHCPHCs] = useState([]);
  const [selectedHF, setSelectedHF] = useState('');

  const [doctors, setDoctors] = useState([]);

  async function onClickSearch() {
    // if (doctors.length > 0) {
      navigation.navigate(
        'Search',
        JSON.stringify({
          doctors,
        }),
      );
    
    setVisible(false);
  }

  async function getDoctors() {
    apiData.districts.map(district => {
      if (district.name == selectedDistrict) {
        district.blocks.map(block => {
          if (block.name == selectedBlock) {
            block.chc.map(chc => {
              if (chc.name == selectedHF) {
                let doctors = chc.doctors.map(doctor => {
                  return doctor;
                });
                console.log('found doctors', doctors)
                setDoctors(doctors);
              }
            });
            block.phc.map(phc => {
              if (phc.name == selectedHF) {
                let doctors = phc.doctors.map(doctor => {
                  return doctor;
                });
                console.log('found doctors', doctors)
                setDoctors(doctors);
              }
            });
            return;
          }
        });
        return;
      }
    });
  }

  async function getDistricts() {
    const res = await axiosInstance.get('district');
    setAPIData(res.data);
    let district = res.data.districts.map(district => {
      return district.name;
    });
    setDistricts(district);
  }

  async function getBlocks() {
    apiData.districts.map(district => {
      if (district.name == selectedDistrict) {
        let blocks = district.blocks.map(block => {
          return block.name;
        });
        setBlocks(blocks);
      }
    });
  }

  async function getCHCPHCs() {
    apiData.districts.map(district => {
      if (district.name == selectedDistrict) {
        district.blocks.map(block => {
          if (block.name == selectedBlock) {
            let chcs = block.chc.map(chc => {
              return chc.name;
            });
            console.log(chcs)
            let phcs = block.phc.map(phc => {
              return phc.name;
            });
            console.log(phcs)
            let arr = chcs.concat(phcs);
            setCHCPHCs(arr);
            return;
          }
        });
        return;
      }
    });
  }

  useEffect(() => {
    getDistricts();
  }, []);

  useEffect(() => {
    getBlocks();
  }, [selectedDistrict]);

  useEffect(() => {
    getCHCPHCs();
  }, [selectedBlock]);

  useEffect(() => {
    getDoctors();
  }, [selectedHF]);

  return (
    <View style={styles.centeredView}>
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={() => setVisible(!visible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.crossButton}
              onPress={() => setVisible(!visible)}>
              <Image
                source={require('../../assets/images/CloseIcon.png')}
                style={styles.crossButtonIcon}
              />
            </Pressable>
            <Text>PHCs and CHCs</Text>
            {districts != [] && (
              <SelectDropdown
                data={districts}
                defaultButtonText="District"
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
                  borderColor: styleConstants.BLUE,
                  borderWidth: 1,
                }}
                onSelect={(selectedItem, index) => {
                  setSelectedDistrict(selectedItem);
                }}
              />
            )}
            {blocks != [] && (
              <SelectDropdown
                data={blocks}
                defaultButtonText="Block"
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
                  borderColor: styleConstants.BLUE,
                  borderWidth: 1,
                }}
                onSelect={(selectedItem, index) => {
                  setSelectedBlock(selectedItem);
                }}
              />
            )}
            {chcphc != [] && (
              <SelectDropdown
                data={chcphc}
                defaultButtonText="Choose PHC/CHC"
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
                  borderColor: styleConstants.BLUE,
                  borderWidth: 1,
                }}
                onSelect={(selectedItem, index) => {
                  setSelectedHF(selectedItem);
                }}
              />
            )}
            <Pressable style={styles.button} onPress={onClickSearch}>
              <Text style={{textAlign: 'center', color: '#fff'}}>Search</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: styleConstants.SAND,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  crossButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  crossButtonIcon: {
    width: 12,
  },
  button: {
    backgroundColor: styleConstants.BLUE,
    width: "100%",
    marginTop: 10,
    borderRadius: 5,
    padding: 10
  }
});
