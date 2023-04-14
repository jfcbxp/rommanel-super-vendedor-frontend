import { View, Text } from "react-native";
import { WalletItemStyles as styles } from "./styles";
import { Costumer } from "../../../../models/costumer.model";

export function WalletItem({ data }: { data: Costumer }) {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.code}>{data.code}</Text>
                <View
                    style={[styles.box,
                    { backgroundColor: data.status == "Ativo" ? "#00B81F" : "#C00404" }
                    ]}>
                    <Text style={[styles.costumer,{ color: "white" }]}>{data.status}</Text>
                </View>
                <View
                    style={[styles.box,
                    { backgroundColor: data.status == "Ativo" ? "#00B81F" : "#C00404" }
                    ]}>
                    <Text style={[styles.costumer,{ color: "white" }]}>{data.type}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.costumer}>{data.fullName}</Text>
                <Text style={styles.code}>R$ {data.value.toFixed(2).replace(".", ",")}</Text>
            </View>
        </View>
    )
}