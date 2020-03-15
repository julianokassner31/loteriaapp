import {StyleSheet} from 'react-native';
import {vh, vw} from 'react-native-expo-viewport-units';

const styles = StyleSheet.create({
    containerMain: {
        paddingHorizontal: 0,
        marginHorizontal: 2,
        marginVertical: 2,
    },
    containerDezenas: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dezena: {
        width: vw(9),
        height: vh(5),
        borderRadius: 2,
        marginHorizontal: 1,
        marginVertical: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dezenaDefault: {
        backgroundColor: 'rgb(238,240,238)',
        color: '#000000',
        fontWeight: 'bold',
    },
    dezenaSelecionada: {
        backgroundColor: '#359869',
        color: '#fff',
        fontWeight: 'bold',
        borderWidth: 0,
    },
    buscar: {
        marginHorizontal: 4,
        marginVertical: 6,
    },
    buttonBuscar: {
        backgroundColor: 'rgba(61,158,47,0.56)',
        height: vh(8),
        borderRadius: 5,
    },
    limparResultados: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    buttonLimpar: {
        backgroundColor: 'rgba(255,127,116,1)',
        borderRadius: 5,
        height: vh(8),
    },
    cardConcursos: {
        display: 'flex',
        padding: 2,
        marginBottom: 5,
        margin: 1,
    },
});

export default styles;
