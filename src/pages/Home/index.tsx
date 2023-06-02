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
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { useMetaService } from "../../services/meta.service";
import { Meta } from "../../models/meta.model";

interface Properties extends StackScreenProps<StackParams, "Home"> {}

export default function Home({ navigation }: Properties) {
  const context = useContext(Context);
  const [meta, setMeta] = useState<Meta>();
  const metaService = useMetaService();

  useEffect(() => {
    init()
      .finally(() => context.stopLoading())
      .catch(() => context.showDialog());
  }, [context.token]);

  const init = async () => {
    await context.isUserAuthenticated().then(async (auth) => {
      if (auth) {
        await Promise.all([
          metaService.get(context.user?.sub!, auth.token),
        ]).then(async ([_meta]) => {
          if (!_meta) {
            context.showDialog();
          } else {
            setMeta(_meta);
          }
        });
      }
    });
  };

  const reload = () => {
    context.startLoading();
    init()
      .finally(() => context.stopLoading())
      .catch(() => context.showDialog());
  };

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
          <Container
            title="Apuração"
            onReload={reload}
            disabled={meta ? true : false}
          >
            {meta ? (
              <>
                <Text style={styles.title}>
                  Última atualização:{" "}
                  {meta ? meta.dataAtualizacao : "--/--/----"} as{" "}
                  {meta ? meta.horaAtualizacao : " --:--"}
                </Text>
                <ProgressBar
                  title="Período atual"
                  step={meta.progressoPeriodo}
                  steps={100}
                  period={`${meta.dataInicial} a ${meta.dataFinal}`}
                  type="date"
                />
                <Divider />
                <ProgressBar
                  title="Total Vendido"
                  step={meta.totalVendido}
                  steps={meta.metaValor}
                  type="money"
                />
                <Divider />
                <ProgressBar
                  title="Prospectos"
                  step={meta.quantidadeProspectos}
                  steps={meta.metaProspecto}
                  type="number"
                />
                <Divider />
                <ProgressBar
                  title="Ticket Médio"
                  step={meta.ticketMedio}
                  steps={meta.ticketMedio}
                  type="money"
                />
                <Divider />
                <ProgressBar
                  title="Reativos"
                  step={meta.quantidadeReativos}
                  steps={meta.quantidadeReativos}
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
