import { Text, View } from "react-native";
import { ProgressBarStyles as styles } from "./styles";
import { MaterialIcons as Icon } from "@expo/vector-icons";

interface Properties {
  title: string;
  step: number;
  steps: number;
  period?: string;
  type: "number" | "money" | "date";
}

export function ProgressBar(properties: Properties) {
  if (!properties) {
    properties = {
      title: "",
      step: 0,
      steps: 0,
      period: "nada consta",
      type: "number"
    }
  }
  const progress = (properties.step * 100) / properties.steps + "%";
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {properties.step >= properties.steps ?
          <Icon name="check-box" color="#73186D" size={32} />
          :
          <Icon name="check-box-outline-blank" color="#73186D" size={32} />
        }
      </View>
      <View style={styles.bar}>
        <View style={styles.titles}>
          <Text style={styles.title}>{properties.title}</Text>
          {properties.type == "money" || properties.type == "date" ? (
            <Text style={styles.subTitle}>
              {properties.type == "money"
                ? `R$ ${properties.step.toLocaleString(
                    "pt-BR"
                  )} / R$ ${properties.steps.toLocaleString("pt-BR")}`
                : undefined}
              {properties.type == "date" ? `${properties.period}` : undefined}
            </Text>
          ) : (
            <Text style={styles.subTitle}>
              {properties.step} / {properties.steps}
            </Text>
          )}
        </View>
        <View style={styles.progressBar}>
          <View
            style={{
              width: "100%",
              height: 6,
              backgroundColor: "#E0CCDC",
            }}
          >
            <View
              style={{
                width: progress,
                height: 6,
                backgroundColor: "#73186D",
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
