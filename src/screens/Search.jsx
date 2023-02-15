import React from 'react';
import {DoctorCard} from '../components';

export const Search = ({route}) => {
  const params = JSON.parse(route.params);
  const {doctors} = params;
  return (
    <>
      {doctors != [] &&
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
        })}
    </>
  );
};
