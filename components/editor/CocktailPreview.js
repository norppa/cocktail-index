import React from 'react'
import {
    StyleSheet, Text, View, Button, Modal, TextInput, FlatList, TouchableHighlightComponent, TouchableHighlight, TouchableOpacity
} from 'react-native'

const CocktailPreview = props => {

    return (
        <View>
            <Text>This is cocktail preview</Text>
            <TouchableHighlight onPress={props.openEditor.bind(this, 'name')}>
                {props.name ? <Text>{props.name}</Text> : <Text>No name</Text>}
            </TouchableHighlight>


            <TouchableHighlight onPress={props.openEditor.bind(this, 'ingredients')}>
                <FlatList
                    style={styles.list}
                    data={props.ingredients}
                    ListEmptyComponent={() => <Text>No ingredients</Text>}
                    renderItem={({ item }) => <Text>Item: {item.amount} {item.name}</Text>}
                />
            </TouchableHighlight>

            <TouchableHighlight onPress={props.openEditor.bind(this, 'garnish')}>
                {props.garnish ? <Text>{props.garnish}</Text> : <Text>No garnish</Text>}
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flexGrow: 0
    }
})

export default CocktailPreview