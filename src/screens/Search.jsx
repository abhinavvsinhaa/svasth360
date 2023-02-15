import React from 'react';
import {DoctorCard} from '../components';
import { Text, View } from 'react-native';
import { styleConstants } from '../constants/constant';

export const Search = ({route}) => {
  const params = JSON.parse(route.params);
  const {doctors} = params;
  return (
    <>
      {(doctors.length > 0) ?
        doctors.map((doctor, i) => {
          return (
            <DoctorCard
              key={i}
              name={doctor.name}
              mobileNumber={doctor.mobileNumber}
              designation={doctor.designation}
              HF={doctor.healthcareFacilityName}
              userId={doctor.id}
            />
          );
        })
        :
        <View style={{flex: 1, backgroundColor: styleConstants.SAND, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No results found.</Text>
        </View>
      }
    </>
  );
};
