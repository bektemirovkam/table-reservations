import { CreateGuestForm, Guest, GuestItem, useGuests } from "@/entities/guest";
import { TableItem } from "@/entities/table";
import { useTables } from "@/entities/table/model/use-tables";
import { Button } from "@/shared/ui/button";
import { useModal } from "@/shared/ui/modals/use-modal";
import { Text } from "@/shared/ui/text";
import { ScrollView, StyleSheet, View } from "react-native";
import { DraxProvider, DraxScrollView } from "react-native-drax";

const TABLE_LIMIT = 8; // Максимальное количество гостей за столом

export const TablesList = () => {
  const { tables, removeTable, addTable } = useTables();
  const { addGuest, guestsRecord, removeGuest, changeGuest } = useGuests();

  const { open: openModal, close: closeModal } = useModal();

  const handleAddGuest = (tableId: string) => {
    openModal({
      content: (
        <CreateGuestForm
          tableId={tableId}
          onSubmit={(guest) => {
            addGuest(guest);
            closeModal();
          }}
        />
      ),
    });
  };

  const handleReceiveDragDrop = (payload: Guest, tableId: string) => {
    const guests = guestsRecord[tableId] || [];
    const filledCount = guests.length;

    if (payload.tableId && payload.tableId === tableId) return;

    if (filledCount && filledCount >= TABLE_LIMIT) {
      openModal({
        content: (
          <View style={styles.filledTable}>
            <Text style={{ fontWeight: "bold" }}>Стол уже заполнен!</Text>
            <Text>
              Максимальное количество гостей за столом - {TABLE_LIMIT}.
            </Text>
            <Button color="red" title="OK" onPress={closeModal} />
          </View>
        ),
      });
      return;
    }

    changeGuest({
      ...payload,
      tableId,
    });
  };

  return (
    <DraxProvider>
      <View style={styles.container}>
        <DraxScrollView
          style={styles.draxScroll}
          contentContainerStyle={styles.scrollContentView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.list}>
            {tables.map((table, index) => {
              const guests = guestsRecord[table.id] || [];
              const filledPercent = (guests.length / TABLE_LIMIT) * 100;

              return (
                <TableItem
                  onReceiveDragDrop={(payload) =>
                    handleReceiveDragDrop(payload as Guest, table.id)
                  }
                  filledPercent={filledPercent}
                  key={table.id}
                  title={`Стол №${index + 1}`}
                  slots={{
                    content: (
                      <View style={styles.guestList}>
                        {guests.length ? (
                          guests.map((guest) => {
                            return (
                              <GuestItem
                                key={guest.id}
                                guest={guest}
                                onRemove={removeGuest}
                              />
                            );
                          })
                        ) : (
                          <Text style={styles.empty}>Добавьте гостей</Text>
                        )}
                      </View>
                    ),
                    actions: (
                      <View style={styles.actions}>
                        <Button
                          disabled={guests.length >= 8}
                          color="white"
                          title="➕"
                          onPress={() => handleAddGuest(table.id)}
                        />
                        <Button
                          color="white"
                          title="❌"
                          onPress={() => removeTable(table.id)}
                        />
                      </View>
                    ),
                  }}
                />
              );
            })}
          </View>
        </DraxScrollView>
        <Button onPress={addTable} title="Добавить стол" />
      </View>
    </DraxProvider>
  );
};

const styles = StyleSheet.create({
  draxScroll: {
    flex: 1,
  },
  scrollContentView: {
    flexGrow: 1,
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
    flexDirection: "row",
    gap: 5,
  },
  guestList: {
    padding: 5,
    gap: 5,
  },
  empty: {
    height: 50,
    textAlign: "center",
    verticalAlign: "middle",
  },
  filledTable: {
    gap: 10,
  },
});
