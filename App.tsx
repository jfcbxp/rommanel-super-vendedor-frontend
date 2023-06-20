import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';
import 'react-native-gesture-handler';
import Provider from './src/context';
import Routes from './src/routes';
import * as serviceWorkerRegistration from './src/serviceWorkerRegistration';
import { useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';

export default function App() {
    let [fontsLoaded] = useFonts({
        Inter_500Medium,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

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
