import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

class Game extends Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
    }
    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
    }
    
    //generate random numbers
    randomNumbers = Array.from({ length: this.props.randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
    //getting sum of random 3 itams
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    
    componentDidMount(){
        this.intervalId = setInterval(()=>{
            this.setState((prevState)=>{
                return {remainingSeconds: prevState.remainingSeconds - 1}
            },()=>{
                if(this.state.remainingSeconds === 0){
                    clearInterval(this.intervalId);
                }
            });
        },1000);
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
        this.setState((prevState) => ({ selectedIds: [...prevState.selectedIds, numberIndex] }));
    };

    //gameStatus : PLAYING, WON, LOST
    gameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        if(this.state.remainingSeconds === 0){
            return 'LOST';
        }
        if(sumSelected < this.target){
            return 'PLAYING';
        }
        if(sumSelected === this.target){
            return 'WON';
        }
        if(sumSelected > this.target){
            return 'LOST';
        }
        console.log('Game Status: ',sumSelected);
    };

    render() {        
        const gameStatus = this.gameStatus();       
        console.log('Selected Number Array: ', this.state.selectedIds);
        console.log('Generated Array:', this.randomNumbers);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Find The Sum:</Text>
                <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <Text style={styles.title}>Using 4 Numbers Of Following</Text>
                <View style={styles.randomContainer}>{
                    (this.randomNumbers).map((randNumber, index) => {
                        return (
                            <RandomNumber
                                key={index}
                                id={index}
                                number={randNumber}
                                isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                                onPress={this.selectNumber}
                            />
                        );
                    })
                }</View>
                <Text>{this.state.remainingSeconds}</Text>
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
    STATUS_PLAYING:{
        backgroundColor: 'black',
    },
    STATUS_WON:{
        backgroundColor: 'green',
    },
    STATUS_LOST:{
        backgroundColor: 'red',
    },
});

export default Game;