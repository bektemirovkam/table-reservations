import { StyleSheet } from "react-native";
import { Guest } from "../model/types";
import { Text } from "@/shared/ui/text";
import { Button } from "@/shared/ui/button";
import { DraxView } from "react-native-drax";

interface GuestItemProps {
    guest: Guest;
    onRemove: (id: string) => void;
}

export const GuestItem = ({ guest, onRemove }: GuestItemProps) => {
    return (
        <DraxView longPressDelay={100} payload={guest} style={[styles.guestItem, { backgroundColor: guest.side === 'groom' ? '#d1e7dd' : '#f8d7da' }]}>
            <Text numberOfLines={1} style={styles.guestText}>{guest.name} (Возраст: {guest.age})</Text>
            <Button color='white' title="❌" onPress={() => onRemove(guest.id)} />
        </DraxView>
    )
}

const styles = StyleSheet.create({
    guestItem: {
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
    },
    guestText: {
        fontSize: 16,
        flex: 1
    },
    removeButton: {
        padding: 5,
        backgroundColor: '#ff4d4d',
        borderRadius: 3
    }
})
