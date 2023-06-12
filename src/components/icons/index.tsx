import { TouchableOpacity } from "react-native"
import { IconsStyles } from "./styles"
import { onPressPhoneCall, onPressWhatsApp } from "../../services/phone.service"
import {
    MaterialIcons as Icon,
    MaterialCommunityIcons as Icons,
} from "@expo/vector-icons";

export function ContactIcons(data: any) {
    return (
        <>
            <TouchableOpacity
                style={IconsStyles.icon}
                onPress={() => { onPressPhoneCall(data.telefone) }}>
                <Icon
                    name="phone"
                    color="white"
                    size={32} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[IconsStyles.icon, { backgroundColor: "green" }]}
                onPress={() => { onPressWhatsApp(data.telefone, data.nomeCliente) }}>
                <Icons
                    name="whatsapp"
                    color="white"
                    size={32} />
            </TouchableOpacity>
        </>
    )
}