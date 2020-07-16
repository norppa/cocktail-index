import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, FlatList } from 'react-native';

const Cocktail = props => {

    const [showFullInfo, setShowFullInfo] = useState(false)

    const handleClick = () => {
        if (showFullInfo) {
            setShowFullInfo(false)
        } else {
            setShowFullInfo(true)
            props.scrollTo(props.index)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={handleClick}>
            <View style={styles.itemCard}>
                <Text>{props.cocktail.name}</Text>
                {showFullInfo &&
                    <FlatList
                        data={props.cocktail.ingredients}
                        keyExtractor={(item, index) => item.id + '_ingredient_' + index}
                        renderItem={({ item }) => {
                            return <Text>{`\u2022 ${item.amount} ${item.name}`} </Text>
                        }}
                    />
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
        marginVertical: 5
    }
})

export default Cocktail