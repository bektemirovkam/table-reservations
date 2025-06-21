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
    }
    filledPercent?: number;
    onReceiveDragDrop: (payload: unknown) => void
}


export const TableItem = ({ title, slots, filledPercent = 0, onReceiveDragDrop }: TableItemProps) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <DraxView style={styles.tableItem}
            onReceiveDragDrop={({ dragged: { payload } }) => {
                setCollapsed(false)
                onReceiveDragDrop(payload);
            }}
        >
            <View style={styles.tableHeader}>
                <TouchableOpacity style={styles.tableTitle} onPress={() => setCollapsed((prev) => !prev)}>
                    <Text>{title}</Text>
                    <Progress value={filledPercent} />
                    <Text>{collapsed ? '▲' : '▼'}</Text>
                </TouchableOpacity>
                {slots.actions}
            </View>
            <Collapsible collapsed={collapsed}>
                {slots.content}
            </Collapsible>
        </DraxView>
    );
}

const styles = StyleSheet.create({
    tableItem: {
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eeeaea',
        alignItems: 'center',
        gap: 10,
        padding: 10
    },
    tableTitle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        gap: 10,
    }
})