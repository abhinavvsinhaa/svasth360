import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {DashboardHeaderBar} from '../components/DashboardHeaderBar/DashboardHeaderBar';
import {styleConstants} from '../constants/constant';

export const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DashboardHeaderBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConstants.SAND,
  },
});
