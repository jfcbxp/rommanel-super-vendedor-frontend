import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { StackParams } from "../../types/stack.params";
import { SchedulingStyles as styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { SchedulingList } from "../../components/lists/scheduling";
import { SchedulingHeader } from "../../components/headers/scheduling";
import { useSchedulingService } from "../../services/scheduling.service";
import { SchedulingTotalizer } from "../../models/scheduling.totalizer.model";
import { Schedule } from "../../models/schedule.model";
import { useSchedulingTotalizerService } from "../../services/scheduling.totalizers.service";

interface Properties extends StackScreenProps<StackParams, "Scheduling"> { }

export default function Scheduling({ navigation }: Properties) {
  const context = useContext(Context);
  const [schedules, setSchedules] = useState<Schedule[]>();
  const [dailyTotalizer, setDailyTotalizer] = useState<SchedulingTotalizer>();
  const [monthlyTotalizer, setMonthlyTotalizer] =
    useState<SchedulingTotalizer>();
  const schedulingService = useSchedulingService();
  const schedulingTotalizerService = useSchedulingTotalizerService();

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      context.startLoading()
      init()
        .finally(context.stopLoading)
    });
    return focusListener;
  }, [navigation]);

  const init = async () => {
    await Promise.all([
      schedulingService.get(context.user?.sub!),
      schedulingTotalizerService.getDaily(context.user?.sub!),
      schedulingTotalizerService.getMontly(context.user?.sub!),
    ]).then(async ([_schedules, _dailyTotalizer, _monthlyTotalizer]) => {
      if (!_schedules.length || !_dailyTotalizer || !_monthlyTotalizer) {
        context.showDialog("noData");
      } else {
        setSchedules(_schedules);
        setDailyTotalizer(_dailyTotalizer);
        setMonthlyTotalizer(_monthlyTotalizer);
      }
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <SchedulingHeader
          dailyTotal={dailyTotalizer?.total!}
          monthlyTotal={monthlyTotalizer?.total!}
          dailyPredicted={dailyTotalizer?.previstos!}
          monthlyPredicted={monthlyTotalizer?.previstos!}
          dailyAbsences={dailyTotalizer?.faltas!}
          monthlyAbsences={monthlyTotalizer?.faltas!}
          dailyArrivals={dailyTotalizer?.chegadas!}
          monthlyArrivals={monthlyTotalizer?.chegadas!}
        />
      </View>
      <View style={styles.bottom}>
        {false ? (
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
                }}
              />
            </View>
            <View style={{ flex: 3, justifyContent: "space-around" }}>
              <Text style={styles.overview_1}></Text>
              <Text style={styles.overview_2}></Text>
              <Text style={styles.overview_3}></Text>
            </View>
          </View>
        ) : undefined}
        <View style={styles.list}>
          <SchedulingList data={schedules} />
        </View>
      </View>
      <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
    </View>
  );
}
