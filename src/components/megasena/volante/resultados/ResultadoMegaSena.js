import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {vw, vh} from 'react-native-expo-viewport-units';
import {Card} from 'react-native-elements';
import NumberFormat from 'react-number-format';

import Axios from 'axios';

const ResultadoMegaSena = props => {
    let dezenas = [];
    dezenas.push(props.concurso.prDezena);
    dezenas.push(props.concurso.seDezena);
    dezenas.push(props.concurso.teDezena);
    dezenas.push(props.concurso.qaDezena);
    dezenas.push(props.concurso.qiDezena);
    dezenas.push(props.concurso.sxDezena);
    dezenas = dezenas.sort((a, b) => {
        return a < b ? -1 : a === b ? 0 : 1;
    });
    const concurso = props.concurso;
    const type = props.type;
    const escolhidos = props.escolhidos;
    const {vlAcumulado, vlEstimativaPremio} = concurso;
    const [detalhesConcurso, setDetalhesConcurso] = useState({});
    const [concursosBuscados, setConcursosBuscados] = useState([]);

    let data = new Date(concurso.dtSorteio);
    data = `${
        data.getDay().toString().length == 2
            ? data.getDay()
            : '0'.concat(data.getDay())
    }/${
        data.getMonth().toString().length == 2
            ? data.getMonth()
            : '0'.concat(data.getMonth())
    }/${data.getFullYear()}`;

    function getDetalhesConcurso(nrConcurso) {
        let concurso = concursosBuscados.find(
            concurso => concurso.nrConcurso === nrConcurso,
        );
        if (concurso) {
            setDetalhesConcurso(concurso);
            return;
        }

        Axios.get(
            `http://loteria-api.herokuapp.com/megasena/${nrConcurso}`,
        ).then(resp => {
            const concursos = concursosBuscados;
            concurso = resp.data;
            concursos.push(concurso);
            setDetalhesConcurso(concurso);
            setConcursosBuscados(concursos);
        });
    }

    return (
        <TouchableNativeFeedback
            onPress={() => getDetalhesConcurso(concurso.idConcurso)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <Card
                containerStyle={styles.containerMain}
                key={concurso.idConcurso}
                title={
                    <View style={styles.containerConcurso}>
                        <View>
                            <Text style={styles.idConcurso}>
                                Concurso nº {concurso.idConcurso}
                            </Text>
                            <Text>Em {data}</Text>
                        </View>
                        <Text style={styles.vlAcumulado}>
                            {vlAcumulado === 0 ? (
                                <>
                                    <Text>Premiação </Text>
                                    <NumberFormat
                                        value={vlEstimativaPremio}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'R$'}
                                        renderText={vlEstimativaPremio => (
                                            <Text>{vlEstimativaPremio}</Text>
                                        )}
                                    />
                                </>
                            ) : (
                                `Acumulou R$ ${vlAcumulado}`
                            )}
                        </Text>
                    </View>
                }>
                <View style={styles.dezenas}>
                    {dezenas.map(d => (
                        <View
                            key={'dezena' + d}
                            style={[
                                styles.dezena,
                                escolhidos.some(e => e === d)
                                    ? styles.dezenaBgMatch
                                    : styles.dezenaBg,
                            ]}>
                            <Text style={styles.dezenaText}>{d}</Text>
                        </View>
                    ))}
                </View>
                {detalhesConcurso.idConcurso === concurso.idConcurso ? (
                    <View>
                        <Text>{detalhesConcurso.dtSorteio}</Text>
                        <Text>{detalhesConcurso.vlRateioQuadra}</Text>
                    </View>
                ) : (
                    <View />
                )}
            </Card>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    containerMain: {
        paddingHorizontal: 0,
        marginHorizontal: 2,
        marginVertical: 2,
    },
    containerConcurso: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
    idConcurso: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    vlAcumulado: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#aeac16',
    },
    dezenas: {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 2,
    },
    dezena: {
        margin: 2,
        width: vw(12),
        height: vh(6),
        borderRadius: 3,
        borderColor: '#a196a0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dezenaBg: {
        backgroundColor: 'rgba(255,197,27,0.56)',
    },
    dezenaBgMatch: {
        backgroundColor: 'rgba(61,158,47,0.56)',
    },
    dezenaText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ResultadoMegaSena;
