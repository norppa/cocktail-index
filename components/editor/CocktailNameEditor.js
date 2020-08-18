import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

import CocktailElementEditor from './CocktailElementEditor'
const CocktailNameEditor = props => {

    return (
        <CocktailElementEditor {...props}>
            <Text>Enter cocktail name:</Text>
            <TextInput style={styles.input} value={props.name} onChangeText={props.setName}/>
        </CocktailElementEditor>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1
    }
})

export default CocktailNameEditor