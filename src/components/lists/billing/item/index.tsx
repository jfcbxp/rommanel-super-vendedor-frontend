import { View, Text } from "react-native";
import { BillingItemStyles as styles } from "./styles";
import { BillingModel } from "../../../../models/billing.model";

export function BillingItem({ data }: { data: BillingModel }) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.code}>{data.id}</Text>
                <View
                    style={[styles.box,
                    { backgroundColor: "#00B81F" }
                    ]}>
                    <Text style={[styles.costumer, { color: "white" }]}>{data.tipoOrcamento}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.costumer}>{data.nomeCliente}</Text>
                <Text style={styles.code}>R$ {data.total.toFixed(2).replace(".", ",")}</Text>
            </View>
        </View>
    )
}