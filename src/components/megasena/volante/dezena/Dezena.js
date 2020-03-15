import {Text, TouchableNativeFeedback, View} from 'react-native';
import React from 'react';
import styles from '../../styles';

const Dezena = props => {
    const dezena = props.dezena;
    const fn = props.fn;
    return (
        <TouchableNativeFeedback
            key={dezena.id}
            onPress={() => fn(dezena)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View
                style={[
                    styles.dezena,
                    dezena.escolhida
                        ? styles.dezenaSelecionada
                        : styles.dezenaDefault,
                ]}>
                <Text
                    style={
                        dezena.escolhida
                            ? styles.dezenaSelecionada
                            : styles.dezenaDefault
                    }>
                    {dezena.id}
                </Text>
            </View>
        </TouchableNativeFeedback>
    );
};

export default Dezena;
