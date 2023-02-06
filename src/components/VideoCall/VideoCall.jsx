import AgoraUIKit from "agora-rn-uikit";
import React, { useState } from "react";

export const VideoCall = ({ navigation }) => {
    const [videoCall, setVideoCall] = useState(true);
    const props = {
        connectionData: {
            appId: '790b4806cb7944929acdafde71633dd8',
            channel: 'test',
            token: '007eJxTYDjL0pn69YHHfClPx0//9P8kfS45vteh89mpiqeNR6IN5X8rMJhbGiSZWBiYJSeZW5qYWBpZJianJKalpJobmhkbp6RYKPA/SG4IZGSIyxNjZmSAQBCfhaEktbiEgQEAApchHQ==',
        },
        rtcCallbacks: {
            EndCall: () => {
                setVideoCall(false)
                navigation.navigate('Dashboard')
            },
        },
    }
    return videoCall ?
        <AgoraUIKit connectionData={props.connectionData} rtcCallbacks={props.rtcCallbacks} />
        : <></>
    // return <></>
}