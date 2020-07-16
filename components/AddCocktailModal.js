import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Modal, TextInput, FlatList, TouchableHighlightComponent, TouchableHighlight, TouchableOpacity } from 'react-native';

import AddIngredientModal from './AddIngredientModal'

const IngredientCard = props => {
    const [nameInput, setNameInput] = useState(props.ingredient ? props.ingredient.name : '')
    const [ingredientAmountInput, setAmountInput] = useState(props.ingredient ? props.ingredient.amount : '')
    const saveBtnTitle = props.ingredient ? 'update' : 'add'

    const clear = () => {
        setNameInput('')
        setAmountInput('')
    }

    const save = () => {
        props.set({
            id: props.ingredient ? props.ingredient.id : undefined,
            name: nameInput,
            amount: ingredientAmountInput
        })
        clear()
        props.close()
    }

    const cancel = () => {
        clear()
        props.close()
    }

    const remove = () => {
        clear()
        props.delete(props.ingredient.id)
        props.close()
    }

    return (
        <View style={styles.modalContainer}>
            <View style={styles.row}>
                <Text>Ingredient</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setNameInput}
                    value={nameInput} />
            </View>
            <View style={styles.row}>
                <Text>Amount</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={setAmountInput}
                    value={ingredientAmountInput} />
            </View>

            <View style={{ ...styles.row, ...styles.buttonRow }}>
                <Button title={saveBtnTitle} onPress={save} />
                <Button title="clear" onPress={clear} />
                <Button title="cancel" onPress={cancel} />
                {props.ingredient && <Button title="remove" onPress={remove} />}
            </View>
        </View>
    )
}

const Ingredients = props => {
    if (props.ingredients.length == 0) {
        return (
            <TouchableHighlight onPress={props.addIngredient.bind(this, null)}>
                <Text>no ingredients</Text>
            </TouchableHighlight>
        )
    }

    return (
        <View>
            <FlatList
                data={props.ingredients}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={props.addIngredient.bind(this, item)}>
                            <Text>{`\u2022 ${item.amount} ${item.name}`}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <TouchableOpacity onPress={props.addIngredient.bind(this, null)}>
                <Text>{`\u2022 [add ingredient]`}</Text>
            </TouchableOpacity>
        </View>
    )

}

const AddCocktailModal = props => {
    const [showIngredientCard, setShowIngredientCard] = useState(false)
    const [nameInput, setNameInput] = useState('')
    const [garnishInput, setGarnishInput] = useState('')
    const [instructionsInput, setInstructionsInput] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [activeIngredient, setActiveIngredient] = useState(null)

    const setIngredient = (ingredient) => {
        const newIngredients = ingredient.id ?
            ingredients.map(oldIngredient => oldIngredient.id == ingredient.id ? ingredient : oldIngredient) :
            [...ingredients, { ...ingredient, id: 'ing_' + ingredients.length }]
        setIngredients(newIngredients)
    }

    const removeIngredient = (id) => {
        setIngredients(ingredients => ingredients.filter(ingredient => ingredient.id != id))
        setActiveIngredient(null)
    }

    const save = () => {
        props.save({
            id: Math.random(),
            name: nameInput,
            ingredients: ingredients,
            garnish: garnishInput,
            method: 'shaken'
        })
    }

    const clear = () => {
        setNameInput('')
        setIngredients([])
        setGarnishInput('')
        setInstructionsInput('')
    }

    const openIngredientCard = (ingredient) => {
        setActiveIngredient(ingredient)
        setShowIngredientCard(true)
    }

    const closeIngredientCard = () => {
        setActiveIngredient(null)
        setShowIngredientCard(false)
    }

    return (
        <Modal visible={props.show}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text>Add New Recipe</Text>
                    </View>
                    <View style={styles.name}>
                        <TextInput
                            placeholder="Cocktail Name"
                            onChangeText={setNameInput}
                            value={nameInput} />
                    </View>

                    <Ingredients ingredients={ingredients} addIngredient={openIngredientCard} />

                    <View style={styles.garnish}>
                        <TextInput
                            placeholder="No garnish"
                            onChangeText={setGarnishInput}
                            value={garnishInput}
                        />
                    </View>

                    <View style={styles.instructions}>
                        <TextInput
                            placeholder="No instructions"
                            onChangeText={setInstructionsInput}
                            value={instructionsInput}
                        />
                    </View>

                    <View style={styles.buttonRow} >
                        <Button title="save" onPress={save} />
                        <Button title="clear" onPress={clear} />
                        <Button title="close" onPress={props.close} />
                    </View>
                </View>

                {showIngredientCard &&
                    <IngredientCard
                        ingredient={activeIngredient}
                        set={setIngredient}
                        close={closeIngredientCard}
                        delete={removeIngredient}
                    />}

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        height: '100%'
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10

    },
    header: {
        alignItems: 'center',
        marginBottom: 10,
    },
    inputNameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameInput: {
        borderColor: 'black',
        borderWidth: 1,
        flex: 1
    },
    additionRow: {
        flexDirection: 'row'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    row: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 2,
        flex: 1,
        marginLeft: 20
    }
})

export default AddCocktailModal