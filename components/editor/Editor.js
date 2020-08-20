import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native'
import { useFonts, CherryCreamSoda_400Regular } from '@expo-google-fonts/cherry-cream-soda'
import {
    Alegreya_400Regular,
    Alegreya_400Regular_Italic,
    Alegreya_500Medium,
    Alegreya_500Medium_Italic,
    Alegreya_700Bold,
    Alegreya_700Bold_Italic,
    Alegreya_800ExtraBold,
    Alegreya_800ExtraBold_Italic,
    Alegreya_900Black,
    Alegreya_900Black_Italic
} from '@expo-google-fonts/alegreya'


import Input from './Input'

import {
    saveNewIngredient,
    getAvailable,
    saveCocktail
} from '../../rest'

import images from '../../img/images'

const emptyIngredient = { name: '', amount: '' }

const Editor = (props) => {
    const [availableIngredients, setAvailableIngredients] = useState([])
    const [availableGlasses, setAvailableGlasses] = useState([])
    const [availableMethods, setAvailableMethods] = useState([])
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [ingredients, setIngredients] = useState([emptyIngredient])
    const [garnish, setGarnish] = useState('')
    const [method, setMethod] = useState('Shaken')
    const [glass, setGlass] = useState(null)
    const [info, setInfo] = useState('')


    let [fontsLoaded] = useFonts({ CherryCreamSoda_400Regular, Alegreya_500Medium, Alegreya_700Bold })

    useEffect(() => {
        const fetchadditionalInfo = async () => {
            setAvailableIngredients(await getAvailable('ingredients'))
            setAvailableGlasses(await getAvailable('glasses'))
            setAvailableMethods(await getAvailable('methods'))
        }

        loadCocktailInfo()
        fetchadditionalInfo()

    }, [])

    const loadCocktailInfo = () => {
        if (props.cocktail) {
            const { id, name, ingredients, garnish, method, glass, info } = props.cocktail
            setId(id)
            setName(name)
            setIngredients(ingredients.concat(emptyIngredient))
            garnish && setGarnish(garnish)
            glass && setGlass(glass)
            method && setMethod(method)
            info && setInfo(info)
        }

    }

    /*
    *  Ingredient list has always an empty item at the end. 
    */
    const changeIngredient = (index, replacement) => {
        let newIngredients = ingredients.map((item, i) => {
            if (i !== index) {
                return item
            } else {
                return { ...item, ...replacement }
            }
        })

        // if a property value was added to the last item, create a new empty last item
        if (index == ingredients.length - 1) {
            newIngredients = newIngredients.concat(emptyIngredient)
        }

        // if second to last ingredient is empty, remove the last (empty) ingredient
        if (index == ingredients.length - 2) {
            const { name, amount } = newIngredients[index]
            if (name == '' && amount == '') {
                newIngredients = newIngredients.slice(0, newIngredients.length - 1)
            }
        }

        setIngredients(newIngredients)
    }

    const onIngredientAmountChange = (index) => (event) => {
        changeIngredient(index, { amount: event.target.value })
    }

    const onIngredientNameChange = (index) => (replacement) => {
        changeIngredient(index, replacement)
    }

    const addIngredient = async (index) => {
        const success = await saveNewIngredient(ingredients[index].name)
        if (success) {
            setAvailableIngredients(await getAvailableIngredients())
            setIngredients(ingredients => ingredients.map((ingredient, i) => {
                if (i == index) {
                    const { name, amount } = ingredients[index]
                    return { name, amount }
                } else {
                    return ingredient
                }
            }))
        }
    }

    const save = async () => {
        return false

        if (ingredients.some(ingredient => ingredient.isNew)) {
            console.error('cant save with new ingredients')
            return
        }

        const cocktail = {
            id: id ? id : undefined,
            name,
            ingredients: ingredients.slice(0, ingredients.length - 1),
            garnish,
            method,
            glass,
            info
        }
        const error = await saveCocktail(cocktail)
        if (error) {
            return console.error('could not save cocktail, error status:', error)
        }

        props.close(true)
    }

    const cancel = () => {
        props.closeEditor(false)
    }

    const setters = {
        name: (event) => setName(event.target.value),
        garnish: (event) => setGarnish(event.target.value),
        method: (event) => setMethod(event.target.value),
        glass: (type) => () => setGlass(type),
        info: (event) => setInfo(event.target.value)
    }

    if (!fontsLoaded) {
        return <Text>loading fonts...</Text>
    }

    const Button = (props) => {
        return (
            <TouchableHighlight style={styles.button}
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={props.onPress}>
                <Text style={styles.buttonText}>{props.title}</Text>
            </TouchableHighlight>
        )
    }

    return (
        <View style={styles.editor}>

            <Text style={styles.header}>Name</Text>
            <TextInput style={styles.input} value={name} onChange={setName} />

            <Text style={styles.header}>Garnish</Text>
            <TextInput style={styles.input} value={garnish} onChange={setGarnish} />

            <Text style={styles.header}>Information</Text>
            <TextInput style={styles.input}
                value={info}
                multiline={true}
                style={[styles.input, { textAlignVertical: 'top' }]}
                numberOfLines={4}
                onChange={setInfo}
            />

            <View style={styles.buttons}>

                <Button title="Save" onPress={save} />
                <Button title="Cancel" onPress={cancel} />
            </View>

            {/* <Input name="Ingredients">
                <div>
                    {ingredients.map((ingredient, index) => {
                        const { name, amount, isNew } = ingredient
                        return (
                            <div className={styles.ingredientRow} key={index}>
                                <img src={images.dot} className={styles.dot} />
                                <input type="text"
                                    className={styles.ingredientAmountInput}
                                    value={amount}
                                    onChange={onIngredientAmountChange(index)} />
                                <Autocomplete
                                    options={availableIngredients}
                                    value={ingredient}
                                    onChange={onIngredientNameChange(index)} />
                                {
                                    isNew &&
                                    <button className={styles.addIngredientButton}
                                        onClick={addIngredient.bind(this, index)}>+</button>
                                }
                            </div>
                        )
                    })}
                </div>
            </Input>



            <Input name="Method">
                <select value={method} onChange={setters.method}>
                    {availableMethods.map((method, i) => <option key={i} value={method}>{method}</option>)}
                </select>
            </Input>

            <Input name="Glassware">
                {availableGlasses.map((availableGlass, i) => {
                    return (
                        <img key={i}
                            className={`${styles.glassImg} ${availableGlass == glass ? styles.selectedGlassImg : null}`}
                            src={images[availableGlass]}
                            onClick={setters.glass(availableGlass)}
                        />
                    )
                })}
            </Input>

            <div className={styles.buttons}>
                <button onClick={save}>Save</button>
                <button onClick={cancel}>Cancel</button>
            </div> */}
        </View >
    )

}

