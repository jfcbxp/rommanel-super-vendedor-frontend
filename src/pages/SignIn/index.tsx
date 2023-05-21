import { Image, Text, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { StatusBar } from "expo-status-bar";
import { SignInStyles as styles } from "./styles";
import { CodeInput } from "../../components/inputs/username";
import { PasswordInput } from "../../components/inputs/password";
import { useContext, useState } from "react";
import { Button } from "../../components/buttons/button";
import { Context } from "../../context";

interface Properties extends StackScreenProps<StackParams, "SignIn"> { }

export default function SignIn({ navigation }: Properties) {
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")
    const context = useContext(Context)

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
                <CodeInput
                    value={code}
                    onChangeText={setCode} />
                <PasswordInput
                    value={password}
                    onChangeText={setPassword} />
                <Button
                    title="ENTRAR"
                    disabled={(code.length == 6 && password) ? false : true}
                    onPress={() => context.signIn(code, password)} />
            </View>
            <Text style={styles.text}>Solicite seu acesso ao setor de T.I</Text>
            <StatusBar style="light" translucent={false} backgroundColor="#BEC0C5" />
        </View>
    )
}