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
                <View style={styles.randomContainer}>{
                    ((this.randomNumbers)/* .sort(function() {
                        return .5 - Math.random();
                      }) */).map((randNumber, index) => {
                        return(
                        <Text style={styles.random} key={index}>{randNumber}</Text>
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
    target: {
        fontSize: 40,
        backgroundColor: 'black',
        color:'white',
        margin: 50,
        textAlign: 'center',
        borderRadius: 5,
    },
    randomContainer:{
        flex:1,
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-around',
    },
    random:{
        backgroundColor:'#aaa',
        textAlign: 'center',
        borderRadius: 50,
        marginHorizontal: 50,
        marginVertical:25,
        fontSize:35,
        padding:5,
        width:100,
    }
});

export default Game;