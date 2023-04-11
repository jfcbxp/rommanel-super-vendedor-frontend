import { useContext } from "react"
import { Context } from "../context"
import { ActivityIndicator, SafeAreaView } from "react-native"
import AuthRoutes from "./auth.routes"
import AppRoutes from "./app.routes"

export default function Routes() {
    const context = useContext(Context)
    if (context.loading) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <ActivityIndicator size={128} color={global.ROMMANEL_LOGO_PURPLE} />
            </SafeAreaView>
        )
    } else {
        return context.user ? (
            <AppRoutes />
        ) : (
            <AuthRoutes />
        )
    }
}