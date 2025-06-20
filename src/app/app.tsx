import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { Screen } from '../shared/ui/screen';


export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Screen>
      </Screen>
    </SafeAreaProvider>
  );
}
