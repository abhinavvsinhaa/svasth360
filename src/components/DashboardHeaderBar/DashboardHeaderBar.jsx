import React,  { useState } from 'react';
import {View, Text, StyleSheet, Image, Switch} from 'react-native';
import {styleConstants} from '../../constants/constant';

export const DashboardHeaderBar = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  function handleToggle() {
    setIsEnabled(!isEnabled);
  }

  return (
    <View style={styles.topBar}>
      <Text style={styles.headerLine}>SEC.HEALTH</Text>
      <View style={styles.outsideDiv}>
        <View style={styles.insideDiv}>
          <Image
            source={require('../../assets/images/DoctorSamplePhoto.png')}
          />
          <View>
            <Text style={styles.detailsInHeader}>NAME</Text>
            <Text style={styles.detailsInHeader}>DESIGNATION</Text>
          </View>
        </View>
        <Switch value={isEnabled} onChange={handleToggle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: styleConstants.BLUE,
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  outsideDiv: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  insideDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLine: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  detailsInHeader: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
  },
});
