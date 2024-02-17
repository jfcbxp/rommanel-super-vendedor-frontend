import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import 'react-native-gesture-handler';
import Provider from './src/context';
import Routes from './src/routes';
import * as serviceWorkerRegistration from './src/serviceWorkerRegistration';
import { useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import * as Notifications from 'expo-notifications';

export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_500Medium,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    Notifications.scheduleNotificationAsync({
        content: {
            title: 'Bom dia super vendedor(a)!! \uD83D\uDE00',
            body: 'Lembre-se de conferir se temos aniversariantes na carteira hoje. \ud83d\udc41\ufe0f',
        },

        trigger: { hour: 10, minute: 1, repeats: true },
    });

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <Provider>
                    <Routes />
                    <StatusBar style="light" translucent={false} />
                </Provider>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#601C5C',
    },
});

if (Platform.OS === 'web') {
    serviceWorkerRegistration.register();
}
