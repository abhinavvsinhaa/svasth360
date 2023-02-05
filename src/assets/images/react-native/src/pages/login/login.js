import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Button, Input, Text, Layout } from '@ui-kitten/components';
import { useZIM } from '../../hooks/zim';

const inputState = {
    name: Date.now() + '',
    id: '',
    isSubmit: false,
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'inputName':
            return { ...state, name: action.value, isSubmit: true };
        case 'inputID':
            return { ...state, id: action.value, isSubmit: true };
        case 'submit':
            action.cb && action.cb();
            return { ...state, isSubmit: true };
    }
};

const Login = ({ navigation }) => {

    const [{ callID }, zimAction] = useZIM();
    const [state, dispatch] = useReducer(userReducer, inputState, () => ({ ...inputState }));

    useEffect(() => {
        zimAction.initEvent();
        zimAction.injectAppEvent('callEventTimeout', () => {
            Alert.alert(
                '',
                'Call Invitees Answered Timeout',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            )
        });
        zimAction.injectAppEvent('callInvitationReceived', (ID, inviter) => {
            zimAction.callSetID(ID)
            navigation.push('CallReceived', { ID, inviter })
            // if (callID) {
            //     Alert.alert('', 'Receiving call', [
            //         {
            //             text: 'Reject',
            //             onPress: () => zimAction.callReject(callID, { extendedData: 'Reject call' })

            //         },
            //         {
            //             text: 'Accept',
            //             onPress: () => zimAction.callAccept(callID, { extendedData: 'Accept call' })
            //         },
            //     ]);
            // }
        });
    }, []);

    const submitForm = ({ name, id }) => {
        if (!!name && !!id) {
            zimAction.login({ userID: id, userName: name }).then(() => {
                navigation.push('Home');
            });
        }
    };

    return (
        <Layout style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Input
                label='username'
                style={styles.input}
                size='medium'
                placeholder='Place your username'
                value={state.name}
                status={!state.name && state.isSubmit ? 'danger' : ''}
                onChangeText={(value) => dispatch({ type: 'inputName', value })}
            />
            <Input
                label='user ID'
                style={styles.input}
                size='medium'
                placeholder='Place your userID'
                value={state.id}
                status={!state.id && state.isSubmit ? 'danger' : ''}
                onChangeText={(value) => { dispatch({ type: 'inputID', value }) }}
            />
            <Button style={styles.submit} onPress={() => { dispatch({ type: 'submit', cb: () => submitForm(state) }) }}>Submit</Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        paddingBottom: 20,
        paddingHorizontal: 20,
        flex: 1,
    },
    title: {
        fontSize: 20,
        color: '#333333',
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 15,
    },
    input: {
        marginVertical: 5,
    },
    submit: {
        marginTop: 20,
    },
    icon: {
        width: 32,
        height: 32,
    },
});

export default Login;
