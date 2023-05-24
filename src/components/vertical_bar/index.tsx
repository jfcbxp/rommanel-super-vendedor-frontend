import { Text, TouchableOpacity, View } from "react-native";
import { VerticalBarStyles as styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NavigationParams } from "../../types/navigation.params";

interface Properties {
  title: string;
  step: number;
  steps: number;
  selected: boolean;
}

export function VerticalBar(properties: Properties) {
  const progress = (properties.step * 100) / properties.steps + "%";
  const navigation = useNavigation<NavigationParams>();
  let day = properties.title.slice(0, 2);
  if (day.startsWith("0")) {
    day = day.substring(1);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Billing", { item: properties.title })
        }
        style={[styles.bar, { height: progress }]}
      >
        {properties.selected ? <View style={styles.selected} /> : undefined}
      </TouchableOpacity>
      <Text style={styles.title}>{day}</Text>
    </View>
  );
}
