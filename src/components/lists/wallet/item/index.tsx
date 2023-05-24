import { View, Text, Linking } from "react-native";
import { WalletItemStyles as styles } from "./styles";
import { Wallet } from "../../../../models/wallet.model";
import {
  MaterialIcons as Icon,
  MaterialCommunityIcons as Icons,
} from "@expo/vector-icons";

export function WalletItem({ data }: { data: Wallet }) {
  const adjustPhone = (phone: string) => {
    phone = phone.trim().replace(" ", "").replace("-", "");
    phone = phone.startsWith("0") ? phone.slice(1) : phone;
    let ddd = "";
    let _phone = "";
    let phone_ = "";
    let pattern = "";
    if (phone.length == 11) {
      ddd = phone.slice(0, 2);
      _phone = phone.slice(2, 7);
      phone_ = phone.slice(7, 11);
      pattern = `(${ddd}) ${_phone}-${phone_}`;
    } else if (phone.length == 10) {
      ddd = phone.slice(0, 2);
      _phone = phone.slice(2, 6);
      phone_ = phone.slice(6, 10);
      pattern = `(${ddd}) 9${_phone}-${phone_}`;
    }
    return pattern;
  };

  const onPressWhatsApp = (phone: string) => {
    phone = phone.trim().replace(" ", "").replace("-", "");
    if (phone.startsWith("0")) {
      phone = phone.slice(1);
    }
    phone = `55${phone}`;
    let text = `Olá *${data.nomeCliente}*`;
    Linking.canOpenURL(`whatsapp://send?text=${text}`).then((suppoted) => {
      if (suppoted) {
        return Linking.openURL(`whatsapp://send?phone=${phone}&text=${text}`);
      } else {
        return Linking.openURL(
          `https://api.whatsapp.com/send?phone=${phone}&text=${text}`
        );
      }
    });
  };

  const onPressPhoneCall = (phone: string) => {
    phone = phone.trim().replace(" ", "").replace("-", "");
    if (phone.startsWith("0")) {
      phone = phone.slice(1);
    }
    Linking.openURL(`tel:${phone}`);
  };

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
          ]}
        >
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
          }}
        >
          <Icon
            name="phone"
            color="#73186D"
            size={24}
            onPress={() => {
              onPressPhoneCall(data.telefone);
            }}
          />
          <Icons
            name="whatsapp"
            color="green"
            size={24}
            onPress={() => {
              onPressWhatsApp(data.telefone);
            }}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.costumer}>{data.nomeCliente}</Text>
        <Text style={styles.code}>{adjustPhone(data.telefone)}</Text>
      </View>
    </View>
  );
}
