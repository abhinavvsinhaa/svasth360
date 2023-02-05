import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import axiosInstance from '../api/axios';
import {CHSearchDashboard} from '../components/CHSearchDashboard/CHSearchDashboard';
import {DashboardHeaderBar} from '../components/DashboardHeaderBar/DashboardHeaderBar';
import {DoctorCard} from '../components/DoctorCard/DoctorCard';
import {MedColSearchDashboard} from '../components/MedColSearchDashboard/MedColSearchDashboard';
import {PHCSearchDashboard} from '../components/PHCSearchDashboard/PHCSearchDashboard';
import {ZHSearchDashboard} from '../components/ZHSearchDashboard/ZHSearchDashboard';
import {styleConstants} from '../constants/constant';
import {useAuth} from '../context/Auth';

export const Dashboard = ({navigation, route}) => {
  const [id, setId] = useState(undefined);
  const {authData} = useAuth();
  const [userData, setUserData] = useState(undefined);
  const [headerLoaded, setHeaderLoaded] = useState(false);
  const [cards, setCards] = useState([]);

  async function fetchMyDetails() {
    try {
      // phoneNumber can be accessed with authData.phoneNumber
      console.log(authData);
      const res = await axiosInstance.post('doctor/me', {
        mobileNumber: authData.phoneNumber,
      });
      setUserData(res.data);
      setId(res.data._id);
      setHeaderLoaded(true);
    } catch (error) {
      Alert.alert(error);
    }
  }

  async function fetchMyCards() {
    if (userData.designation == 'CMO') {
      const res = await axiosInstance.post('doctor/cmo', {
        stateId: userData.stateId,
        districtId: userData.districtId,
      });
      console.log(res.data);
      setCards(res.data);
    }
  }

  useEffect(() => {
    fetchMyDetails();
  }, []);

  // load cards for the doctor
  useEffect(() => {
    fetchMyCards();
  }, [headerLoaded]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={styleConstants.SAND} />
      {userData && (
        <DashboardHeaderBar
          name={userData.name}
          designation={userData.designation}
          specialization={userData.specialization}
        />
      )}

      <View style={styles.searchView}>
        <PHCSearchDashboard />
        <CHSearchDashboard />
        <ZHSearchDashboard />
        <MedColSearchDashboard />
      </View>

      <ScrollView>
        {cards != [] &&
          cards.map(card => {
            return (
              <DoctorCard
                name={card.name}
                designation={card.designation}
                HF={card.healthcareFacilityName}
                userId={card.id}
                key={card.id}
                navigation={navigation}
                route={route}
                mobileNumber={card.mobileNumber}
              />
            );
          })}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});
