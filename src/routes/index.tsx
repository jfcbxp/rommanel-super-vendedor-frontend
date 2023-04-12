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
                    backgroundColor: "#73186D",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <ActivityIndicator size={128} color="#E0CCDC" />
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