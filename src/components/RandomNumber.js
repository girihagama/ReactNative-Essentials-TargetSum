import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class RandomNumber extends Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
    };
    handlePrass = () => {
        console.log("Number Touched: ",this.props.number);
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePrass}>
                <Text style={styles.random}>{this.props.number}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    random: {
        backgroundColor: '#aaa',
        textAlign: 'center',
        borderRadius: 50,
        marginHorizontal: 50,
        marginVertical: 25,
        fontSize: 35,
        padding: 5,
        width: 100,
    }
});

export default RandomNumber;