import { StackScreenProps } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { StackParams } from '../../types/stack.params';
import { BillingStyles as styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';
import { BillingHeader } from '../../components/headers/billing';
import { BillingList } from '../../components/lists/billing';
import { BillingProgress } from '../../models/billing.progress.model';
import { useBillingDailyTotalizer } from '../../services/billing.totalizer.service';
import { DailyTotalizer } from '../../models/daily.totalizer.model';
import { AlternateLoading } from '../../components/modals/loading';
import { BillingModel } from '../../models/billing.model';
import { useBillingProgressService } from '../../services/billing.progress.service';
import { useBillingService } from '../../services/billing.service';

interface Properties extends StackScreenProps<StackParams, 'Billing'> { }

export default function Billing({ navigation }: Properties) {
    const context = useContext(Context);
    const [billingProgresses, setBillingProgresses] = useState<BillingProgress[]>();
    const [billings, setBillings] = useState<BillingModel[]>();
    const [data, setData] = useState<BillingProgress[] | undefined>();
    const [element, setElement] = useState<BillingProgress>();
    const [dailyTotalizer, setDailyTotalizer] = useState<DailyTotalizer>();
    let date = context.date;
    const billingDailyTotalizer = useBillingDailyTotalizer();
    const billingProgressService = useBillingProgressService();
    const billingService = useBillingService();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            context.startLoading()
            init()
                .finally(context.stopLoading)
        });
        return focusListener;
    }, [navigation]);

    useEffect(() => {
        const init = async () => {
            await Promise.all([handleBillingProgresses(billingProgresses)]);
        };

        if (billingProgresses) {
            init().catch((error) => console.error(error));
        }
    }, [billingProgresses]);

    useEffect(() => {
        const init = async () => {
            await Promise.all([handleChangeItem(billingProgresses, date)]);
        };

        if (billingProgresses) {
            init().catch((error) => console.error(error));
        }
    }, [context.date]);

    const init = async () => {
        await Promise.all([billingProgressService.get(context.user?.sub!)]).then(
            async ([_billingProgresses]) => {
                if (!_billingProgresses.length) {
                    context.showDialog("noData");
                } else {
                    setBillingProgresses(_billingProgresses);
                }
            },
        );
    };

    const getBilling = async (_date: string) => {
        setLoading(true);
        await billingService.get(context.user?.sub!, _date).then((_billings) => {
            if (_billings) {
                setBillings(_billings);
            }
        });
        setLoading(false);
    };

    const handleBillingProgresses = async (billingProgresses: BillingProgress[] | undefined) => {
        setLoading(true);
        if (billingProgresses) {
            let _data: BillingProgress[] = [];
            billingProgresses.forEach((element) => {
                _data.push(element);
            });
            if (_data.length > 0) {
                let _item = _data[_data.length - 1].periodo;
                let element = _data.find((element) => element.periodo == _item)!;
                element.selected = true;
                setElement(element);
                let index = _data.findIndex((element) => element.periodo == _item);
                _data[index] = element;
                setData(_data);
                await Promise.all([getBilling(_item), getDailyTotalizer(_item)]);
            }
        }
        setLoading(false);
    };

    const handleChangeItem = async (billingProgresses: BillingProgress[] | undefined, _item?: string) => {
        setLoading(true);
        if (billingProgresses && _item) {
            let _data: BillingProgress[] = [];
            billingProgresses.forEach((element) => {
                _data.push(element);
            });
            let _element = _data.find((element) => element.periodo == _item)!;
            billingProgresses.forEach((element) => {
                element.selected = false;
            });
            _element.selected = true;
            setElement(_element);
            let index = _data.findIndex((element) => element.periodo == _item);
            _data[index] = _element;
            setData(_data);
            await Promise.all([getBilling(_item), getDailyTotalizer(_item)]);
        }
        setLoading(false);
    };

    const getDailyTotalizer = async (date: string) => {
        await billingDailyTotalizer.get(context.user?.sub!, date).then((_dailyTotalizer) => {
            setDailyTotalizer(_dailyTotalizer);
        });
    };

    const checkZeros = (currency: string) => {
        if (!currency.includes(',')) {
            currency = `${currency},00`;
        } else {
            if (currency.split(',')[1].length < 2) {
                currency = `${currency}0`;
            }
        }
        return currency;
    };

    let liquido = dailyTotalizer ? checkZeros(dailyTotalizer.liquido.toLocaleString('pt-BR')) : 0;

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <BillingHeader data={data} />
            </View>
            <View style={styles.bottom}>
                <View style={styles.overview}>
                    <View style={{ flex: 1 }}>
                        <Icon
                            name="bar-chart"
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
                    <View style={{ flex: 3 }}>
                        <Text style={styles.overview_1}>{element?.periodo}</Text>
                        <View style={styles.overview_box}>
                            {dailyTotalizer && liquido != 'R$ 0,00' ? (
                                <Text style={styles.overview_2}>R$ {liquido}</Text>
                            ) : undefined}
                            {false ? (
                                <View style={styles.overview_inner_box}>
                                    <Icon name="arrow-upward" color="#60D29D" size={18} />
                                    <Text style={styles.overview_3}>10%</Text>
                                </View>
                            ) : undefined}
                        </View>
                    </View>
                </View>
                <View style={styles.list}>
                    <BillingList data={billings} />
                </View>
            </View>
            <AlternateLoading visible={loading} />
            <StatusBar style="light" translucent={false} backgroundColor="#601C5C" />
        </View>
    );
}