export default Editor

const styles = StyleSheet.create({
    editor: {
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10
    },
    header: {
        fontFamily: 'CherryCreamSoda_400Regular',
        fontSize: 24,
        marginTop: 10,
        marginBottom: 5,
    },

    input: {
        fontFamily: 'Alegreya_500Medium',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        paddingLeft: 10,
        marginLeft: 30
    },

    buttons: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: '40%',
        borderWidth: 3,
        borderRadius: 5,
        padding: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'CherryCreamSoda_400Regular',
        fontSize: 24
    }



    //         // .content > * {
    //         //     width: 90 %;
    //         // }

    // input, select, textarea {
    //     font - family: 'Alegreya', serif;
    // font - size: 14pt;
    // padding - top: 3px;
    // padding - left: 5px;
    // border - radius: 5px;
    // border: 1px solid gray;
    // }

    // .ingredientRow {
    //     display: flex;
    //     margin - top: 3px;
    //     align - items: center;
    // }

    // .dot {
    //     width: 10px;
    //     height: 10px;
    //     margin - right: 5px;
    // }

    // .ingredientAmountInput {
    //     width: 3em;
    //     margin - right: 3px;
    // }

    // .ingredientNameInput {
    //     flex - grow: 1;
    // }

    // .addIngredientButton {
    //     margin - left: 3px;
    // }

    // textarea {
    //     height: 6em;
    //     resize: vertical;
    // }

    // .buttons {
    //     display: flex;
    //     justify - content: space - around;
    // }

    // .buttons > button {
    //     border: 2px solid black;
    //     border - radius: 5px;
    //     background - color: white;

    //     font - family: 'Cherry Cream Soda';
    //     font - size: 18pt;

    //     box - shadow: 2px 2px gray;
    //     outline: none;
    // }

    // .buttons > button: active {
    //     background - color: lightgray;
    // }

    // /* GLASS SELECTOR */

    // .glassImg {
    //     box - sizing: border - box;
    //     max - width: 60px;
    //     margin - left: 10px;
    //     border: 2px solid white;
    // }

    // .selectedGlassImg {
    //     border: 2px solid black;
    //     border - radius: 5px;
    //     box - shadow: 3px 3px gray;
    //     outline: none;
    // }
    // })
})