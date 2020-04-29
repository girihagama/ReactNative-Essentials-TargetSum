import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class Game extends Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
    }
    //generate random numbers
    randomNumbers = Array.from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    //getting sum of random 3 itams
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);

    render() {
        console.log('Generated Array:',this.randomNumbers);
        return (
            <View style={styles.container}>
                <Text style={styles.target}>{this.target}</Text>
                {
                    ((this.randomNumbers).sort(function() {
                        return .5 - Math.random();
                      })).map((randNumber, index) => {
                        return(<Text key={index}>{randNumber}</Text>);
                    })
                }
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
    target: {
        fontSize: 40,
        backgroundColor: '#aaa',
        marginHorizontal: 50,
        textAlign: 'center',
        borderRadius: 5,
    },
});

export default Game;