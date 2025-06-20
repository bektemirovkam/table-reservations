import { KeyboardAvoidingView, StyleSheet, View, ViewProps } from 'react-native';
import { isIos } from '@/shared/lib/platform';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenProps extends ViewProps {
    preset?: 'fixed' | 'scroll'; // на случай если нужно будет сделать скролл
}

export const Screen = ({ children, preset, style, ...rest }: ScreenProps) => {

    const insets = useSafeAreaInsets();

    return <View style={[
        styles.container,
        { paddingBottom: insets.bottom, paddingTop: insets.top, },
        style
    ]}
        {...rest}
    >
        <StatusBar style="auto" />
        <KeyboardAvoidingView behavior={isIos ? 'padding' : 'height'} style={styles.flex}>
            {children}
        </KeyboardAvoidingView>
    </View>
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: "100%",
        width: "100%",
    },
});