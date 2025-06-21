import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface ModalProps {
  isVisible: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ isVisible, children, onClose }: ModalProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View entering={FadeIn} style={styles.root}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
        <View style={styles.modalContent}>{children}</View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "absolute",
    inset: 0,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    inset: 0,
    zIndex: 1,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    minWidth: "90%",
    position: "relative",
    zIndex: 2,
  },
});
