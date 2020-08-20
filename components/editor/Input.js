import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useFonts, CherryCreamSoda_400Regular } from '@expo-google-fonts/cherry-cream-soda'

const Input = (props) => {

    return (
        <View>
            <View styles={styles.header}>{props.name}</View>
            <View styles={styles.content}>
                {props.children}
            </View>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({

    header: {
        fontFamily: 'CherryCreamSoda_400Regular',
        fontSize: 18,
        marginBottom: 5
    },

    content: {
        justifyContent: 'flex-end'
    }
})