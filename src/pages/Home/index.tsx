import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { HomeStyles as styles } from "./styles";
import { HomeHeader } from "../../components/headers/home";
import { Container } from "../../components/container";
import { NavigationButton } from "../../components/buttons/navigation";
import { StatusBar } from "expo-status-bar";
import { ProgressBar } from "../../components/progress_bar";
import { Divider } from "../../components/divider";

interface Properties extends StackScreenProps<StackParams, "Home"> { }

export default function Home({ navigation }: Properties) {
    return (
        <View style={styles.container}>
            <HomeHeader />
            <View style={styles.body}>
                <View style={styles.navigator}>
                    <NavigationButton
                        title="Agendamento"
                        icon="schedule"
                        onPress={() => { navigation.navigate("Scheduling") }} />
                    <NavigationButton
                        title="Carteira"
                        icon="check-box"
                        onPress={() => { navigation.navigate("Wallet") }} />
                    <NavigationButton
                        title="Faturamento"
                        icon="bar-chart"
                        onPress={() => { navigation.navigate("Billing", {}) }} />
                </View>
                <View style={styles.bottom}>
                    <Container title="Hoje">
                        <ProgressBar
                            title="Total Vendido"
                            step={1800}
                            steps={3000}
                            type="money" />
                        <Divider />
                        <ProgressBar
                            title="Clientes Atendidos"
                            step={10}
                            steps={10}
                            type="number" />
                        <Divider />
                        <ProgressBar
                            title="Prospectos"
                            step={0}
                            steps={10}
                            type="number" />
                        <Divider />
                    </Container>
                </View>
            </View>
            <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
        </View>
    )
}