import { View, Text, TouchableOpacity } from "react-native";
import { SchedulingItemStyles as styles } from "./styles";
import { Schedule } from "../../../../models/schedule.model";
import {
  MaterialIcons as Icon,
  MaterialCommunityIcons as Icons,
} from "@expo/vector-icons";
import { adjustPhone, adjustTime, onPressPhoneCall, onPressWhatsApp } from "../../../../services/phone.service";
import { shorten } from "../../../../services/shorten.service";
import { useEffect, useState } from "react";
import { ContentDialog } from "../../../modals/dialog/content";
import { TextArea } from "../../../inputs/text-area";
import { Button } from "../../../buttons/button";
import { Picker } from "../../../buttons/picker";
import { ItemType } from "react-native-dropdown-picker";
import { ScheduleStatusEnum } from "../../../../enums/schedule.status.enum";
import { useSchedulingService } from "../../../../services/scheduling.service";

export function SchedulingItem({ data }: { data: Schedule }) {
  const [visible, setVisible] = useState(false)
  const [comment, setComment] = useState(data.observacao ? data.observacao : "")
  const [items, setItems] = useState<ItemType<ScheduleStatusEnum>[]>();
  const [status, setStatus] = useState<ScheduleStatusEnum>();
  const [open, setOpen] = useState(false)
  const schedulingService = useSchedulingService()

  useEffect(() => {
    handlePicker()
  }, [])

  const handlePicker = () => {
    setItems(
      Object.entries(ScheduleStatusEnum).flatMap(
        (stat): ItemType<ScheduleStatusEnum> => {
          return { value: stat[1], label: stat[1] };
        }
      )
    );
  };

  const update = () => {
    const put = async () => {
      await schedulingService.put({
        id: data.id,
        codigoVendedor: data.codigoVendedor,
        comentario: comment.toUpperCase(),
        situacao: status!
      })
    }
    put()
      .then(() => { })
      .finally(() => { setVisible(false) })
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => { setVisible(true) }}>
      <View style={styles.top}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Text style={styles.code}>{data.id}</Text>
          <View
            style={[
              styles.box,
              {
                backgroundColor:
                  data.situacao == "Chegou" ? "#00B81F" : "#C00404",
              },
            ]}>
            <Text style={[styles.costumer, { color: "white" }]}>
              {adjustTime(data.horaInicial)}
            </Text>
          </View>
          <View
            style={[
              styles.box,
              {
                backgroundColor:
                  data.situacao == "Previsto" ? "#FE38F2" : "#00B81F",
              },
            ]}>
            <Text style={[styles.costumer, { color: "white" }]}>
              {adjustTime(data.horaFinal)}
            </Text>
          </View>
        </View>
        <Text style={styles.code}>{adjustPhone(data.telefone)}</Text>
      </View>
      <View style={styles.bottom}>
        <View>
          <Text style={styles.costumer}>{shorten(data.nomeCliente.trim())}</Text>
          <Text style={styles.costumer}>Comentário:</Text>
          <Text style={styles.costumer}>{shorten(data.observacao.trim())}</Text>
        </View>
        <View style={styles.icons}>
          {data.telefone ?
            <>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => { onPressPhoneCall(data.telefone) }}>
                <Icon
                  name="phone"
                  color="white"
                  size={32} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.icon, { backgroundColor: "green" }]}
                onPress={() => { onPressWhatsApp(data.telefone, data.nomeCliente) }}>
                <Icons
                  name="whatsapp"
                  color="white"
                  size={32} />
              </TouchableOpacity>
            </>
            : undefined}
        </View>
      </View>
      <ContentDialog
        title="Observação"
        visible={visible}
        dismiss={() => setVisible(false)}>
        <TextArea
          value={comment}
          onChangeText={setComment} />
        <Picker
          items={items ? items : []}
          value={status}
          setValue={setStatus}
          open={open}
          setOpen={setOpen}
          placeholder="Selecione" />
        <Button
          title="SALVAR"
          disabled={status ? false : true}
          onPress={update} />
      </ContentDialog>
    </TouchableOpacity>
  );
}
