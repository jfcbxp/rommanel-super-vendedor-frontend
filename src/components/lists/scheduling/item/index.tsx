import { View, Text } from "react-native";
import { SchedulingItemStyles as styles } from "./styles";
import { Schedule } from "../../../../models/schedule.model";

export function SchedulingItem({ data }: { data: Schedule }) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.code}>{data.id}</Text>
                <View
                    style={[styles.box,
                    { backgroundColor: data.horaFinal == "Chegou" ? "#00B81F" : "#C00404" }
                    ]}>
                    <Text style={[styles.costumer, { color: "white" }]}>{data.horaFinal}</Text>
                </View>
                <View
                    style={[styles.box,
                    { backgroundColor: data.horaFinal == "Previsto" ? "#FE38F2" : "#00B81F" }
                    ]}>
                    <Text style={[styles.costumer, { color: "white" }]}>{data.horaFinal}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.costumer}>{data.nomeCliente}</Text>
                <Text style={styles.code}>{data.telefone}</Text>
            </View>
        </View>
    )
}