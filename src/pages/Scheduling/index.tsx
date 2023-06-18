import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import { StackScreenProps } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { StackParams } from '../../types/stack.params';
import { SchedulingStyles as styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { SchedulingList } from '../../components/lists/scheduling';
import { SchedulingHeader } from '../../components/headers/scheduling';
import { useSchedulingService } from '../../services/scheduling.service';
import { SchedulingTotalizer } from '../../models/scheduling.totalizer.model';
import { Schedule } from '../../models/schedule.model';
import { useSchedulingTotalizerService } from '../../services/scheduling.totalizers.service';
import { FloatingButton } from '../../components/buttons/floating';
import { ContentDialog } from '../../components/modals/dialog/content';
import { SearchInput } from '../../components/inputs/search';
import { TextArea } from '../../components/inputs/text-area';
import { Button } from '../../components/buttons/button';
import { CostumerList } from '../../components/lists/costumers';
import { MaskedInput } from '../../components/inputs/mask';
import { Input } from '../../components/inputs/default';
import { useCostumerService } from '../../services/costumer.service';
import { Costumer } from '../../models/costumer.model';

interface Properties extends StackScreenProps<StackParams, 'Scheduling'> {}

export default function Scheduling({ navigation }: Properties) {
    const context = useContext(Context);
    const [schedules, setSchedules] = useState<Schedule[]>();
    const [dailyTotalizer, setDailyTotalizer] = useState<SchedulingTotalizer>();
    const [monthlyTotalizer, setMonthlyTotalizer] = useState<SchedulingTotalizer>();
    const schedulingService = useSchedulingService();
    const schedulingTotalizerService = useSchedulingTotalizerService();
    const costumerService = useCostumerService();

    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [date, setDate] = useState('');
    const [value, setValue] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [comment, setComment] = useState('');

    const [visible_, setVisible_] = useState(false);
    const [costumerCode, setCostumerCode] = useState('');
    const [costumer, setCostumer] = useState('');
    const [shop, setShop] = useState('');

    const [costumers, setCostumers] = useState<Costumer[]>();

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            context.startLoading();
            init().finally(context.stopLoading);
        });
        return focusListener;
    }, [navigation]);

    useEffect(() => {
        setVisible_(false);
        if (context.costumer) {
            setCostumerCode(context.costumer.codigo);
            setCostumer(context.costumer.nome);
            setShop(context.costumer.loja);
        }
    }, [context.costumer]);

    const init = async () => {
        await Promise.all([
            schedulingService.get(context.user?.sub!),
            schedulingTotalizerService.getDaily(context.user?.sub!),
            schedulingTotalizerService.getMontly(context.user?.sub!),
        ]).then(async ([_schedules, _dailyTotalizer, _monthlyTotalizer]) => {
            if (_schedules.length || _dailyTotalizer || _monthlyTotalizer) {
                setSchedules(_schedules);
                setDailyTotalizer(_dailyTotalizer);
                setMonthlyTotalizer(_monthlyTotalizer);
            }
        });
    };

    const getCostumers = () => {
        setVisible_(true);
        const get = async () => {
            await costumerService.get(search).then((costumers_) => {
                setCostumers(costumers_);
            });
        };
        context.startLoading();
        get().finally(context.stopLoading);
    };

    const toSchedule = () => {
        const post = async () => {
            await schedulingService.post({
                dataAgendamento: date,
                codigoCliente: costumerCode,
                lojaCliente: shop,
                nomeCliente: context.costumer?.nome!,
                valor: parseFloat(value),
                horaInicial: start,
                horaFinal: end,
                observacao: comment,
                codigoVendedor: context.user?.sub!,
                empresa: context.company!,
            });
        };
        context.startLoading();
        post()
            .then(() => {
                setVisible(false);
                context.stopLoading();
            })
            .finally(() => navigation.navigate('Home'));
        initials();
    };

    const initials = () => {
        setSearch('');
        setDate('');
        setStart('');
        setEnd('');
        setComment('');
        setCostumer('');
        setCostumerCode('');
        setShop('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <SchedulingHeader
                    dailyTotal={dailyTotalizer?.total!}
                    monthlyTotal={monthlyTotalizer?.total!}
                    dailyPredicted={dailyTotalizer?.previstos!}
                    monthlyPredicted={monthlyTotalizer?.previstos!}
                    dailyAbsences={dailyTotalizer?.faltas!}
                    monthlyAbsences={monthlyTotalizer?.faltas!}
                    dailyArrivals={dailyTotalizer?.chegadas!}
                    monthlyArrivals={monthlyTotalizer?.chegadas!}
                />
            </View>
            <View style={styles.bottom}>
                {false ? (
                    <View style={styles.overview}>
                        <View style={{ flex: 1 }}>
                            <Icon
                                name="schedule"
                                color="white"
                                size={36}
                                style={{
                                    padding: 8,
                                    backgroundColor: '#FE38F2',
                                    borderRadius: 90,
                                    alignSelf: 'center',
                                }}
                            />
                        </View>
                        <View style={{ flex: 3, justifyContent: 'space-around' }}>
                            <Text style={styles.overview_1}></Text>
                            <Text style={styles.overview_2}></Text>
                            <Text style={styles.overview_3}></Text>
                        </View>
                    </View>
                ) : undefined}
                <View style={styles.list}>
                    <SchedulingList data={schedules} />
                </View>
            </View>
            <FloatingButton
                onPress={() => {
                    setVisible(true);
                }}
            />
            <ContentDialog
                title="Novo agendamento"
                visible={visible}
                dismiss={() => {
                    setVisible(false);
                    initials();
                }}
            >
                <SearchInput value={search} onChangeText={setSearch} onPress={getCostumers} />
                <Input
                    value={costumerCode}
                    onChangeText={setCostumerCode}
                    editable={false}
                    placeholder="Código do cliente"
                />
                <Input value={shop} onChangeText={setShop} editable={false} placeholder="Loja" />
                <Input value={costumer} onChangeText={setCostumer} editable={false} placeholder="Nome" />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MaskedInput
                        value={date}
                        onChangeText={setDate}
                        placeholder="Data"
                        type="datetime"
                        options={{
                            format: 'DD/MM/YYYY',
                        }}
                        keyboardType="number-pad"
                    />
                    <MaskedInput
                        value={value}
                        onChangeText={(_maskedText, rawText) => {
                            rawText && setValue(rawText);
                        }}
                        placeholder="Valor"
                        type="money"
                        options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$ ',
                            suffixUnit: '',
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MaskedInput
                        value={start}
                        onChangeText={setStart}
                        placeholder="Hora inicial"
                        type="datetime"
                        options={{
                            format: 'HH:mm',
                        }}
                        keyboardType="number-pad"
                    />
                    <MaskedInput
                        value={end}
                        onChangeText={setEnd}
                        placeholder="Hora final"
                        type="datetime"
                        options={{
                            format: 'HH:mm',
                        }}
                        keyboardType="number-pad"
                    />
                </View>
                <TextArea value={comment} onChangeText={setComment} placeholder="COMENTÁRIO" />
                <Button
                    title="CADASTRAR"
                    disabled={!date || !start || !end || !comment || !costumer || !costumerCode || !shop ? true : false}
                    onPress={toSchedule}
                />
            </ContentDialog>
            <ContentDialog title="Selecione um cliente" visible={visible_} dismiss={() => setVisible_(false)}>
                <View style={{ height: 512, backgroundColor: 'white', borderRadius: 18, padding: 8, marginBottom: 16 }}>
                    <CostumerList data={costumers} />
                </View>
            </ContentDialog>
            <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
        </View>
    );
}
