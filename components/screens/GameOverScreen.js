import React from 'react';
import { Text, StyleSheet, View, Button, Image } from 'react-native';
import Colors from '../../constans/Colors';
//import BodyText from '../BodyText'
import MainButton from '../MainButton'


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.bold}>The Game is Over !</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/success.png')} style={styles.image} resizeMode="cover" />
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}
                    </Text> rounds to guess rounds Number 
                    <Text style={styles.highlight}> {props.userNumber}
                    </Text>.
            </Text>
            </View>
            <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
        </View >);
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary,
        fontWeight: 'bold'
    },

    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    }
});

export default GameOverScreen;