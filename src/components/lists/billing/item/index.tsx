import { View, Text } from "react-native";
import { BillingItemStyles as styles } from "./styles";
import { BillingModel } from "../../../../models/billing.model";

export function BillingItem({ data }: { data: BillingModel }) {
  let total = data.total.toLocaleString("pt-BR")
  let valorNCC = data.valorNCC.toLocaleString("pt-BR")
  let total_valorNCC = (data.total - data.valorNCC).toLocaleString("pt-BR")

  if (total.split(",")[1].length < 2) {
    total += "0"
  }

  if (valorNCC.split(",")[1].length < 2) {
    valorNCC += "0"
  }

  if (total_valorNCC.split(",")[1].length < 2) {
    total_valorNCC += "0"
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.code}>{data.id}</Text>
        <View style={[styles.box, { backgroundColor: "#00B81F" }]}>
          <Text style={[styles.costumer, { color: "white" }]}>
            {data.tipoOrcamento}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          <Text style={[styles.code, { color: "green" }]}>
            R$ {total}
          </Text>
          {data.valorNCC > 0 ? (
            <>
              <Text style={[styles.code, { color: "red" }]}>
                R$ {valorNCC}
              </Text>
              <Text style={styles.code}>
                R$ {total_valorNCC}
              </Text>
            </>
          ) : undefined}
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.costumer}>{data.nomeCliente}</Text>
      </View>
    </View>
  );
}
