import { View, Text, Linking } from "react-native";
import { WalletItemStyles as styles } from "./styles";
import { Wallet } from "../../../../models/wallet.model";
import {
  MaterialIcons as Icon,
  MaterialCommunityIcons as Icons,
} from "@expo/vector-icons";

export function WalletItem({ data }: { data: Wallet }) {
  const adjustPhone = (phone: string) => {
    phone = phone.trim().replace(/\s/g, '').replace("-", "");
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
    } else {
      return phone
    }
    return pattern;
  };

  const onPressWhatsApp = (phone: string) => {
    phone = phone.trim().replace(/\s/g, '').replace("-", "");
    if (phone.startsWith("0")) {
      phone = phone.slice(1);
    }
    phone = `55${phone}`;
    let text = `Olá *${data.nomeCliente}*`;
    const link = async () => {
      await Linking.canOpenURL(`whatsapp://send?text=${text}`).then((suppoted) => {
        if (suppoted) {
          return Linking.openURL(`whatsapp://send?phone=${phone}&text=${text}`);
        } else {
          return Linking.openURL(
            `https://api.whatsapp.com/send?phone=${phone}&text=${text}`
          );
        }
      });
    }
    link().catch(error => console.error(error))
  };

  const onPressPhoneCall = (phone: string) => {
    phone = phone.trim().replace(/\s/g, '').replace("-", "");
    if (phone.startsWith("0")) {
      phone = phone.slice(1);
    }
    const link = async () => {
      await Linking.openURL(`tel:${phone}`);
    }
    link().catch(error => console.error(error))
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
                  onPressWhatsApp(data.telefone);
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
