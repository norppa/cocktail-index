import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

import CocktailElementEditor from './CocktailElementEditor'
const CcoktailGarnishEditor = props => {

    return (
        <CocktailElementEditor {...props}>
            <Text>Garnish:</Text>
            <TextInput style={styles.input} value={props.garnish} onChangeText={props.setGarnish}/>
        </CocktailElementEditor>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1
    }
})

export default CcoktailGarnishEditor