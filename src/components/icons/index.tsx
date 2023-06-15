import { View, TouchableOpacity } from "react-native"
import { IconsStyles } from "./styles"
import { onPressPhoneCall, onPressWhatsApp } from "../../services/phone.service"
import {
    MaterialIcons as Icon,
    MaterialCommunityIcons as Icons,
} from "@expo/vector-icons";

interface Properties {
    phone: string
    costumer?: string
}

export function ContactIcons(properties: Properties) {
    return (
        <>
            <TouchableOpacity
                style={IconsStyles.icon}
                onPress={() => { onPressPhoneCall(properties.phone) }}>
                <Icon
                    name="phone"
                    color="white"
                    size={32} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[IconsStyles.icon, { backgroundColor: "green" }]}
                onPress={() => { onPressWhatsApp(properties.phone, properties.costumer) }}>
                <Icons
                    name="whatsapp"
                    color="white"
                    size={32} />
            </TouchableOpacity>
        </>
    )
}