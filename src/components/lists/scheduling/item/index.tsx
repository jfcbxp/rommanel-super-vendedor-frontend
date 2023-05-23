import { View, Text, Linking } from "react-native";
import { SchedulingItemStyles as styles } from "./styles";
import { Schedule } from "../../../../models/schedule.model";
import { MaterialIcons as Icon, MaterialCommunityIcons as Icons } from "@expo/vector-icons";

export function SchedulingItem({ data }: { data: Schedule }) {
    const adjustPhone = (phone: string) => {
        phone = phone.trim().replace(" ", "").replace("-", "")
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

    const adjustTime = (time: string) => {
        time = time.trim().replace(" ", "").replace(":", "")
        if (time.length == 1) {
            time = `0${time}:00`
        } else if (time.length == 2) {
            time = `${time}:00`
        } else {
            let hour = time.slice(0, 2)
            let minute = time.slice(2, 4)
            time = `${hour}:${minute}`
        }
        return time
    }

    const onPressWhatsApp = (phone: string) => {
        phone = phone.trim().replace(" ", "").replace("-", "")
        if (phone.startsWith("0")) {
            phone = phone.slice(1)
        }
        phone = `55${phone}`
        let text = `Olá *${data.nomeCliente}*, você tem uma visita agendada para hoje, às *${data.horaInicial}*, podemos confirmar? Senão, podemos remarcar?`
        Linking.canOpenURL(`whatsapp://send?text=${text}`)
            .then(suppoted => {
                if (suppoted) {
                    return Linking.openURL(`whatsapp://send?phone=${phone}&text=${text}`)
                } else {
                    return Linking.openURL(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`);
                }
            })
    }

    const onPressPhoneCall = (phone: string) => {
        phone = phone.trim().replace(" ", "").replace("-", "")
        if (phone.startsWith("0")) {
            phone = phone.slice(1)
        }
        Linking.openURL(`tel:${phone}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.code}>{data.id}</Text>
                <View
                    style={[styles.box,
                    { backgroundColor: data.situacao == "Chegou" ? "#00B81F" : "#C00404" }
                    ]}>
                    <Text style={[styles.costumer, { color: "white" }]}>{adjustTime(data.horaInicial)}</Text>
                </View>
                <View
                    style={[styles.box,
                    { backgroundColor: data.situacao == "Previsto" ? "#FE38F2" : "#00B81F" }
                    ]}>
                    <Text style={[styles.costumer, { color: "white" }]}>{adjustTime(data.horaFinal)}</Text>
                </View>
                <View style={{ flexDirection: "row", position: "absolute", right: 0, gap: 32 }}>
                    <Icon name="phone"
                        color="#73186D"
                        size={32}
                        onPress={() => { onPressPhoneCall(data.telefone) }} />
                    <Icons name="whatsapp"
                        color="green"
                        size={32}
                        onPress={() => { onPressWhatsApp(data.telefone) }} />
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.costumer}>{data.nomeCliente.trim()}</Text>
                <Text style={styles.code}>{adjustPhone(data.telefone)}</Text>
            </View>
        </View>
    )
}