import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native';
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

const CocktailText = props => {
    return (
        <Text style={{ ...styles.cocktailText, ...props.style }}>
            {props.children}
        </Text>
    )
}

const Cocktail = props => {
    let [fontsLoaded] = useFonts({ CherryCreamSoda_400Regular, Alegreya_500Medium })

    const [showFullInfo, setShowFullInfo] = useState(false)

    const handleClick = () => {
        if (showFullInfo) {
            setShowFullInfo(false)
        } else {
            setShowFullInfo(true)
            props.scrollTo(props.index)
        }
        console.log(props.cocktail)
    }

    if (!fontsLoaded) {
        return <Text>Wait</Text>
    }

    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <View style={styles.itemCard}>
                <Text style={styles.name}>{props.cocktail.name}</Text>

                {showFullInfo &&
                    <View>

                        <FlatList
                            style={styles.ingredients}
                            data={props.cocktail.ingredients}
                            keyExtractor={(item, index) => item.id + '_ingredient_' + index}
                            renderItem={({ item }) => {
                                return <CocktailText style={styles.ingredient}>{`\u2022 ${item.amount} ${item.name}`} </CocktailText>
                            }}
                        />

                        <CocktailText style={styles.garnish}>{props.cocktail.garnish || 'no garnish'}</CocktailText>
                        <CocktailText style={styles.method}>{props.cocktail.method}</CocktailText>
                    </View>
                }

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    itemCard: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 5,
        padding: 10
    },
    nameView: {
    },
    name: {
        fontFamily: 'CherryCreamSoda_400Regular',
        fontSize: 24,

    },
    cocktailText: {
        fontFamily: 'Alegreya_500Medium',
        fontSize: 22
    },
    ingredients: {
        marginTop: 10,
        marginLeft: 10
    },
    ingredient: {
    }

})

export default Cocktail