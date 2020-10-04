import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../constans/Colors';

const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 35,
        backgroundColor: Platform.OS === 'android' ? Colors.primary: 'white',
        alignItems: 'center',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc': 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
    },
    headerTitle: {
        color: Platform.OS === 'ios'? Colors.primary: 'white',
        fontSize: 18
    }
});

export default Header;
