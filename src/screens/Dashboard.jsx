import React from 'react';
import {StyleSheet, SafeAreaView, View, ScrollView} from 'react-native';
import { CHSearchDashboard } from '../components/CHSearchDashboard/CHSearchDashboard';
import {DashboardHeaderBar} from '../components/DashboardHeaderBar/DashboardHeaderBar';
import { DoctorCard } from '../components/DoctorCard/DoctorCard';
import { MedColSearchDashboard } from '../components/MedColSearchDashboard/MedColSearchDashboard';
import { PHCSearchDashboard } from '../components/PHCSearchDashboard/PHCSearchDashboard';
import { ZHSearchDashboard } from '../components/ZHSearchDashboard/ZHSearchDashboard';
import {styleConstants} from '../constants/constant';

export const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <DashboardHeaderBar />
      <View style={styles.searchView}>
        <PHCSearchDashboard/>
        <CHSearchDashboard/>
        <ZHSearchDashboard/>
        <MedColSearchDashboard/>
      </View>
      <ScrollView>
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styleConstants.SAND,
  },
  searchView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  }
});
