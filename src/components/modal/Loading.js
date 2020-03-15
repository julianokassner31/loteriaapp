import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loading = props => {
    return (
        <Modal animationType="slide" transparent={false} visible={true}>
            <View style={styles.container}>
                <Text>Espere fazendo busca em nossos bancos de dados!</Text>
                <ActivityIndicator size="large" color="#333" />
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginHorizontal: 10,
    }
});

export default Loading;
