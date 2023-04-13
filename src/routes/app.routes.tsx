import { createStackNavigator } from "@react-navigation/stack";
import { StackParams } from "../types/stack.params";
import Home from "../pages/Home";
import Wallet from "../pages/Wallet";
import Scheduling from "../pages/Scheduling";

export default function AppRoutes() {
    const Stack = createStackNavigator<StackParams>()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name="Home"
                component={Home} />
            <Stack.Screen
                name="Scheduling"
                component={Scheduling} />
            <Stack.Screen
                name="Wallet"
                component={Wallet} />
        </Stack.Navigator>
    )
}