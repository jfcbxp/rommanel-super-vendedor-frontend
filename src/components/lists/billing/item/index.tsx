import { View, Text } from "react-native";
import { BillingItemStyles as styles } from "./styles";
import { BillingModel } from "../../../../models/billing.model";

export function BillingItem({ data }: { data: BillingModel }) {
  const checkZeros = (currency: string) => {
    if (!currency.includes(",")) {
      currency = `${currency},00`
    } else {
      if (currency.split(",")[1].length < 2) {
        currency = `${currency}0`
      }
    }
    return currency
  }

  let total = checkZeros(data.total.toLocaleString("pt-BR"))
  let valorNCC = checkZeros(data.valorNCC.toLocaleString("pt-BR"))
  let total_valorNCC = checkZeros((data.total - data.valorNCC).toLocaleString("pt-BR"))

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
