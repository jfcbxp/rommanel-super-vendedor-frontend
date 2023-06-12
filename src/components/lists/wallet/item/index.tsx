import { View, Text, TouchableOpacity } from "react-native";
import { WalletItemStyles as styles } from "./styles";
import { Wallet } from "../../../../models/wallet.model";
import { adjustPhone } from "../../../../services/phone.service";
import { shorten } from "../../../../services/shorten.service";
import { IconsStyles } from "../../../icons/styles";
import { ContactIcons } from "../../../icons";

export function WalletItem({ data }: { data: Wallet }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => { }}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row", gap: 8 }}>
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
        </View>
        <Text style={styles.code}>{adjustPhone(data.telefone)}</Text>
      </View>
      <View style={styles.bottom}>
        <View>
          <Text style={styles.costumer}>{shorten(data.nomeCliente)}</Text>
          {data.nascimento ?
            <Text style={styles.costumer}>Nascimento: {data.nascimento}</Text>
            : undefined}
          {data.ultimaCompra ?
            <Text style={styles.costumer}>Última compra: {data.ultimaCompra}</Text>
            : undefined}
        </View>
        <View style={IconsStyles.icons}>
          {data.telefone ?
            <ContactIcons data={data} />
            : undefined}
        </View>
      </View>
    </TouchableOpacity>
  );
}
