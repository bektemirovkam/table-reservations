import { Collapsible } from "@/shared/ui/collapsible";
import { Progress } from "@/shared/ui/progress";
import { Text } from "@/shared/ui/text";
import { useState } from "react";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";


interface TableItemProps {
    title: string;
    slots: {
        content: React.ReactNode;
        actions: React.ReactNode;
    }
    filledCount?: number;
}

const TABLE_LIMIT = 8; // Максимальное количество гостей за столом

export const TableItem = ({ title, slots, filledCount }: TableItemProps) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <View style={styles.tableItem}>
            <View style={styles.tableHeader}>
                <TouchableOpacity style={styles.tableTitle} onPress={() => setCollapsed((prev) => !prev)}>
                    <Text>{title}</Text>
                    <Progress value={filledCount ? (filledCount / TABLE_LIMIT) * 100 : 0} />
                    <Text>{collapsed ? '▲' : '▼'}</Text>
                </TouchableOpacity>
                {slots.actions}
            </View>
            <Collapsible collapsed={collapsed}>
                {slots.content}
            </Collapsible>
        </View>
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