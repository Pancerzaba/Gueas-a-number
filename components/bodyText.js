import React from 'react';
import {Text, StyleSheet} from 'react-native';

const BodyText = props =><Text style={styles.body}>{props.childern}</Text>

const styles= StyleSheet.create({
    body: {
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold'
    }
})

export default BodyText;