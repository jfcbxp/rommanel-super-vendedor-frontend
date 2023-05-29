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
import { WalletStatusEnum } from "../../enums/wallet.status.enum";
import { useWalletService } from "../../services/wallet.service";
import { Wallet as WalletModel } from "../../models/wallet.model";
import { WalletTotalizer } from "../../models/wallet.totalizer.model";
import { useWalletWalletTotalizerService } from "../../services/wallet.totalizers.service";
interface Properties extends StackScreenProps<StackParams, "Wallet"> {}

export default function Wallet({ navigation }: Properties) {
  const context = useContext(Context);
  const [items, setItems] = useState<ItemType<WalletStatusEnum>[]>();
  const [value, setValue] = useState(WalletStatusEnum.ATIVO);
  const [open, setOpen] = useState(false);
  const [wallets, setWallets] = useState<WalletModel[]>();
  const [walletsReponse, setWalletsResponse] = useState<WalletModel[]>();
  const [activesTotalizer, setActivesTotalizer] = useState<WalletTotalizer>();
  const [inactivesTotalizer, setInactivesTotalizer] =
    useState<WalletTotalizer>();
  const walletService = useWalletService();
  const walletTotalizerService = useWalletWalletTotalizerService();

  useEffect(() => {
    context.startLoading();
    init()
      .finally(() => context.stopLoading())
      .catch(() => context.showDialog());
  }, []);

  const init = async () => {
    await context.isUserAuthenticated().then(async (auth) => {
      if (auth) {
        await Promise.all([
          walletService.get(context.user?.sub!, auth.token),
          walletTotalizerService.getActives(context.user?.sub!, auth.token),
          walletTotalizerService.getInactives(context.user?.sub!, auth.token),
        ]).then(async ([walletResponse, activesResponse, inactiveResponse]) => {
          if (!walletResponse.length) {
            context.showDialog();
          } else {
            setWallets(walletResponse);
            setWalletsResponse(walletResponse);
            setActivesTotalizer(activesResponse);
            setInactivesTotalizer(inactiveResponse);
            handlePicker();
          }
        });
      }
    });
  };

  const handlePicker = () => {
    setItems(
      Object.entries(WalletStatusEnum).flatMap(
        (stat): ItemType<WalletStatusEnum> => {
          return { value: stat[1], label: stat[1] };
        }
      )
    );
  };

  const handleFilter = () => {
    if (walletsReponse) {
      if (value == WalletStatusEnum.TODOS) {
        setWallets(walletsReponse);
      } else {
        setWallets(
          walletsReponse.filter((element) => {
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
          total={activesTotalizer?.total!}
          total_={inactivesTotalizer?.total!}
          actives={activesTotalizer?.ativos!}
          actives_={inactivesTotalizer?.ativos!}
          preInactives={activesTotalizer?.preInativos!}
          preInactives_={inactivesTotalizer?.preInativos!}
          inactives={activesTotalizer?.inativos!}
          inactives_={inactivesTotalizer?.inativos!}
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
          <WalletList data={wallets} />
        </View>
      </View>
      <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
    </View>
  );
}
