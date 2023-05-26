import { View, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../types/stack.params";
import { HomeStyles as styles } from "./styles";
import { HomeHeader } from "../../components/headers/home";
import { Container } from "../../components/container";
import { NavigationButton } from "../../components/buttons/navigation";
import { StatusBar } from "expo-status-bar";
import { ProgressBar } from "../../components/progress_bar";
import { Divider } from "../../components/divider";
import { useContext, useEffect } from "react";
import { Context } from "../../context";

interface Properties extends StackScreenProps<StackParams, "Home"> {}

export default function Home({ navigation }: Properties) {
  const context = useContext(Context);

  useEffect(() => {
    const init = async () => {
      await context.getMeta();
    };
    init().catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.body}>
        <View style={styles.navigator}>
          <NavigationButton
            title="Agendamento"
            icon="schedule"
            onPress={() => {
              navigation.navigate("Scheduling");
            }}
          />
          <NavigationButton
            title="Carteira"
            icon="check-box"
            onPress={() => {
              navigation.navigate("Wallet");
            }}
          />
          <NavigationButton
            title="Faturamento"
            icon="bar-chart"
            onPress={() => {
              navigation.navigate("Billing");
            }}
          />
        </View>
        <View style={styles.bottom}>
          <Container title="Apuração">
            {context.meta ? (
              <>
                <Text style={styles.title}>
                  Última atualização:{" "}
                  {context.meta ? context.meta.dataAtualizacao : "--/--/----"}{" "}
                  as {context.meta ? context.meta.horaAtualizacao : " --:--"}
                </Text>
                <ProgressBar
                  title="Período atual"
                  step={context.meta ? context.meta.progressoPeriodo : 0}
                  steps={context.meta ? 100 : 0}
                  period={
                    context.meta
                      ? `${context.meta.dataInicial} a ${context.meta.dataFinal}`
                      : "nada consta"
                  }
                  type="date"
                />
                <Divider />
                <ProgressBar
                  title="Total Vendido"
                  step={context.meta ? context.meta.totalVendido : 0}
                  steps={context.meta ? context.meta.metaValor : 0}
                  type="money"
                />
                <Divider />
                <ProgressBar
                  title="Prospectos"
                  step={context.meta ? context.meta.quantidadeProspectos : 0}
                  steps={context.meta ? context.meta.metaProspecto : 0}
                  type="number"
                />
                <Divider />
                <ProgressBar
                  title="Ticket Médio"
                  step={context.meta ? context.meta.ticketMedio : 0}
                  steps={context.meta ? context.meta.ticketMedio : 0}
                  type="money"
                />
                <Divider />
                <ProgressBar
                  title="Reativos"
                  step={context.meta ? context.meta.quantidadeReativos : 0}
                  steps={context.meta ? context.meta.quantidadeReativos : 0}
                  type="number"
                />
                <Divider />
                <Text style={styles.subtitle}>
                  Solicite a atualização da apuração para seu gerente.
                </Text>
              </>
            ) : (
              <Text style={styles.subtitle}>
                Você ainda não possui apuração calculada, verifique com seu
                gerente.
              </Text>
            )}
          </Container>
        </View>
      </View>
      <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
    </View>
  );
}
