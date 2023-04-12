import { createStackNavigator } from "@react-navigation/stack";
import { StackParams } from "../types/stack.params";
import Home from "../pages/Home";

export default function AppRoutes() {
    const Stack = createStackNavigator<StackParams>()
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name="Home"
                component={Home} />
        </Stack.Navigator>
    )
}