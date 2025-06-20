import { CreateGuestForm, GuestItem, useGuests } from "@/entities/guest";
import { TableItem } from "@/entities/table";
import { useTables } from "@/entities/table/model/use-tables";
import { Button } from "@/shared/ui/button";
import { useModal } from "@/shared/ui/modals/use-modal";
import { Text } from "@/shared/ui/text";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NestableDraggableFlatList, NestableScrollContainer, ScaleDecorator } from "react-native-draggable-flatlist";


export const TablesList = () => {
    const { tables, removeTable, addTable } = useTables()
    const { addGuest, guestsRecord, removeGuest, updateGuests } = useGuests()

    const { open: openModal, close: closeModal } = useModal()

    const handleAddGuest = (tableId: string) => {
        openModal({
            content: <CreateGuestForm tableId={tableId}
                onSubmit={(guest) => {
                    addGuest(guest)
                    closeModal()
                }} />
        })
    }

    return (
        <View style={styles.container}>
            <NestableScrollContainer contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.list}>
                    {tables.map((table, index) => {
                        const guests = guestsRecord[table.id] || [];

                        return (
                            <TableItem filledCount={guests.length} key={table.id} title={`Стол №${index + 1}`}
                                slots={{
                                    content: <NestableDraggableFlatList
                                        data={guests}
                                        renderItem={({ item, drag }) => {
                                            return <ScaleDecorator>
                                                <TouchableOpacity onLongPress={drag} delayLongPress={100}>
                                                    <GuestItem
                                                        guest={item}
                                                        onRemove={() => removeGuest(item.id)}
                                                    />
                                                </TouchableOpacity>
                                            </ScaleDecorator>
                                        }}
                                        keyExtractor={(item) => item.id}
                                        contentContainerStyle={styles.guestList}
                                        onDragEnd={({ data }) => updateGuests(data)}
                                        ListEmptyComponent={<Text style={styles.empty}>Добавьте гостей</Text>}
                                    />,
                                    actions: <View style={styles.actions}>
                                        <Button disabled={guests.length >= 8} color='white' title="➕" onPress={() => handleAddGuest(table.id)} />
                                        <Button color='white' title="❌" onPress={() => removeTable(table.id)} />
                                    </View>
                                }}
                            />
                        )
                    })}
                </View>
            </NestableScrollContainer>
            <Button
                onPress={addTable}
                title="Добавить стол"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1
    },
    container: {
        flex: 1,
        padding: 5,
    },
    list: {
        flex: 1,
        gap: 10,
        paddingBottom: 20,
    },
    actions: {
        flexDirection: 'row',
        gap: 5,
    },
    guestList: {
        padding: 5,
        gap: 5,
    },
    empty: {
        height: 50,
        textAlign: 'center',
        verticalAlign: 'middle',
    }
})