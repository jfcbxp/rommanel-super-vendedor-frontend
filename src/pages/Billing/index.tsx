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

interface Properties extends StackScreenProps<StackParams, "Billing"> { }

type DATA = {
    date: string
    bill: number
    selected: boolean
}

export default function Billing({ route, navigation }: Properties) {
    const { item } = route.params
    const context = useContext(Context)
    const _DATA: DATA[] = [
        { date: "01/03/2023", bill: 200, selected: false },
        { date: "02/03/2023", bill: 400, selected: false },
        { date: "03/03/2023", bill: 500, selected: false },
        { date: "04/03/2023", bill: 300, selected: false },
        { date: "05/03/2023", bill: 200, selected: false },
        { date: "06/03/2023", bill: 500, selected: false },
        { date: "07/03/2023", bill: 600, selected: false },
        { date: "08/03/2023", bill: 300, selected: false },
        { date: "09/03/2023", bill: 200, selected: false },
        { date: "10/03/2023", bill: 400, selected: false },
        { date: "11/03/2023", bill: 500, selected: false },
        { date: "12/03/2023", bill: 600, selected: false },
        { date: "13/03/2023", bill: 600, selected: false },
        { date: "14/03/2023", bill: 700, selected: false },
        { date: "15/03/2023", bill: 900, selected: false },
        { date: "16/03/2023", bill: 1000, selected: false },
        { date: "17/03/2023", bill: 400, selected: false },
        { date: "18/03/2023", bill: 300, selected: false },
        { date: "19/03/2023", bill: 200, selected: false },
        { date: "20/03/2023", bill: 100, selected: false },
        { date: "21/03/2023", bill: 500, selected: false },
        { date: "22/03/2023", bill: 400, selected: false },
        { date: "23/03/2023", bill: 400, selected: false },
        { date: "24/03/2023", bill: 500, selected: false },
        { date: "25/03/2023", bill: 400, selected: false },
        { date: "26/03/2023", bill: 500, selected: false },
        { date: "27/03/2023", bill: 600, selected: false },
        { date: "28/03/2023", bill: 600, selected: false },
        { date: "29/03/2023", bill: 400, selected: false },
        { date: "30/03/2023", bill: 400, selected: false },
        { date: "31/03/2023", bill: 300, selected: false },
    ]
    const [data, setData] = useState<DATA[]>()
    const [element, setElement] = useState<DATA>()

    useEffect(() => {
        setData(_DATA)
        let data = [..._DATA]
        if (!item) {
            let _item = data[0].date
            let element = data.find(element => element.date == _item)!
            element.selected = true
            setElement(element)
            let index = data.findIndex(element => element.date == _item)
            data[index] = element
            setData(data)
        } else {
            let element = data.find(element => element.date == item)!
            element.selected = true
            setElement(element)
            let index = data.findIndex(element => element.date == item)
            data[index] = element
            setData(data)
        }
        setData(data)
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
                        <Text style={styles.overview_1}>{element?.date}</Text>
                        <View style={styles.overview_box}>
                            <Text style={styles.overview_2}>R$ {element?.bill.toFixed(2).replace(".", ",")}</Text>
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
                    <BillingList data={context.costumers} />
                </View>
            </View>
            <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
        </View>
    )
}