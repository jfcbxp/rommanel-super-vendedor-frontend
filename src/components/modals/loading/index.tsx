import { ModalProps, Modal, SafeAreaView, ActivityIndicator } from "react-native";

export function Loading(properties: ModalProps) {
    return (
        <Modal {...properties}>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: "#73186D",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <ActivityIndicator size={128} color="#E0CCDC" />
            </SafeAreaView>
        </Modal>
    )
}