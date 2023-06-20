import { Linking } from 'react-native';

export const adjustPhone = (phone: string) => {
    phone = phone.trim().replace(/\s/g, '').replace('-', '');
    phone = phone.startsWith('0') ? phone.slice(1) : phone;
    let ddd = '';
    let _phone = '';
    let phone_ = '';
    let pattern = '';
    if (phone.length == 11) {
        ddd = phone.slice(0, 2);
        _phone = phone.slice(2, 7);
        phone_ = phone.slice(7, 11);
        pattern = `(${ddd}) ${_phone}-${phone_}`;
    } else if (phone.length == 10) {
        ddd = phone.slice(0, 2);
        _phone = phone.slice(2, 6);
        phone_ = phone.slice(6, 10);
        pattern = `(${ddd}) 9${_phone}-${phone_}`;
    } else {
        return phone;
    }
    return pattern;
};

export const onPressWhatsApp = (phone: string, name?: string, time?: string) => {
    phone = phone.trim().replace(/\s/g, '').replace('-', '');
    if (phone.startsWith('0')) {
        phone = phone.slice(1);
    }
    phone = `55${phone}`;
    let text = '';
    if (!time) {
        text = `Olá *${name}*`;
    } else {
        text = `Olá *${name}*, você tem uma visita agendada para hoje, às *${time}*, podemos confirmar? Senão, podemos remarcar?`;
    }
    const link = async () => {
        await Linking.canOpenURL(`whatsapp://send?text=${text}`).then((suppoted) => {
            if (suppoted) {
                return Linking.openURL(`whatsapp://send?phone=${phone}&text=${text}`);
            } else {
                return Linking.openURL(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`);
            }
        });
    };
    link().catch((error) => console.error(error));
};

export const onPressPhoneCall = (phone: string) => {
    phone = phone.trim().replace(/\s/g, '').replace('-', '');
    if (phone.startsWith('0')) {
        phone = phone.slice(1);
    }
    const link = async () => {
        await Linking.openURL(`tel:${phone}`);
    };
    link().catch((error) => console.error(error));
};
