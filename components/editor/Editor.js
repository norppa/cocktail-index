import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, FlatList, Image } from 'react-native'
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


import IngredientInput from './IngredientInput'
import Input from './Input'
import Dialog from './Dialog'

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

    const [methodDialogVisible, setMethodDialogVisible] = useState(false)
    const [glassDialogVisible, setGlassDialogVisible] = useState(false)

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
    const setIngredient = (index, parameter, value) => {
        let newIngredients = ingredients.map((ingredient, i) => {
            if (i == index) {
                return { ...ingredient, [parameter]: value }
            } else {
                return ingredient
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

    const GlassCard = (props) => {
        return (
            <TouchableWithoutFeedback onPress={props.select}>
                <View style={[props.style, styles.glassCard]}>
                    <Image style={styles.glassImg} source={images[props.glass]} />
                    <Text style={styles.text}>{props.glass}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }



    const selectMethod = (method) => () => {
        setMethod(method)
        setMethodDialogVisible(false)
    }

    const selectGlass = (glass) => () => {
        setGlass(glass)
        setGlassDialogVisible(false)
    }

    return (
        <View style={styles.editor}>

            <Text style={styles.header}>Name</Text>
            <TextInput style={[styles.inputArea, styles.input]} value={name} onChange={setName} />

            <Text style={styles.header}>Ingredients</Text>
            <FlatList
                style={styles.inputArea}
                data={ingredients}
                keyExtractor={(item, index) => item.id + '_ingredient_' + index}
                renderItem={listItem => <IngredientInput style={styles.input} item={listItem} onChange={setIngredient} />}
            />

            {/* 
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
             */}

            <Text style={styles.header}>Garnish</Text>
            <TextInput style={[styles.inputArea, styles.input]} value={garnish} onChange={setGarnish} />

            <Text style={styles.header}>Method</Text>
            <TouchableWithoutFeedback onPress={setMethodDialogVisible.bind(this, true)}>
                <Text style={[styles.inputArea, styles.input]}>{method}</Text>
            </TouchableWithoutFeedback>

            <Dialog visible={methodDialogVisible}>
                <FlatList
                    data={availableMethods}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableWithoutFeedback onPress={selectMethod(item)}>
                                <Text style={[styles.input, styles.modalInput]}>{item}</Text>
                            </TouchableWithoutFeedback>
                        )
                    }}
                    keyExtractor={(item, index) => index + item}
                />
            </Dialog>

            <Text style={styles.header}>Glassware</Text>
            <GlassCard style={[styles.inputArea, styles.input]} select={setGlassDialogVisible.bind(this, true)} glass={glass} />

            <Dialog visible={glassDialogVisible}>
                <FlatList
                    data={availableGlasses}
                    renderItem={({ item, index }) => <GlassCard select={selectGlass(item)} glass={item} />}
                    keyExtractor={(item, index) => index + item}
                />
            </Dialog>


            <Text style={styles.header}>Information</Text>
            <TextInput
                value={info}
                multiline={true}
                style={[styles.input, styles.inputArea, { textAlignVertical: 'top' }]}
                numberOfLines={4}
                onChange={setInfo}
            />

            <View style={styles.buttons}>
                <Button title="Save" onPress={save} />
                <Button title="Cancel" onPress={cancel} />
            </View>


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
    text: {
        fontFamily: 'Alegreya_500Medium',
        fontSize: 20,
    },
    header: {
        fontFamily: 'CherryCreamSoda_400Regular',
        fontSize: 24,
        marginTop: 10,
        marginBottom: 5,
    },
    inputArea: {
        marginLeft: 30
    },
    input: {
        fontFamily: 'Alegreya_500Medium',
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        paddingLeft: 10,
    },
    modalInput: {
        marginLeft: 0,
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    },
    glassImg: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10,
    },
    glassCard: {
        borderWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
})