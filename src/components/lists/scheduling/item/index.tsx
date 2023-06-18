import { View, Text, TouchableOpacity } from 'react-native';
import { Schedule } from '../../../../models/schedule.model';
import { adjustPhone, adjustTime } from '../../../../services/phone.service';
import { shorten } from '../../../../services/shorten.service';
import { useEffect, useState } from 'react';
import { ContentDialog } from '../../../modals/dialog/content';
import { TextArea } from '../../../inputs/text-area';
import { Button } from '../../../buttons/button';
import { Picker } from '../../../buttons/picker';
import { ItemType } from 'react-native-dropdown-picker';
import { ScheduleStatusEnum } from '../../../../enums/schedule.status.enum';
import { useSchedulingService } from '../../../../services/scheduling.service';
import { IconsStyles } from '../../../icons/styles';
import { ContactIcons } from '../../../icons';
import { ItemsStyles as styles } from '../../items/styles';
import { useNavigation } from '@react-navigation/native';
import { NavigationParams } from '../../../../types/navigation.params';

export function SchedulingItem({ data }: { data: Schedule }) {
    const navigation = useNavigation<NavigationParams>();
    const [visible, setVisible] = useState(false);
    const [comment, setComment] = useState(data.observacao ? data.observacao : '');
    const [items, setItems] = useState<ItemType<ScheduleStatusEnum>[]>();
    const [status, setStatus] = useState<ScheduleStatusEnum>();
    const [open, setOpen] = useState(false);
    const schedulingService = useSchedulingService();
    const [visible_, setVisible_] = useState(false);

    useEffect(() => {
        handlePicker();
    }, []);

    const handlePicker = () => {
        setItems(
            Object.entries(ScheduleStatusEnum).flatMap((stat): ItemType<ScheduleStatusEnum> => {
                return { value: stat[1], label: stat[1] };
            }),
        );
    };

    const update = () => {
        const put = async () => {
            if (status) {
                await schedulingService.put({
                    id: data.id,
                    codigoVendedor: data.codigoVendedor,
                    observacao: comment.toUpperCase(),
                    situacao: status,
                });
            }
        };
        put()
            .then(() => {
                setVisible(false);
            })
            .finally(() => {
                navigation.navigate('Home');
            });
    };

    const remove = () => {
        const exclude = async () => {
            await schedulingService.remove(data.codigoVendedor, data.id);
        };
        exclude()
            .then(() => {
                setVisible_(false);
                setVisible(false);
            })
            .finally(() => {
                navigation.navigate('Home');
            });
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                setVisible(true);
            }}
        >
            <View style={styles.top}>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <Text style={styles.code}>{data.id}</Text>
                    <View
                        style={[
                            styles.box,
                            {
                                backgroundColor: data.situacao == 'Chegou' ? '#00B81F' : '#C00404',
                            },
                        ]}
                    >
                        <Text style={[styles.costumer, { color: 'white' }]}>{adjustTime(data.horaInicial)}</Text>
                    </View>
                    <View
                        style={[
                            styles.box,
                            {
                                backgroundColor: data.situacao == 'Previsto' ? '#FE38F2' : '#00B81F',
                            },
                        ]}
                    >
                        <Text style={[styles.costumer, { color: 'white' }]}>{adjustTime(data.horaFinal)}</Text>
                    </View>
                    <View style={[styles.box, { backgroundColor: '#00B81F' }]}>
                        <Text style={[styles.costumer, { color: 'white' }]}>{data.situacao}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <View>
                    <Text style={styles.costumer}>{shorten(data.nomeCliente.trim())}</Text>
                    <Text style={styles.costumer}>Comentário:</Text>
                    <Text style={styles.costumer}>{shorten(data.observacao.trim())}</Text>
                </View>
                <View style={IconsStyles.icons}>
                    {data.telefone ? <ContactIcons phone={data.telefone} costumer={data.nomeCliente} /> : undefined}
                </View>
            </View>
            <ContentDialog title="Observação" visible={visible} dismiss={() => setVisible(false)}>
                <TextArea value={comment} onChangeText={setComment} />
                <Picker
                    items={items ? items : []}
                    value={status}
                    setValue={setStatus}
                    open={open}
                    setOpen={setOpen}
                    placeholder="Selecione"
                />
                <Button title="ATUALIZAR" disabled={status ? false : true} onPress={update} />
                <Button title="EXCLUIR" onPress={() => setVisible_(true)} />
            </ContentDialog>
            <ContentDialog title="Confirmar exclusão" visible={visible_} dismiss={() => setVisible_(false)}>
                <Text style={[styles.costumer, { fontSize: 16 }]}>
                    {`Deseja realmente excluir o agendamento (${data.id})?`}
                </Text>
                <Button title="CONFIRMAR" onPress={remove} />
            </ContentDialog>
        </TouchableOpacity>
    );
}
