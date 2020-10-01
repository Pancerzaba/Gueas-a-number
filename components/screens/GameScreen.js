import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import NumberContainer from '../NumberContainer';
import Card from '../Card';
import MainButton from '../MainButton';
import Icon from 'react-native-vector-icons/Ionicons';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <Text>#{numOfRound}</Text>
        <Text>{value}</Text>
    </View>);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [avilableDeviceWidth, setAvilableDeviceWidth] = useState(Dimensions.get('window').width)
    const [avilableDeviceHeight, setAvilableDeviceHeight] = useState(Dimensions.get('window').height)

    const currentLow = useRef(1);
    const currentHight = useRef(100);

    const { userChoice, onGameOver } = props;
    useEffect(() => {
        const updateLayout =() =>{
            setAvilableDeviceWidth(Dimensions.get('window').width);
            setAvilableDeviceHeight(Dimensions.get('window').height);


        }

        Dimensions.addEventListener('change', updateLayout);

        return() =>{
            Dimensions.addEventListener('change', updateLayout);

        }
        
    });

    useEffect(() => {
        if (currentGuess === props.userChoice) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong ...', [{ text: 'Sorry! ', style: 'cancel' }]);
            return;
        };
        if (direction === 'lower') {
            currentHight.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1)
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    }
    let listContainerStyle = styles.listContainer;

    if(avilableDeviceWidth <350){
        listContainerStyle = styles.listConteinerBig;
    }

    if (Dimensions.get('window').height < 500) {
        return (
            <View style={styles.screen}>
                <Text style={styles.bold}>Opponent's Guess</Text>
                <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Icon name="md-remove" size={24} color="white" />
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Icon name="md-add" size={24} color="white" />
                </MainButton>
                </View>
                <View style={styles.listContainer}>

                    <ScrollView contentContainerStyle={styles.list} >

                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView>
                </View>
            </View>);
    };
    

    return (
        <View style={styles.screen}>
            <Text style={styles.bold}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                    <Icon name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Icon name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>

                <ScrollView contentContainerStyle={styles.list} >

                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>);

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 400,
        maxWidth: '90%',
        alignItems: 'center'
    },
    bold: {

        fontWeight: 'bold'
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        width:  '80%',
        flex: 1
    },
    listConteinerBig:{
        width: Dimensions.get('window').width > 500 ? '60%' : '80%',
        flex: 1
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    }

});

export default GameScreen;