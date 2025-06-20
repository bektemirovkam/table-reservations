import { StyleSheet, View } from "react-native";
import { Quest } from "../model/types";
import { Text } from "@/shared/ui/text";
import { Button } from "@/shared/ui/button";

interface QuestItemProps {
    quest: Quest;
    onRemove: (id: string) => void;
}

export const QuestItem = ({ quest, onRemove }: QuestItemProps) => {
    return (
        <View style={[styles.questItem, { backgroundColor: quest.side === 'groom' ? '#d1e7dd' : '#f8d7da' }]}>
            <Text numberOfLines={1} style={styles.questText}>{quest.name} (Возраст: {quest.age})</Text>
            <Button color='white' title="❌" onPress={() => onRemove(quest.id)} />
        </View>
    )
}

const styles = StyleSheet.create({
    questItem: {
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    questText: {
        fontSize: 16,
        flex: 1
    },
    removeButton: {
        padding: 5,
        backgroundColor: '#ff4d4d',
        borderRadius: 3
    }
})
