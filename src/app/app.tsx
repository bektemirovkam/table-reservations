import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Screen } from '@/shared/ui/screen';
import { ModalProvider } from '@/shared/ui/modals/modal-provider';
import { TablesList } from '@/widgets/tables-list';


export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ModalProvider>
        <Screen>
          <TablesList />
        </Screen>
      </ModalProvider>
    </SafeAreaProvider>
  );
}
