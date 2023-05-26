import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { StackParams } from "../../types/stack.params";
import { BillingStyles as styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { BillingHeader } from "../../components/headers/billing";
import { BillingList } from "../../components/lists/billing";
import { BillingProgress } from "../../models/billing.progress.model";
import { useBillingDailyTotalizer } from "../../services/billing.totalizer.service";
import { DailyTotalizer } from "../../models/daily.totalizer.model";
import { AlternateLoading } from "../../components/modals/loading";

interface Properties extends StackScreenProps<StackParams, "Billing"> { }

export default function Billing({ navigation }: Properties) {
  const context = useContext(Context);
  let DATA = context.billingProgresses;
  const [data, setData] = useState<BillingProgress[] | undefined>();
  const [element, setElement] = useState<BillingProgress>();
  const [dailyTotalizer, setDailyTotalizer] = useState<DailyTotalizer>();
  let item = context.billingTitle;
  const billingDailyTotalizer = useBillingDailyTotalizer();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // context.showDialog("Nada consta", "Nenhum dado para ser exibido")
  }, []);

  useEffect(() => {
    const init = async () => {
      if (!DATA) {
        await context.getBillingProgresses();
      }
    };
    init().catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const init = async () => {
      await handleBillingProgresses(DATA);
      await handleChangeItem(DATA, item);
    };
    if (context.billingProgresses) {
      init().catch((error) => console.error(error));
    }
  }, [DATA, context.billingTitle]);

  const handleBillingProgresses = async (
    DATA: BillingProgress[] | undefined
  ) => {
    setLoading(true);
    if (DATA) {
      let data: BillingProgress[] = [];
      DATA.forEach((element) => {
        data.push(element);
      });
      if (data.length > 0) {
        let _item = data[data.length - 1].periodo;
        let element = data.find((element) => element.periodo == _item)!;
        element.selected = true;
        setElement(element);
        let index = data.findIndex((element) => element.periodo == _item);
        data[index] = element;
        setData(data);
        await context.getBilling(_item);
        await getDailyTotalizer(_item);
      }
    }
    setLoading(false);
  };

  const handleChangeItem = async (
    DATA: BillingProgress[] | undefined,
    _item?: string
  ) => {
    setLoading(true);
    if (DATA && _item) {
      let data: BillingProgress[] = [];
      DATA.forEach((element) => {
        data.push(element);
      });
      let _element = data.find((element) => element.periodo == _item)!;
      DATA.forEach((element) => {
        element.selected = false;
      });
      _element.selected = true;
      setElement(_element);
      let index = data.findIndex((element) => element.periodo == _item);
      data[index] = _element;
      setData(data);
      await context.getBilling(_item);
      await getDailyTotalizer(_item);
    }
    setLoading(false);
  };

  const getDailyTotalizer = async (date: string) => {
    await billingDailyTotalizer
      .get(context.user?.sub!, date, context.token?.token!)
      .then((_dailyTotalizer) => {
        setDailyTotalizer(_dailyTotalizer);
      });
  };

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

  let liquido = dailyTotalizer ? checkZeros(dailyTotalizer.liquido.toLocaleString("pt-BR")) : 0

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <BillingHeader data={data} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.overview}>
          <View style={{ flex: 1 }}>
            <Icon
              name="bar-chart"
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
          <View style={{ flex: 3 }}>
            <Text style={styles.overview_1}>{element?.periodo}</Text>
            <View style={styles.overview_box}>
              {dailyTotalizer ? (
                <Text style={styles.overview_2}>R$ {liquido}</Text>
              ) : undefined}
              {false ? (
                <View style={styles.overview_inner_box}>
                  <Icon name="arrow-upward" color="#60D29D" size={18} />
                  <Text style={styles.overview_3}>10%</Text>
                </View>
              ) : undefined}
            </View>
          </View>
        </View>
        <View style={styles.list}>
          <BillingList data={context.billings} />
        </View>
      </View>
      <AlternateLoading visible={loading} />
      <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
    </View>
  );
}
