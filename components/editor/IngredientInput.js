import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, FlatList, Image } from 'react-native'

const IngredientInput = (props) => {
    const {item: {name, amount, isNew}, index} = props.item

    const onChangeAmount = (value) => props.onChange(index, 'amount', value)
    const onChangeName = (value) => props.onChange(index, 'name', value)
    
    return (
        <View style={styles.ingredientInput}>
            <Text style={styles.dot}>{`\u2022`}</Text>
            <TextInput style={[props.style, styles.amountInput]} value={amount} onChangeText={onChangeAmount} />
            <TextInput style={[props.style, styles.nameInput]}  value={name} onChangeText={onChangeName} />
        </View>
    )
}

export default IngredientInput

const styles = StyleSheet.create({
    ingredientInput: {
        flexDirection: 'row',
        marginBottom: 5
    },
    dot: {
        fontSize: 28
    },
    amountInput: {
        flex: 1,
        marginLeft: 5
    },
    nameInput: {
        flex: 4,
        marginLeft: 5
    }
})