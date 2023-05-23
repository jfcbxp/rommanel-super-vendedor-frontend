import { StackScreenProps } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { StackParams } from "../../types/stack.params";
import { WalletStyles as styles } from "./styles";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Picker } from "../../components/buttons/picker";
import { ItemType } from "react-native-dropdown-picker";
import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import { WalletHeader } from "../../components/headers/wallet";
import { WalletList } from "../../components/lists/wallet";

interface Properties extends StackScreenProps<StackParams, "Wallet"> { }

export default function Wallet({ navigation }: Properties) {
    const context = useContext(Context)
    const [items, setItems] = useState<ItemType<any>[]>()
    const [value, setValue] = useState("")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        context.getWallets()
        let data = ["1", "2", "3", "4", "Todos"]
        if (data) {
            let array: ItemType<any>[] = []
            Object.entries(data).forEach(([key, value]) => {
                array = [
                    ...array,
                    {
                        value: value,
                        label: value
                    }
                ]
            })
            setItems(array)
        }
    }, [])

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
                    inactives_={context.inactivesTotalizer?.inativos!} />
            </View>
            <View style={styles.bottom}>
                {false ?
                    <View style={styles.overview}>
                        <Icon
                            name="remove-red-eye"
                            color="white"
                            size={36}
                            style={{
                                padding: 8,
                                backgroundColor: "#FE38F2",
                                borderRadius: 90,
                            }} />
                        <Text style={styles.overviewText}>Overview</Text>
                        <View style={{ width: 128, marginTop: 24 }}>
                            <Picker
                                items={items!}
                                value={value}
                                setValue={setValue}
                                open={open}
                                setOpen={setOpen}
                                placeholder="Todos" />
                        </View>
                    </View>
                    : undefined}
                <View style={styles.list}>
                    <WalletList data={context.wallets} />
                </View>
            </View>
            <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
        </View>
    )
}