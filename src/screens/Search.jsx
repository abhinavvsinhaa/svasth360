import React from 'react';
import {DoctorCard} from '../components';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { styleConstants } from '../constants/constant';

export const Search = ({navigation, route}) => {
  const params = JSON.parse(route.params);
  const {doctors} = params;
  return (
    <SafeAreaView>
      <ScrollView style={{ marginBottom: 10 }}>
        {(doctors.length > 0) ?
          doctors.map((doctor, i) => {
            return (
              <DoctorCard
                key={i}
                name={doctor.name}
                designation={doctor.designation}
                HF={doctor.healthcareFacilityName}
                userId={doctor.id}
                navigation={navigation}
                mobileNumber={doctor.mobileNumber}
                fcmToken={doctor.fcmToken}
                availability={doctor.availability}
              />
            );
          })
          :
          <View style={{flex: 1, backgroundColor: styleConstants.SAND, justifyContent: 'center', alignItems: 'center'}}>
            <Text>No results found.</Text>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};
