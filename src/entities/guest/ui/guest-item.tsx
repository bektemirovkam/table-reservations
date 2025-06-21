import { StyleSheet, View } from "react-native";
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
        <DraxView
            renderContent={({ viewState }) => {
                const dragging = viewState && viewState.dragStatus !== 0;

                return <View style={[styles.guestItem, { opacity: dragging ? 0.8 : 1, backgroundColor: guest.side === 'groom' ? '#d1e7dd' : '#f8d7da' }]}>
                    <Text numberOfLines={1} style={styles.guestText}>{guest.name} (Возраст: {guest.age})</Text>
                    <Button color='white' title="❌" onPress={() => onRemove(guest.id)} />
                </View>
            }}
            longPressDelay={100}
            payload={guest}
            draggingStyle={styles.dragging}
        />
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
    },
    dragging: {
        opacity: 0.2,
    },
})
