import React from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {styleConstants} from '../../constants/constant';
import SelectDropdown from 'react-native-select-dropdown';

export const PHCSearchModal = ({visible, setVisible}) => {
  return (
    <View style={styles.centeredView}>
      <Modal visible={visible} transparent={true} onRequestClose={() => setVisible(!visible)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={styles.crossButton} onPress={() => setVisible(!visible)}>
                <Image source={require("../../assets/images/CloseIcon.png")} style={styles.crossButtonIcon}/>
            </Pressable>
            <Text>PHC/CHC</Text>
            <SelectDropdown
            data={['PHC', 'CHC']}
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
              borderWidth: 1
            }}
            onSelect={(selectedItem, index) => {
            }}
          />
          <SelectDropdown
            data={['PHC', 'CHC']}
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
              borderWidth: 1
            }}
            onSelect={(selectedItem, index) => {
            }}
          />
            <SelectDropdown
            data={['PHC', 'CHC']}
            defaultButtonText="PHC/CHC"
            buttonTextStyle={{
              textAlign: 'left',
              color: styleConstants.BLUE,
              fontSize: 14
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
              borderWidth: 1
            }}
            onSelect={(selectedItem, index) => {
            }}
          />
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
    alignSelf: "flex-end",
    marginRight: 10
  },
  crossButtonIcon: {
    width: 12
  }
});
