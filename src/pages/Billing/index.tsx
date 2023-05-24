import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { StackParams } from "../../types/stack.params";
import { BillingStyles as styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { BillingHeader } from "../../components/headers/billing";
import { BillingList } from "../../components/lists/billing";
import { BillingProgress } from "../../models/billing.progress.model";

interface Properties extends StackScreenProps<StackParams, "Billing"> { }

export default function Billing({ route, navigation }: Properties) {
    const { item } = route.params
    const context = useContext(Context)
    let DATA = context.billingProgresses
    const [data, setData] = useState(DATA)
    const [element, setElement] = useState<BillingProgress>()

    useEffect(() => {
        context.getBillingProgresses()
        if (DATA) {
            let data = [...DATA]
            if (!item) {
                let _item = data[data.length - 1].periodo
                let element = data.find(element => element.periodo == _item)!
                element.selected = true
                setElement(element)
                let index = data.findIndex(element => element.periodo == _item)
                data[index] = element
                setData(data)
                context.getBilling(_item)
            } else {
                let element = data.find(element => element.periodo == item)!
                element.selected = true
                setElement(element)
                let index = data.findIndex(element => element.periodo == item)
                data[index] = element
                setData(data)
                context.getBilling(item)
            }
        }
    }, [item])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <BillingHeader data={data} />
            </View>
            <View style={styles.bottom}>
                <View style={styles.overview}>
                    <View style={{ flex: 1 }}>
                        <Icon
                            name="bar-chart"
                            color="white"
                            size={36}
                            style={{
                                padding: 8,
                                backgroundColor: "#FE38F2",
                                borderRadius: 90,
                                alignSelf: "center",
                            }} />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.overview_1}>{element?.periodo}</Text>
                        <View style={styles.overview_box}>
                            <Text style={styles.overview_2}>R$ {element?.total.toFixed(2).replace(".", ",")}</Text>
                            <View style={styles.overview_inner_box}>
                                <Icon
                                    name="arrow-upward"
                                    color="#60D29D"
                                    size={18} />
                                <Text style={styles.overview_3}>10%</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.list}>
                    <BillingList data={context.billings} />
                </View>
            </View>
            <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
        </View>
    )
}