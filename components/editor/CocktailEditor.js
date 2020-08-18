import React, { useState } from 'react'
import {
    StyleSheet, Text, View, Button, Modal, TextInput, FlatList, TouchableHighlightComponent, TouchableHighlight, TouchableOpacity
} from 'react-native'

import CocktailPreview from './CocktailPreview'
import CocktailNameEditor from './CocktailNameEditor'
import CocktailGarnishEditor from './CocktailGarnishEditor'
import CocktailIngredientsEditor from './CocktailIngredientsEditor'
import CocktailIngredientEditor from './CocktailIngredientEditor'

const CocktailEditor = props => {
    const [currentEditor, setCurrentEditor] = useState(props.cocktail ? 'preview' : 'name')
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [garnish, setGarnish] = useState('')
    const [ingredient, setIngredient] = useState({})

    const editIngredient = () => {
        setIngredient({})
        setCurrentEditor('ingredient')
    }

    const viewSelector = () => {
        switch (currentEditor) {
            case 'preview':
                return <CocktailPreview
                    name={name}
                    ingredients={ingredients}
                    garnish={garnish}
                    openEditor={setCurrentEditor}
                />
            case 'name':
                return <CocktailNameEditor
                    name={name}
                    setName={setName}
                    selectEditor={setCurrentEditor}
                />
            case 'garnish':
                return <CocktailGarnishEditor
                    garnish={garnish}
                    setGarnish={setGarnish}
                    selectEditor={setCurrentEditor}
                />
            case 'ingredients':
                return <CocktailIngredientsEditor
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    selectEditor={setCurrentEditor}
                    editIngredient={editIngredient}
                />
            case 'ingredient':
                return <CocktailIngredientEditor
                    ingredient={ingredient}
                    setIngredient={setIngredient}
                />
        }
    }

    return (
        <View style={styles.cocktailEditor}>
            {viewSelector()}
        </View>
    )
}

const styles = StyleSheet.create({
    cocktailEditor: {
        borderColor: 'green',
        borderWidth: 2,
        flexGrow: 0
    }
})

export default CocktailEditor