import { createStackNavigator } from "@react-navigation/stack";
import { StackParams } from "../types/stack.params";
import SignIn from "../pages/SignIn";

export default function AuthRoutes() {
    const Stack = createStackNavigator<StackParams>()
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    title: "Login",
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}