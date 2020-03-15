import React from 'react';

import {StyleSheet, View, Text, Image} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Header = props => {
    return (
        <View style={styles.container}>
            <Image
            style={{width: 50, height: 50}}
            source={require('../../public/images/trevo.png')}
            />
            <Text style={styles.titulo}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        padding: 10,
        backgroundColor: '#359869',
    },

    titulo: {
        fontSize: 36,
        fontWeight: 'bold',
        letterSpacing: 2,
        color: Colors.white,
    },
});

export default Header;
