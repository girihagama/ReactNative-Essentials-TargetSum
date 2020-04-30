import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

class Game extends Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    }
    state = {
        selectedNumbers: [],
    }
    //generate random numbers
    randomNumbers = Array.from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    //getting sum of random 3 itams
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    isNumberSelected = (numberIndex) => {
        return this.state.selectedNumbers.indexOf(numberIndex) >= 0;
    }
    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({selectedNumbers: [...prevState.selectedNumbers,numberIndex]}));
    };
    render() {
        console.log('Selected Number Array', this.state.selectedNumbers);
        console.log('Generated Array:', this.randomNumbers);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Find The Sum:</Text>
                <Text style={styles.target}>{this.target}</Text>
                <Text style={styles.title}>Using 4 Numbers Of Following</Text>
                <View style={styles.randomContainer}>{
                    ((this.randomNumbers)/* .sort(function() {
                        return .5 - Math.random();
                      }) */).map((randNumber, index) => {
                        return (
                            <RandomNumber
                                key={index}
                                id={index}
                                number={randNumber}
                                isDisabled={this.isNumberSelected(index)}
                                onPress={this.selectNumber}
                            />
                        );
                    })
                }</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        paddingTop: 30,
    },
    title: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    target: {
        fontSize: 40,
        backgroundColor: 'black',
        color: 'white',
        margin: 50,
        textAlign: 'center',
        borderRadius: 5,
    },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
});

export default Game;