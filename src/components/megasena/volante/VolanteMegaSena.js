import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {Button, Card} from 'react-native-elements';
import Reactotron from 'reactotron-react-native';
import ResultadoMegaSena from './resultados/ResultadoMegaSena';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../modal/Loading';
import Axios from 'axios';
import styles from '../styles';

export default class VolanteMegaSena extends Component {
    constructor(props) {
        super(props);
        const numeros = [];

        for (let i = 1; i <= 60; i++) {
            numeros.push(i);
        }
        this.state = {
            numerosEscolhidos: [],
            resultados: undefined,
            numeros: numeros,
            modalVisible: false,
        };
    }

    seleciona(numero) {
        let numerosEscolhidos = this.state.numerosEscolhidos;
        let has = numerosEscolhidos.find(n => n === numero);

        if (has) {
            numerosEscolhidos = numerosEscolhidos.filter(n => n !== has);
            this.setState({numerosEscolhidos: numerosEscolhidos});
        } else if (numerosEscolhidos.length < 6) {
            numerosEscolhidos.push(numero);
            this.setState({numerosEscolhidos: numerosEscolhidos});
        }
    }

    limpar() {
        this.setState({resultados: undefined});
        this.setState({numerosEscolhidos: []});
    }

    buscarResultados() {
        this.setState({modalVisible: true});

        Axios.get(
            'https://loteria-api.herokuapp.com/megasena/find-concursos?dezenasUsuario=' +
                encodeURIComponent(this.state.numerosEscolhidos),
        )
            .then(resp => {
                if (resp.status === 200) {
                    const {data} = resp;
                    this.setState({resultados: data});
                } else if (resp.status === 204) {
                    this.setState({resultados: 'nocontent'});
                }

                this.setState({modalVisible: false});
            })
            .catch(err => {
                this.setState({modalVisible: false});
            });
    }

    render() {
        return (
            <>
                {this.state.modalVisible ? <Loading/> : <></>}

                <Card
                    containerStyle={styles.containerMain}
                    title="Selecione 6 dezenas">
                    <View style={styles.containerDezenas}>
                        {this.state.numeros.map(n => (
                            <TouchableNativeFeedback
                                key={n}
                                onPress={() => this.seleciona(n)}
                                background={TouchableNativeFeedback.SelectableBackground()}>
                                <View
                                    key={n}
                                    style={[
                                        styles.dezena,
                                        this.state.numerosEscolhidos.some(
                                            ne => ne === n,
                                        )
                                            ? styles.dezenaSelecionada
                                            : styles.dezenaDefault,
                                    ]}>
                                    <Text
                                        key={n}
                                        style={
                                            this.state.numerosEscolhidos.some(
                                                ne => ne === n,
                                            )
                                                ? styles.dezenaSelecionada
                                                : styles.dezenaDefault
                                        }>
                                        {n}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        ))}
                    </View>
                </Card>

                <View style={styles.buscar}>
                    <Button
                        buttonStyle={styles.buttonBuscar}
                        titleStyle={{fontSize: 22}}
                        disabled={this.state.numerosEscolhidos.length < 6}
                        title=" Buscar"
                        onPress={() => this.buscarResultados()}
                        icon={<Icon name="search" size={24} color="white"/>}
                    />
                </View>

                {!this.state.resultados ? (
                    <></>
                ) : (
                    <>
                        {this.state.resultados.senas ? (
                            this.state.resultados.senas.map(concurso => {
                                return (
                                    <ResultadoMegaSena
                                        key={concurso.nrConcurso}
                                        escolhidos={
                                            this.state.numerosEscolhidos
                                        }
                                        concurso={concurso}
                                        type="Sena"
                                    />
                                );
                            })
                        ) : (
                            <></>
                        )}

                        {this.state.resultados.quinas ? (
                            this.state.resultados.quinas.map(concurso => {
                                return (
                                    <ResultadoMegaSena
                                        key={concurso.nrConcurso}
                                        concurso={concurso}
                                        escolhidos={
                                            this.state.numerosEscolhidos
                                        }
                                        type="Quina"
                                    />
                                );
                            })
                        ) : (
                            <></>
                        )}
                        {this.state.resultados.quadras ? (
                            this.state.resultados.quadras.map(concurso => {
                                return (
                                    <ResultadoMegaSena
                                        key={concurso.nrConcurso}
                                        concurso={concurso}
                                        escolhidos={
                                            this.state.numerosEscolhidos
                                        }
                                        type="Quadra"
                                    />
                                );
                            })
                        ) : (
                            <></>
                        )}
                    </>
                )}

                {this.state.resultados === 'nocontent' ? (
                    <Text>{'Nenhum resultado encontrado'}</Text>
                ) : !this.state.resultados ? (
                    <></>
                ) : (
                    <View style={styles.buscar}>
                        <Button
                            onPress={() => this.limpar()}
                            buttonStyle={styles.buttonLimpar}
                            titleStyle={{fontSize: 22}}
                            title=" Limpar"
                            icon={<Icon name="trash" size={24} color="white"/>}
                        />
                    </View>
                )}
            </>
        );
    }
}
