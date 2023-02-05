import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GroupList from './groupList';
import ConvList from './convList';
import Mine from './mine';
import Add from '../../components/add';
import { useZIM } from '../../hooks/zim';
import { Icon } from 'react-native-eva-icons';
import { StyleSheet } from 'react-native';
import { Button } from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

const Logout = (props) => (
    <Button onPress={() => { props.logout(), props.navigation.popToTop() }} style={styles.button} >
        <Icon name='corner-up-left-outline' fill='#333' style={styles.icon} />
    </Button>
)

const Home = ({ navigation }) => {
    const [state, zimAction] = useZIM();

    return (
        <Navigator
            initialRouteName='Conversation'
            screenOptions={{
                headerRight: () => <Add />,
                headerLeft: () => <Logout logout={zimAction.logout} navigation={navigation} />
            }}>
            <Screen
                name='Conversation'
                options={{ ...(state.unreadCount ? { tabBarBadge: state.unreadCount } : {}) }}
                component={ConvList}
            />
            <Screen name='GroupList' component={GroupList} />
            <Screen name='Me' component={Mine} />
        </Navigator>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#fff",
        borderColor: "#fff",
        paddingHorizontal: 0,
        paddingVertical: 0
    },


})
export default Home;
