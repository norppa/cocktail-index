import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Text, Button } from 'react-native'

import CocktailElementEditor from './CocktailElementEditor'

const CocktailIngredientsEditor = props => {

    return (
        <CocktailElementEditor {...props}>
            <Text>Ingredients:</Text>

            <View style={styles.row}>
                <FlatList
                    style={styles.list}
                    data={props.ingredients}
                    ListEmptyComponent={() => <Text>No ingredients</Text>}
                    renderItem={({ item, index }) => {
                        return (
                            <Text>Item: {item.amount} {item.name}</Text>
                        )
                    }}
                />

                <Button title="add" onPress={props.editIngredient} />
            </View>


        </CocktailElementEditor>
    )
}

const styles = StyleSheet.create({
    list: {
        flexGrow: 0
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default CocktailIngredientsEditor