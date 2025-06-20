import { CreateGuestForm, GuestItem, useGuests } from "@/entities/guest";
import { TableItem } from "@/entities/table";
import { useTables } from "@/entities/table/model/use-tables";
import { Button } from "@/shared/ui/button";
import { useModal } from "@/shared/ui/modals/use-modal";
import { Text } from "@/shared/ui/text";
import { ScrollView, StyleSheet, View } from "react-native";
import { NestableDraggableFlatList, NestableScrollContainer } from "react-native-draggable-flatlist";


export const TablesList = () => {
    const { tables, removeTable, addTable } = useTables()
    const { addGuest, guestsRecord, removeGuest } = useGuests()

    const { open: openModal, close: closeModal } = useModal()

    const handleAddGuest = (tableId: string) => {
        openModal({
            content: <CreateGuestForm tableId={tableId} onSubmit={(guest) => {
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
                                    // content: <View style={styles.guestList}>
                                    //     {
                                    //         guests.map((guest) => (
                                    //             <GuestItem key={guest.id} guest={guest} onRemove={removeGuest} />
                                    //         )) || <Text style={styles.empty}>Добавьте гостей</Text>
                                    //     }
                                    // </View>,
                                    content: <NestableDraggableFlatList
                                        data={guests}
                                        renderItem={({ item }) => {

                                            return <View style={{ borderWidth: 2, borderColor: 'red' }}>
                                                <GuestItem key={item.id} guest={item} onRemove={removeGuest} />
                                            </View>
                                        }}
                                        keyExtractor={(item) => item.id}
                                        contentContainerStyle={styles.guestList}
                                        onDragEnd={({ data }) => console.log(data)}
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