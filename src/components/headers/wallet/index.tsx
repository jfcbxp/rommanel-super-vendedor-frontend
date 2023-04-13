import { View, Text } from "react-native";
import { Divider } from "../../divider";
import { WalletHeaderStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons";

interface Properties {
    actives: number
    activesStatus: number
    prospect: number
    prospectStatus: number
    inactives: number
    inactivesStatus: number
    reactives: number
    reactivesStatus: number
}

export function WalletHeader(properties: Properties) {
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Icon
                    name="check-box"
                    color="white"
                    size={36}
                    style={{
                        padding: 8,
                        backgroundColor: "#FE38F2",
                        borderRadius: 90,
                    }} />
                <Text style={styles.title}>Carteira de Clientes</Text>
            </View>
            <View style={styles.field}>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Ativos</Text>
                    <Text style={[styles.text, { fontSize: 32 }]}>{properties.actives}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.activesStatus >= 0 ?
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
                            {properties.activesStatus + "%"}
                        </Text>
                        <Text style={styles.text}> último mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Prospecto</Text>
                    <Text style={[styles.text, { fontSize: 32 }]}>{properties.prospect}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.prospectStatus >= 0 ?
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
                            {properties.prospectStatus + "%"}
                        </Text>
                        <Text style={styles.text}> último mês</Text>
                    </View>
                </View>
            </View>
            <Divider />
            <View style={styles.field}>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Inativos</Text>
                    <Text style={[styles.text, { fontSize: 32 }]}>{properties.inactives}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.inactivesStatus >= 0 ?
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
                            {properties.inactivesStatus + "%"}
                        </Text>
                        <Text style={styles.text}> último mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Reativos</Text>
                    <Text style={[styles.text, { fontSize: 32 }]}>{properties.reactives}</Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.reactivesStatus >= 0 ?
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
                            {properties.reactivesStatus + "%"}
                        </Text>
                        <Text style={styles.text}> último mês</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}