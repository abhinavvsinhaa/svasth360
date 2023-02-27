import AgoraUIKit from 'agora-rn-uikit';
import React, {useState} from 'react';

export const VideoCall = ({navigation, route}) => {
  const [videoCall, setVideoCall] = useState(true);

  const props = {
    connectionData: {
      appId: '790b4806cb7944929acdafde71633dd8',
      channel: `${route.params.channel}`,
    //   token:
    //     '007eJxTYJCct+jLja7MDlN5zidbvRY5zK1yux8jeuB9s1bSzKNJh/8pMJhbGiSZWBiYJSeZW5qYWBpZJianJKalpJobmhkbp6RYfN7wO7khkJGh0ektCyMDBIL4LAwlqcUlDAwAu2Ih4Q==',
      tokenUrl: 'https://agora-token-service-production-5c9e.up.railway.app'
    },
    rtcCallbacks: {
      EndCall: () => {
        setVideoCall(false);
        navigation.navigate('Dashboard');
      },
    },
  };
  return (
    <AgoraUIKit
      connectionData={props.connectionData}
      rtcCallbacks={props.rtcCallbacks}
    />
  );
  // return <></>
};
