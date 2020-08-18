import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, FlatList } from 'react-native';
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
import images from '../../img/images'

const Cocktail = (props) => {
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
    let [fontsLoaded] = useFonts({ CherryCreamSoda_400Regular, Alegreya_500Medium, Alegreya_700Bold })

    const handleClick = () => {
        if (props.selected && !showAdditionalInfo) {
            // impossible by logic
            setShowAdditionalInfo(true)
        } else if (props.selected && showAdditionalInfo) {
            setShowAdditionalInfo(false)
            props.select()
        } else if (!props.selected && !showAdditionalInfo) {
            setShowAdditionalInfo(true)
            props.select()
        } else if (!props.selected && showAdditionalInfo) {
            setShowAdditionalInfo(false)
            props.select(true)
        }
    }
    // const handleClick = () => {
    //     if (showFullInfo) {
    //         setShowFullInfo(false)
    //     } else {
    //         setShowFullInfo(true)
    //         props.scrollTo(props.index)
    //     }
    // }

    const CocktailText = props => {
        return (
            <Text style={{ ...styles.cocktailText, ...props.style }}>
                {props.children}
            </Text>
        )
    }

    const GarnishText = () => {
        const garnish = 'Garnish: ' + (props.cocktail.garnish || 'No garnish')
        return <CocktailText style={styles.ingredients}>{garnish}</CocktailText>
    }

    const InfoText = () => {
        if (!props.cocktail.info) {
            return null
        }

        return <CocktailText style={styles.infoText}>{props.cocktail.info}</CocktailText>
    }

    const AdditionalInfo = () => {
        if (!showAdditionalInfo) {
            return null
        }

        return (
            <View style={styles.additionalInfo}>
                <View style={styles.row}>
                    <View style={styles.ingredientsCol}>
                        <FlatList
                            style={styles.ingredients}
                            data={props.cocktail.ingredients}
                            keyExtractor={(item, index) => item.id + '_ingredient_' + index}
                            renderItem={({ item }) => {
                                return <CocktailText style={styles.ingredient}>{`\u2022 ${item.amount} ${item.name}`} </CocktailText>
                            }}
                        />

                        <GarnishText />
                    </View>
                    <View style={styles.instructionsCol}>
                        {
                            props.cocktail.glass &&
                            <Image style={styles.glassImg} source={images[props.cocktail.glass]} alt={props.cocktail.glass} />
                        }
                        <Text style={styles.method}> {props.cocktail.method}</Text>
                    </View>
                </View>

                <InfoText />

            </View>
        )
    }

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>
    }

    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <View style={styles.itemCard}>
                <Text style={styles.name}>{props.cocktail.name}</Text>
                <AdditionalInfo />
            </View>
        </TouchableWithoutFeedback>
    )

}

export default Cocktail

const styles = StyleSheet.create({
    itemCard: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginVertical: 5,
        padding: 10
    },
    name: {
        fontFamily: 'CherryCreamSoda_400Regular',
        fontSize: 24,
        marginBottom: 5
    },
    cocktailText: {
        fontFamily: 'Alegreya_500Medium',
        fontSize: 22
    },
    ingredients: {
        marginLeft: 10
    },
    infoText: {
        marginTop: 10
    },
    glassImg: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    instructionsCol: {
        flexDirection: 'column',
        position: 'relative',
        bottom: 30,
        alignItems: 'center',
        marginBottom: -30,
    },
    method: {
        fontFamily: 'Alegreya_700Bold',
        fontSize: 18

    }

})