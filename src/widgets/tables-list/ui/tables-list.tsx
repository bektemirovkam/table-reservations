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
                    {tables.map((table, index) => {
                        const quests = questsRecord[table.id] || [];
                        return (
                            <TableItem filledCount={quests.length} key={table.id} title={`Стол №${index + 1}`}
                                slots={{
                                    content: <View style={styles.questList}>
                                        {
                                            quests.map((quest) => (
                                                <QuestItem key={quest.id} quest={quest} onRemove={removeQuest} />
                                            )) || <Text style={styles.empty}>Добавьте гостей</Text>
                                        }
                                    </View>,
                                    actions: <View style={styles.actions}>
                                        <Button disabled={quests.length >= 8} color='white' title="➕" onPress={() => handleAddQuest(table.id)} />
                                        <Button color='white' title="❌" onPress={() => removeTable(table.id)} />
                                    </View>
                                }}
                            />
                        )
                    })}
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
    questList: {
        padding: 5,
        gap: 5,
    },
    empty: {
        height: 50,
        textAlign: 'center',
        verticalAlign: 'middle',
    }
})