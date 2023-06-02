import { View, Text } from "react-native";
import { SchedulingItemStyles as styles } from "./styles";
import { Schedule } from "../../../../models/schedule.model";
import {
  MaterialIcons as Icon,
  MaterialCommunityIcons as Icons,
} from "@expo/vector-icons";
import { adjustPhone, adjustTime, onPressPhoneCall, onPressWhatsApp } from "../../../../services/phone.service";

export function SchedulingItem({ data }: { data: Schedule }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.code}>{data.id}</Text>
        <View
          style={[
            styles.box,
            {
              backgroundColor:
                data.situacao == "Chegou" ? "#00B81F" : "#C00404",
            },
          ]}>
          <Text style={[styles.costumer, { color: "white" }]}>
            {adjustTime(data.horaInicial)}
          </Text>
        </View>
        <View
          style={[
            styles.box,
            {
              backgroundColor:
                data.situacao == "Previsto" ? "#FE38F2" : "#00B81F",
            },
          ]}>
          <Text style={[styles.costumer, { color: "white" }]}>
            {adjustTime(data.horaFinal)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            right: 0,
            gap: 32,
          }}>
          {data.telefone ?
            <>
              <Icon
                name="phone"
                color="#73186D"
                size={24}
                onPress={() => {
                  onPressPhoneCall(data.telefone);
                }} />
              <Icons
                name="whatsapp"
                color="green"
                size={24}
                onPress={() => {
                  onPressWhatsApp(data.telefone, data.nomeCliente, data.horaInicial);
                }} />
            </>
            : undefined}
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.costumer}>{data.nomeCliente.trim()}</Text>
        <Text style={styles.code}>{adjustPhone(data.telefone)}</Text>
      </View>
    </View>
  );
}
