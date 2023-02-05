import React,  { useState } from 'react';
import {View, Text, StyleSheet, Image, Switch} from 'react-native';
import {styleConstants} from '../../constants/constant';

export const DashboardHeaderBar = ({ name, designation, specialization }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  function handleToggle() {
    setIsEnabled(!isEnabled);
  }

  return (
    <View style={styles.topBar}>
      <Text style={styles.headerLine}>{designation}</Text>
      <View style={styles.outsideDiv}>
        <View style={styles.insideDiv}>
          <Image
            source={require('../../assets/images/DoctorSamplePhoto.png')}
          />
          <View>
            <Text style={styles.detailsInHeader}>{name}</Text>
            <Text style={styles.detailsInHeader}>{specialization}</Text>
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
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
    fontSize: 16
  },
});
