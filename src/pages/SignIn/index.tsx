import { Image, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { StatusBar } from "expo-status-bar";
import { SignInStyles as styles } from "./styles";
import { EmailInput } from "../../components/inputs/email";
import { PasswordInput } from "../../components/inputs/password";
import { useState } from "react";
import { Button } from "../../components/buttons/button";

interface Properties extends StackScreenProps<StackParams, "SignIn"> { }

export default function SignIn({ navigation }: Properties) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 32 }}>
                <Image
                    source={require("../../assets/ROMMANEL_BUTTLERFLY.png")}
                    style={{ width: 85, height: 77 }} />
                <Text style={styles.title}>Olá,</Text>
                <Text style={styles.title}>seja bem-vindo(a).</Text>
            </View>
            <View style={{ marginBottom: 40 }}>
                <EmailInput
                    value={email}
                    onChangeText={setEmail} />
                <PasswordInput
                    value={password}
                    onChangeText={setPassword} />
                <Button
                    title="ENTRAR"
                    onPress={() => { }} />
            </View>
            <Text style={styles.text}>Solicite seu acesso ao setor de T.I</Text>
            <StatusBar style="light" translucent={false} backgroundColor="#BEC0C5" />
        </View>
    )
}