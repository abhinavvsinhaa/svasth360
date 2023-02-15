import React, {useEffect, useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {styleConstants} from '../../constants/constant';
import SelectDropdown from 'react-native-select-dropdown';
import axiosInstance from '../../api/axios';

export const CHSearchModal = ({visible, setVisible, navigation}) => {
  const [apiData, setAPIData] = useState();

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState('');

  const [chs, setCHs] = useState([]);
  const [selectedCHs, setSelectedCHs] = useState('');

  const [doctors, setDoctors] = useState([])

  async function onClickSearch() {
    navigation.navigate('Search', JSON.stringify({
      doctors
    }))
    setVisible(false)
  }

  async function getDoctors() {
    apiData.districts.map(district => {
      if (district.name == selectedDistrict) {
        district.blocks.map(block => {
          if (block.name == selectedBlock) {
            block.ch.map(ch => {
              if (ch.name == selectedCHs) {
                let doctors = ch.doctors.map(doctor => {
                  return doctor
                })
                setDoctors(doctors)
                return;
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

  async function getCHs() {
    apiData.districts.map(district => {
      if (district.name == selectedDistrict) {
        district.blocks.map(block => {
          if (block.name == selectedBlock) {
            let chs = block.ch.map(ch => {
              return ch.name;
            });
            setCHs(chs);
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
    getCHs();
  }, [selectedBlock]);

  useEffect(() => {
    getDoctors();
  }, [selectedCHs]);

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
            <Text style={{ fontSize: 16 }}>Civil Hospitals</Text>
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
                onSelect={(selectedItem, index) => {setSelectedDistrict(selectedItem)}}
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
                onSelect={(selectedItem, index) => {setSelectedBlock(selectedItem)}}
              />
            )}
            {
              chs != [] &&
              <SelectDropdown
                data={chs}
                defaultButtonText="Choose CH"
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
                onSelect={(selectedItem, index) => {setSelectedCHs(selectedItem)}}
              />
            }
            <Pressable style={styles.button} onPress={onClickSearch}>
              <Text style={{ textAlign: 'center', color: '#fff' }}>Search</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
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
