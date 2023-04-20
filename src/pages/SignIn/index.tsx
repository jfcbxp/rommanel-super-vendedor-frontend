import { Image, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { StatusBar } from "expo-status-bar";
import { SignInStyles as styles } from "./styles";
import { UserCodeInput } from "../../components/inputs/user_code";
import { PasswordInput } from "../../components/inputs/password";
import { useState } from "react";
import { Button } from "../../components/buttons/button";

interface Properties extends StackScreenProps<StackParams, "SignIn"> { }

export default function SignIn({ navigation }: Properties) {
    const [code, setCode] = useState("")
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
                <UserCodeInput
                    value={code}
                    onChangeText={setCode} />
                <PasswordInput
                    value={password}
                    onChangeText={setPassword} />
                <Button
                    title="ENTRAR"
                    disabled={code.length < 6 && password.length < 3 ? true : false}
                    onPress={() => { }} />
            </View>
            <Text style={styles.text}>Solicite seu acesso ao setor de T.I</Text>
            <StatusBar style="light" translucent={false} backgroundColor="#BEC0C5" />
        </View>
    )
}