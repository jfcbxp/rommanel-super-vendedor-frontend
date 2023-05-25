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
import { useContext, useEffect } from "react";
import { Context } from "../../context";

interface Properties extends StackScreenProps<StackParams, "Home"> { }

export default function Home({ navigation }: Properties) {
    const context = useContext(Context)

    useEffect(() => {
        const init = async () => {
            await context.getMeta()
        }
        init().catch(error => console.error(error))
    }, [])

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
                        onPress={() => { navigation.navigate("Billing") }} />
                </View>
                <View style={styles.bottom}>
                    <Container title="Hoje">
                        <ProgressBar
                            title="Meta Mensal"
                            step={context.meta ? context.meta.metaValor : 0}
                            steps={context.meta ? context.meta.metaValor : 0}
                            type="money" />
                        <Divider />
                        <ProgressBar
                            title="Meta diária"
                            step={context.meta ? (context.meta.metaValor / context.meta.dias) : 0}
                            steps={context.meta ? (context.meta.metaValor / context.meta.dias) : 0}
                            type="money" />
                        <Divider />
                        <ProgressBar
                            title="Prospectos"
                            step={context.meta ? context.meta?.metaProspecto : 0}
                            steps={context.meta ? context.meta?.metaProspecto : 0}
                            type="number" />
                        <Divider />
                    </Container>
                </View>
            </View>
            <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
        </View>
    )
}