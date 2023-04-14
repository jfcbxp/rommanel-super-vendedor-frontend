import { View, Text } from "react-native";
import { SchedulingItemStyles as styles } from "./styles";
import { Costumer } from "../../../../models/costumer.model";

export function SchedulingItem({ data }: { data: Costumer }) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.code}>{data.code}</Text>
                <View
                    style={[styles.box,
                    { backgroundColor: data.arrival == "Chegou" ? "#00B81F" : "#C00404" }
                    ]}>
                    <Text style={{ color: "white" }}>{data.schedule}</Text>
                </View>
                <View
                    style={[styles.box,
                    { backgroundColor: data.arrival == "Previsto" ? "#FE38F2" : "#00B81F" }
                    ]}>
                    <Text style={{ color: "white" }}>{data.arrival}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.costumer}>{data.fullName}</Text>
                <Text style={styles.code}>{data.phone}</Text>
            </View>
        </View>
    )
}