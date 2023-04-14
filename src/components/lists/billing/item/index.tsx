import { View, Text } from "react-native";
import { BillingItemStyles as styles } from "./styles";
import { Costumer } from "../../../../models/costumer.model";

export function BillingItem({ data }: { data: Costumer }) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.code}>{data.code}</Text>
                <View
                    style={[styles.box,
                    { backgroundColor: data.service == "WhatsApp" ? "#00B81F" : "#C00404" }
                    ]}>
                    <Text style={[styles.costumer,{ color: "white" }]}>{data.service}</Text>
                </View>
                <View
                    style={[styles.box,
                    { backgroundColor: data.service == "Normal" ? "#C00404" : "#00B81F" }
                    ]}>
                    <Text style={[styles.costumer,{ color: "white" }]}>{data.type}</Text>
                </View>
                <View
                    style={[styles.box,
                    { backgroundColor: data.service == "WhatsApp" ? "#00B81F" : "#C00404" }
                    ]}>
                    <Text style={[styles.costumer,{ color: "white" }]}>{data.task}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.costumer}>{data.fullName}</Text>
                <Text style={styles.code}>R$ {data.value.toFixed(2).replace(".", ",")}</Text>
            </View>
        </View>
    )
}