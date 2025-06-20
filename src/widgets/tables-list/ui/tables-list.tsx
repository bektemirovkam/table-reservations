import { CreateQuestForm, QuestItem, useQuests } from "@/entities/guest";
import { TableItem } from "@/entities/table";
import { useTables } from "@/entities/table/model/use-tables";
import { Button } from "@/shared/ui/button";
import { useModal } from "@/shared/ui/modals/use-modal";
import { Text } from "@/shared/ui/text";
import { ScrollView, StyleSheet, View } from "react-native";


export const TablesList = () => {
    const { tables, removeTable, addTable } = useTables()
    const { addQuest, questsRecord, removeQuest } = useQuests()

    const { open: openModal, close: closeModal } = useModal()

    const handleAddQuest = (tableId: string) => {
        openModal({
            content: <CreateQuestForm tableId={tableId} onSubmit={(quest) => {
                addQuest(quest)
                closeModal()
            }} />
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.list}>
                    {tables.map((table, index) => (
                        <TableItem key={table.id} title={`Стол №${index + 1}`}
                            slots={{
                                content: <View style={styles.questList}>
                                    {
                                        questsRecord['table.id']?.map((quest) => (
                                            <QuestItem quest={quest} onRemove={removeQuest} />
                                        )) || <Text>Добавьте гостей</Text>
                                    }
                                </View>,
                                actions: <View style={styles.actions}>
                                    <Button color='white' title="❌" onPress={() => removeTable(table.id)} />
                                    <Button color='white' title="➕" onPress={() => handleAddQuest(table.id)} />
                                </View>
                            }}
                        />
                    ))}
                </View>
            </ScrollView>
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
        padding: 5
    },
    list: {
        flex: 1,
        gap: 10,
    },
    actions: {
        flexDirection: 'row',
        gap: 5,
    },
    questList: {
        padding: 5
    },
    empty: {

    }
})