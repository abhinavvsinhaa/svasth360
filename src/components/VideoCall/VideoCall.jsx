import AgoraUIKit from "agora-rn-uikit";
import axios from "axios";
import React, { useState } from "react";

export const VideoCall = ({ navigation, route }) => {
    const [videoCall, setVideoCall] = useState(true);

    console.log(route.params)

    const props = {
        connectionData: {
            appId: '790b4806cb7944929acdafde71633dd8',
            channel: `${route.params.channel}`,
            tokenUrl: 'https://agora-token-service-production-5c9e.up.railway.app'
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