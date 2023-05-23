import { View, Text } from "react-native";
import { WalletItemStyles as styles } from "./styles";
import { Wallet } from "../../../../models/wallet.model";

export function WalletItem({ data }: { data: Wallet }) {
    const adjustPhone = (phone: string) => {
        phone = phone.trim().replace(" ", "")
        phone = (phone.startsWith("0") ? phone.slice(1) : phone)
        let ddd = ""
        let _phone = ""
        let phone_ = ""
        let pattern = ""
        if (phone.length == 11) {
            ddd = phone.slice(0, 2)
            _phone = phone.slice(2, 7)
            phone_ = phone.slice(7, 11)
            pattern = `(${ddd}) ${_phone}-${phone_}`
        } else if (phone.length == 10) {
            ddd = phone.slice(0, 2)
            _phone = phone.slice(2, 6)
            phone_ = phone.slice(6, 10)
            pattern = `(${ddd}) 9${_phone}-${phone_}`
        }
        return pattern
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.code}>{data.id}</Text>
                <View
                    style={[styles.box,
                    { backgroundColor: data.situacao == "Ativo" ? "#00B81F" : "#C00404" }
                    ]}>
                    <Text style={[styles.costumer, { color: "white" }]}>{data.situacao}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.costumer}>{data.nomeCliente}</Text>
                <Text style={styles.code}>{adjustPhone(data.telefone)}</Text>
            </View>
        </View>
    )
}