import React from 'react';
import {
    ZegoUIKitPrebuiltCallWithInvitation,
    ZegoSendCallInvitationButton,
    ZegoInvitationType,
    ONE_ON_ONE_VIDEO_CALL_CONFIG,
    ONE_ON_ONE_VOICE_CALL_CONFIG,
    GROUP_VIDEO_CALL_CONFIG,
    GROUP_VOICE_CALL_CONFIG
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';

export default function VideoCall(props) {
    return (
        <ZegoUIKitPrebuiltCallWithInvitation
            appID={yourAppID}
            appSign={yourAppSign}
            userID={userID} // userID can be something like a phone number or the user id on your own user system. 
            userName={userName}
            ringtoneConfig={{
                incomingCallFileName: 'zego_incoming.mp3',
                outgoingCallFileName: 'zego_outgoing.mp3',
            }}
            plugins={[ZegoUIKitSignalingPlugin]} // The signaling plug-in used for call invitation must be set here. 
            requireConfig={(data) => {
                console.warn('requireConfig', data);
                const callConfig =
                    data.invitees.length > 1
                        ? ZegoInvitationType.videoCall === data.type
                            ? GROUP_VIDEO_CALL_CONFIG
                            : GROUP_VOICE_CALL_CONFIG
                        : ZegoInvitationType.videoCall === data.type
                            ? ONE_ON_ONE_VIDEO_CALL_CONFIG
                            : ONE_ON_ONE_VOICE_CALL_CONFIG;
                return {
                    ...callConfig,
                };
            }}
            notifyWhenAppRunningInBackgroundOrQuit={true}
            isIOSSandboxEnvironment={false} // Ignore this if you are not building an iOS app. 
        >
            {/* ... */}
            <ZegoSendCallInvitationButton
                invitees={[{ userID: inviteeID, userName: inviteeName }]} // List of user object.
                isVideoCall={false}
                resourceID={"zego_uikit_call"} // For offline call notification
            />
            <ZegoSendCallInvitationButton
                invitees={[{ userID: inviteeID, userName: inviteeName }]} // List of user object.
                isVideoCall={true}
                resourceID={"zego_uikit_call"} // For offline call notification
            />
        </ZegoUIKitPrebuiltCallWithInvitation>
    );
}