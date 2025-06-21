import { Collapsible } from "@/shared/ui/collapsible";
import { Progress } from "@/shared/ui/progress";
import { Text } from "@/shared/ui/text";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DraxView, useDraxContext } from "react-native-drax";

interface TableItemProps {
  title: string;
  slots: {
    content: React.ReactNode;
    actions: React.ReactNode;
  };
  filledPercent?: number;
  onReceiveDragDrop: (payload: unknown) => void;
}

export const TableItem = ({
  title,
  slots,
  filledPercent = 0,
  onReceiveDragDrop,
}: TableItemProps) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.tableItem}>
      <View style={styles.tableHeader}>
        <DraxView
          onReceiveDragDrop={({ dragged: { payload } }) => {
            setCollapsed(false);
            onReceiveDragDrop(payload);
          }}
          renderContent={({ viewState }) => {
            const receivingDrag = viewState && viewState.receivingDrag;

            return (
              <TouchableOpacity
                style={[
                  styles.collapseBtn,
                  { borderColor: receivingDrag ? "green" : "transparent" },
                ]}
                onPress={() => setCollapsed((prev) => !prev)}
                activeOpacity={0.6}
              >
                <Text>{title}</Text>
                <Progress value={filledPercent} />
                <Text>{collapsed ? "▲" : "▼"}</Text>
              </TouchableOpacity>
            );
          }}
          style={styles.tableTitle}
        />
        {slots.actions}
      </View>
      <Collapsible collapsed={collapsed}>{slots.content}</Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  tableItem: {},
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#eeeaea",
    alignItems: "center",
    gap: 10,
  },
  tableTitle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    gap: 10,
  },
  collapseBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
  },
});
