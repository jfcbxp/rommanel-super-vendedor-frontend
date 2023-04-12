import { Text, View } from "react-native";
import { ProgressBarStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons"

interface Properties {
    title: string
    step: number
    steps: number
    type: "number" | "money"
}

export function ProgressBar(properties: Properties) {
    const progress = ((properties.step * 100) / properties.steps) + "%"
    return (
        <View style={styles.container}>
            <View style={styles.icon}>
                {properties.step >= properties.steps ?
                    <Icon
                        name="check-box"
                        color="#73186D"
                        size={32} />
                    :
                    <Icon
                        name="check-box-outline-blank"
                        color="#73186D"
                        size={32} />
                }
            </View>
            <View style={styles.bar}>
                <View style={styles.titles}>
                    <Text style={styles.title}>{properties.title}</Text>
                    {properties.type == "money" ?
                        <Text style={styles.subTitle}>R$ {properties.steps.toFixed(2).replace(".", ",")}</Text>
                        :
                        <Text style={styles.subTitle}>{properties.steps}</Text>
                    }
                </View>
                <View style={styles.progressBar}>
                    <View style={{
                        width: "100%",
                        height: 6,
                        backgroundColor: "#E0CCDC"
                    }}>
                        <View style={{
                            width: progress,
                            height: 6,
                            backgroundColor: "#73186D"
                        }} />
                    </View>
                </View>
            </View>
        </View>
    )
}