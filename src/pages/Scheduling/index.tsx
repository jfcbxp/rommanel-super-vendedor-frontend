import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { StackParams } from "../../types/stack.params";
import { SchedulingStyles as styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { SchedulingList } from "../../components/lists/scheduling";
import { SchedulingHeader } from "../../components/headers/scheduling";

interface Properties extends StackScreenProps<StackParams, "Scheduling"> { }

export default function Scheduling({ navigation }: Properties) {
    const context = useContext(Context)

    useEffect(() => {
        context.getSchedules()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <SchedulingHeader
                    dailyTotal={context.dailyTotalizer?.total ? context.dailyTotalizer?.total : 0}
                    monthlyTotal={context.monthlyTotalizer?.total ? context.monthlyTotalizer.total : 0}
                    dailyPredicted={context.dailyTotalizer?.previstos ? context.dailyTotalizer.previstos : 0}
                    monthlyPredicted={context.monthlyTotalizer?.previstos ? context.monthlyTotalizer.previstos : 0}
                    dailyAbsences={context.dailyTotalizer?.faltas ? context.dailyTotalizer.faltas : 0}
                    monthlyAbsences={context.monthlyTotalizer?.faltas ? context.monthlyTotalizer.faltas : 0}
                    dailyArrivals={context.dailyTotalizer?.chegadas ? context.dailyTotalizer.chegadas : 0}
                    monthlyArrivals={context.monthlyTotalizer?.chegadas ? context.monthlyTotalizer.chegadas : 0} />
            </View>
            <View style={styles.bottom}>
                {false ?
                    <View style={styles.overview}>
                        <View style={{ flex: 1 }}>
                            <Icon
                                name="schedule"
                                color="white"
                                size={36}
                                style={{
                                    padding: 8,
                                    backgroundColor: "#FE38F2",
                                    borderRadius: 90,
                                    alignSelf: "center",
                                }} />
                        </View>
                        <View style={{ flex: 3, justifyContent: "space-around" }}>
                            <Text style={styles.overview_1}></Text>
                            <Text style={styles.overview_2}></Text>
                            <Text style={styles.overview_3}></Text>
                        </View>
                    </View>
                    : undefined
                }
                <View style={styles.list}>
                    <SchedulingList data={context.schedules} />
                </View>
            </View>
            <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
        </View>
    )
}