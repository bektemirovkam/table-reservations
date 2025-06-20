import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Screen } from '@/shared/ui/screen';
import { ModalProvider } from '@/shared/ui/modals/modal-provider';
import { TablesList } from '@/widgets/tables-list';
import { StyleSheet } from 'react-native';


export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ModalProvider>
        <GestureHandlerRootView style={styles.root}>
          <Screen>
            <TablesList />
          </Screen>
        </GestureHandlerRootView>
      </ModalProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
})