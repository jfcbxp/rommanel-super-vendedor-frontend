import { View, Text } from "react-native";
import { Divider } from "../../divider";
import { SchedulingHeaderStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons";

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
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Icon
                    name="schedule"
                    color="white"
                    size={36}
                    style={{
                        padding: 8,
                        backgroundColor: "#FE38F2",
                        borderRadius: 90,
                    }} />
                <Text style={styles.title}>Agendamentos</Text>
            </View>
            <View style={styles.field}>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Total</Text>
                    <Text style={[styles.text, { fontSize: 32 }]}>{properties.total}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.totalStatus >= 0 ?
                            <Icon
                                name="arrow-upward"
                                color="#60D29D"
                                size={24} />
                            :
                            <Icon
                                name="arrow-downward"
                                color="#FF5454"
                                size={24} />
                        }
                        <Text style={[styles.text, { color: "#FE38F2" }]}>
                            {properties.totalStatus}
                        </Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Previstos</Text>
                    <Text style={[styles.text, { fontSize: 32 }]}>{properties.predicted}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.predictedStatus >= 0 ?
                            <Icon
                                name="arrow-upward"
                                color="#60D29D"
                                size={24} />
                            :
                            <Icon
                                name="arrow-downward"
                                color="#FF5454"
                                size={24} />
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
                    <Text style={[styles.text, { fontSize: 32 }]}>{properties.absences}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.absencesStatus >= 0 ?
                            <Icon
                                name="arrow-upward"
                                color="#60D29D"
                                size={24} />
                            :
                            <Icon
                                name="arrow-downward"
                                color="#FF5454"
                                size={24} />
                        }
                        <Text style={[styles.text, { color: "#FE38F2" }]}>
                            {properties.absencesStatus}
                        </Text>
                        <Text style={styles.text}> dentro do mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Chegaram</Text>
                    <Text style={[styles.text, { fontSize: 32 }]}>{properties.arrivals}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.arrivalsStatus >= 0 ?
                            <Icon
                                name="arrow-upward"
                                color="#60D29D"
                                size={24} />
                            :
                            <Icon
                                name="arrow-downward"
                                color="#FF5454"
                                size={24} />
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