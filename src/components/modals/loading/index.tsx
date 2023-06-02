import { ModalProps, Modal, SafeAreaView, ActivityIndicator } from "react-native";

export function Loading(properties: ModalProps) {
    return (
        <Modal {...properties}
            animationType="fade">
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

export function AlternateLoading(properties: ModalProps) {
    return (
        <Modal {...properties}
            transparent={true}
            animationType="fade">
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                }}>
                <ActivityIndicator size={128} color="white" />
            </SafeAreaView>
        </Modal>
    )
}