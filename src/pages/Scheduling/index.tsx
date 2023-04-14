import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { StackParams } from "../../types/stack.params";
import { SchedulingStyles as styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useContext } from "react";
import { Context } from "../../context";
import { SchedulingList } from "../../components/lists/scheduling";
import { SchedulingHeader } from "../../components/headers/scheduling";

interface Properties extends StackScreenProps<StackParams, "Scheduling"> { }

export default function Scheduling({ navigation }: Properties) {
    const context = useContext(Context)

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <SchedulingHeader
                    total={2}
                    totalStatus={100}
                    predicted={1}
                    predictedStatus={25}
                    absences={0}
                    absencesStatus={-20}
                    arrivals={1}
                    arrivalsStatus={50} />
            </View>
            <View style={styles.bottom}>
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
                        <Text style={styles.overview_1}>Hoje</Text>
                        <Text style={styles.overview_2}>Próximo Atendimento</Text>
                        <Text style={styles.overview_3}>CLIENTE TESTE 3</Text>
                    </View>
                </View>
                <View style={styles.list}>
                    <SchedulingList data={context.costumers} />
                </View>
            </View>
            <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
        </View>
    )
}