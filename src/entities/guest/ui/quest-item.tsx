import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Quest } from "../model/types";
import { Text } from "@/shared/ui/text";

interface QuestItemProps {
    quest: Quest;
    onRemove: (id: string) => void;
}

export const QuestItem = ({ quest, onRemove }: QuestItemProps) => {
    return (
        <View style={styles.questItem}>
            <Text style={styles.questText}>{quest.name} ({quest.age})</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(quest.id)}>
                <Text style={{ color: 'white' }}>❌</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    questItem: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    questText: {
        fontSize: 16
    },
    removeButton: {
        padding: 5,
        backgroundColor: '#ff4d4d',
        borderRadius: 3
    }
})
