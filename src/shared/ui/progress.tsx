import { ViewProps, StyleSheet, View } from "react-native";

interface ProgressProps extends ViewProps {
  value: number; // значение от 0 до 100
}

export const Progress = ({ style, value, ...rest }: ProgressProps) => {
  const percent = Math.max(0, Math.min(100, value)); // ограничиваем от 0 до 100

  return (
    <View style={[styles.progress, style]} {...rest}>
      <View style={[styles.bar, { width: `${percent}%` }]} />
    </View>
  );
};
const styles = StyleSheet.create({
  progress: {
    flex: 1,
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#1976d2",
    borderRadius: 2,
  },
});
