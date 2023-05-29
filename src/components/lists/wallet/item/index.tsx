import { View, Text } from "react-native";
import { WalletItemStyles as styles } from "./styles";
import { Wallet } from "../../../../models/wallet.model";
import {
  MaterialIcons as Icon,
  MaterialCommunityIcons as Icons,
} from "@expo/vector-icons";
import { adjustPhone, onPressPhoneCall, onPressWhatsApp } from "../../../../services/phone.service";

export function WalletItem({ data }: { data: Wallet }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.code}>{data.id}</Text>
        <View
          style={[
            styles.box,
            {
              backgroundColor: data.situacao == "Ativo" ? "#00B81F" : "#C00404",
            },
          ]}>
          <Text style={[styles.costumer, { color: "white" }]}>
            {data.situacao}
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
                  onPressWhatsApp(data.telefone, data.nomeCliente);
                }} />
            </>
            : undefined}
        </View>
      </View>
      <View style={styles.bottom}>
        <View>
          <Text style={styles.costumer}>{data.nomeCliente}</Text>
          {data.ultimaCompra ?
            <Text style={styles.costumer}>Última compra: {data.ultimaCompra}</Text>
            : undefined}
        </View>
        <Text style={styles.code}>{adjustPhone(data.telefone)}</Text>
      </View>
    </View>
  );
}
