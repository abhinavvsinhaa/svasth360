import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axiosInstance from '../api/axios';
import {
  ZHSearchDashboard,
  PHCSearchDashboard,
  MedColSearchDashboard,
  DoctorCard,
  DashboardHeaderBar,
  CHSearchDashboard,
} from '../components';
import {styleConstants} from '../constants/constant';
import {useAuth} from '../context/Auth';
import SocketService from '../utils/socket';

export const Dashboard = ({navigation, route}) => {
  const {authData} = useAuth();
  const [cards, setCards] = useState([]);

  async function fetchMyCards() {
    try {
      const designation = String(authData.designation).toLowerCase();
      const res = await axiosInstance.post(
        `doctor/cards?designation=${designation}`,
        {
          stateId: authData.stateId,
          districtId: authData.districtId,
          blockId: authData.blockId,
          healthcareFacilityId: authData.healthcareFacilityId,
        },
      );
      console.log(res.data);
      setCards(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    SocketService.emit('combine', {
      userId: authData.id
    })

    SocketService.on('join_room', (data) => {
      console.log('INCOMINGGGGGGG')
      navigation.navigate('Video Call', {
        channel: data.channel
      })
    })

    fetchMyCards();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={styleConstants.SAND} />
      <DashboardHeaderBar
        name={authData.name}
        designation={authData.designation}
        specialization={authData.specialization}
        userId={authData.id}
      />

      <View style={styles.searchView}>
        <PHCSearchDashboard />
        <CHSearchDashboard />
        <ZHSearchDashboard />
        <MedColSearchDashboard />
      </View>

      <ScrollView>
        {cards == [] ? (
          <ActivityIndicator size={'small'} />
        ) : (
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
          })
        )}
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
