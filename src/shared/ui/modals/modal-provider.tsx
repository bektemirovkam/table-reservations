import React, { useState, ReactNode } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ModalContext, ModalConfig } from './modal-context';



export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);

    const open = (config: ModalConfig) => {
        setContent(config.content);
        setVisible(true);
    };

    const close = () => {
        setVisible(false);
        setContent(null);
    };

    return (
        <ModalContext.Provider value={{ open, close }}>
            {children}
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={close}
            >
                <TouchableOpacity style={styles.backdrop} onPress={close} activeOpacity={1} />
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {content}
                    </View>
                </View>
            </Modal>
        </ModalContext.Provider>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        inset: 0,
        zIndex: 1,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        minWidth: '80%',
        position: 'relative',
        zIndex: 2,

    },
});