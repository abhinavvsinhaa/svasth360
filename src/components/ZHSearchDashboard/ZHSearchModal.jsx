import React, {useEffect, useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {styleConstants} from '../../constants/constant';
import SelectDropdown from 'react-native-select-dropdown';
import axiosInstance from '../../api/axios';

export const ZHSearchModal = ({visible, setVisible, navigation}) => {
  const [zhs, setZHs] = useState([]);
  const [selectedZH, setSelectedZh] = useState('')
  const [doctors, setDoctors] = useState([])
  const [apiData, setAPIData] = useState()

  function onClickSearch() {
    console.log(doctors)
    navigation.navigate('Search', JSON.stringify({
      doctors: doctors
    }))
    setVisible(false)
  }

  async function fetchDoctorOfZH() {
    apiData.map(zh => {
      if (zh.name == selectedZH) {
        let doctors = zh.doctors.map(doctor => {
          return doctor
        })
        console.log(doctors)
        setDoctors(doctors)
      }
    })
  }

  async function fetchZHs() {
    const res = await axiosInstance.get(
      `zh?stateId=${'63d745c21dfbee793b8a05ad'}`,
    );

    setAPIData(res.data)

    let zhs = res.data.map(zh => {
      return zh.name;
    });
    
    setZHs(zhs);
  }

  useEffect(() => {
    fetchZHs();
  }, []);

  useEffect(() => {
    fetchDoctorOfZH()
  }, [selectedZH])

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
            <Text style={{ fontSize: 16 }}>Zonal Hospitals</Text>
            {zhs != [] && (
              <>
                <SelectDropdown
                  data={zhs}
                  defaultButtonText="Choose ZH"
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
                    borderRadius: 8,
                    textAlign: 'left',
                    marginTop: 10,
                    borderColor: styleConstants.BLUE,
                    borderWidth: 1,
                  }}
                  onSelect={(selectedItem, index) => { 
                    setSelectedZh(selectedItem) 
                  }}
                />
                <Pressable style={styles.button} onPress={onClickSearch}>
                  <Text style={{ textAlign: 'center', color: '#fff' }}>Search</Text>
                </Pressable>
              </>
            )}
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
    borderRadius: 10,
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
    width: 10,
  },
  button: {
    backgroundColor: styleConstants.BLUE,
    width: "100%",
    marginTop: 10,
    borderRadius: 5,
    padding: 10
  }
});
