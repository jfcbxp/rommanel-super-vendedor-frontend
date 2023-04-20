import { View, Text } from "react-native";
import { Divider } from "../../divider";
import { SchedulingHeaderStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationParams } from "../../../types/navigation.params";

interface Properties {
    total: number
    totalStatus: number
    predicted: number
    predictedStatus: number
    absences: number
    absencesStatus: number
    arrivals: number
    arrivalsStatus: number
}

export function SchedulingHeader(properties: Properties) {
    const navigation = useNavigation<NavigationParams>()

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Icon
                    name="chevron-left"
                    color="white"
                    size={48}
                    onPress={() => { navigation.navigate("Home") }} />
                <Text style={styles.title}>Agendamentos</Text>
            </View>
            <View style={styles.field}>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Total</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.total}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.totalStatus >= 0 ?
                            <Icon
                                name="arrow-upward"
                                color="#60D29D"
                                size={18} />
                            :
                            <Icon
                                name="arrow-downward"
                                color="#FF5454"
                                size={18} />
                        }
                        <Text style={[styles.text, { color: "#FE38F2" }]}>
                            {properties.totalStatus}
                        </Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Previstos</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.predicted}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.predictedStatus >= 0 ?
                            <Icon
                                name="arrow-upward"
                                color="#60D29D"
                                size={18} />
                            :
                            <Icon
                                name="arrow-downward"
                                color="#FF5454"
                                size={18} />
                        }
                        <Text style={[styles.text, { color: "#FE38F2" }]}>
                            {properties.predictedStatus}
                        </Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
            </View>
            <Divider />
            <View style={styles.field}>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Faltas</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.absences}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.absencesStatus >= 0 ?
                            <Icon
                                name="arrow-upward"
                                color="#60D29D"
                                size={18} />
                            :
                            <Icon
                                name="arrow-downward"
                                color="#FF5454"
                                size={18} />
                        }
                        <Text style={[styles.text, { color: "#FE38F2" }]}>
                            {properties.absencesStatus}
                        </Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Chegaram</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>{properties.arrivals}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.arrivalsStatus >= 0 ?
                            <Icon
                                name="arrow-upward"
                                color="#60D29D"
                                size={18} />
                            :
                            <Icon
                                name="arrow-downward"
                                color="#FF5454"
                                size={18} />
                        }
                        <Text style={[styles.text, { color: "#FE38F2" }]}>
                            {properties.arrivalsStatus}
                        </Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}