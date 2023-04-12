import { Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { HomeStyles as styles } from "./styles";
import { Header } from "../../components/header";
import { Container } from "../../components/container";
import { NavigationButton } from "../../components/buttons/navigation";

interface Properties extends StackScreenProps<StackParams, "Home"> { }

export default function Home({ navigation }: Properties) {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Header />
            </View>
            <View style={{ flex: 9, paddingHorizontal: "5%" }}>
                <View style={{
                    flex: 1.5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: "5%",
                }}>
                    <NavigationButton
                        title="Agendamento"
                        icon="schedule" />
                    <NavigationButton
                        title="Carteira"
                        icon="check-box" />
                    <NavigationButton
                        title="Faturamento"
                        icon="attach-money" />
                </View>
                <View style={{ flex: 7.5, paddingTop: "2.5%" }}>
                    <Container title="Hoje">

                    </Container>
                </View>
            </View>
        </View>
    )
}