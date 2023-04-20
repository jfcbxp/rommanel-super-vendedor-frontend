import { View, Text } from "react-native";
import { Divider } from "../../divider";
import { WalletHeaderStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NavigationParams } from "../../../types/navigation.params";

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
    const navigation = useNavigation<NavigationParams>()

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Icon
                    name="chevron-left"
                    color="white"
                    size={48}
                    onPress={() => { navigation.navigate("Home") }} />
                <Text style={styles.title}>Carteira de Clientes</Text>
            </View>
            <View style={styles.field}>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Ativos</Text>
                    <Text style={[styles.text, { fontSize: 20}]}>
                        {properties.actives}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.activesStatus >= 0 ?
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
                            {properties.activesStatus + "%"}
                        </Text>
                        <Text style={styles.text}> último mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Prospecto</Text>
                    <Text style={[styles.text, { fontSize: 20}]}>
                        {properties.prospect}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.prospectStatus >= 0 ?
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
                    <Text style={[styles.text, { fontSize: 20 }]}>
                        {properties.inactives}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                        {properties.inactivesStatus >= 0 ?
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
                            {properties.inactivesStatus + "%"}
                        </Text>
                        <Text style={styles.text}> último mês</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "space-around" }}>
                    <Text style={styles.text}>Reativos</Text>
                    <Text style={[styles.text, { fontSize: 20 }]}>
                        {properties.reactives}
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        {properties.reactivesStatus >= 0 ?
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
                            {properties.reactivesStatus + "%"}
                        </Text>
                        <Text style={styles.text}> último mês</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}