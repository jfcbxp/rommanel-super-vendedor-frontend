import { StackScreenProps } from "@react-navigation/stack";
import { View } from "react-native";
import { StackParams } from "../../types/stack.params";
import { WalletStyles as styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { Picker } from "../../components/buttons/picker";
import { ItemType } from "react-native-dropdown-picker";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import { WalletHeader } from "../../components/headers/wallet";
import { WalletList } from "../../components/lists/wallet";

interface Properties extends StackScreenProps<StackParams, "Wallet"> {}

export default function Wallet({ navigation }: Properties) {
  const context = useContext(Context);
  const [items, setItems] = useState<ItemType<any>[]>();
  const [value, setValue] = useState("Todos");
  const [open, setOpen] = useState(false);
  const DATA = context.wallets;
  const [data, setData] = useState(DATA);

  useEffect(() => {
    const init = async () => {
      await context.getWallets().then((_) => handlePicker());
    };
    init().catch((error) => console.error(error));
  }, []);

  const handlePicker = () => {
    let _data = [
      "Todos",
      "Ativo",
      "Pre Inativo 1 60 dias sem compras",
      "Pre Inativo 2 70 dias sem compras",
      "Pre Inativo 3 80 dias sem compras",
      "Bloqueado media de vendas",
      "Bloqueado 90 dias sem compras",
      "Bloqueado 150 dias sem compras",
    ];
    let array: ItemType<any>[] = [];
    Object.entries(_data).forEach(([key, value]) => {
      array = [
        ...array,
        {
          value: value,
          label: value,
        },
      ];
    });
    setItems(array);
  };

  const handleFilter = () => {
    if (DATA) {
      if (value == "Todos" || value == "") {
        setData(DATA);
      } else {
        setData(
          DATA.filter((element) => {
            return element.situacao.includes(value);
          })
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <WalletHeader
          total={context.activesTotalizer?.total!}
          total_={context.inactivesTotalizer?.total!}
          actives={context.activesTotalizer?.ativos!}
          actives_={context.inactivesTotalizer?.ativos!}
          preInactives={context.activesTotalizer?.preInativos!}
          preInactives_={context.inactivesTotalizer?.preInativos!}
          inactives={context.activesTotalizer?.inativos!}
          inactives_={context.inactivesTotalizer?.inativos!}
        />
      </View>
      <View style={styles.bottom}>
        <View style={styles.overview}>
          <View style={{ width: "90%" }}>
            <Picker
              items={items ? items : []}
              value={value}
              setValue={setValue}
              open={open}
              setOpen={setOpen}
              onChangeValue={handleFilter}
              placeholder="Todos"
            />
          </View>
        </View>
        <View style={styles.list}>
          <WalletList data={data} />
        </View>
      </View>
      <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
    </View>
  );
}
