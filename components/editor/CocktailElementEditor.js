import React, { useState } from 'react'
import { StyleSheet, View, Button } from 'react-native'

const CocktailEelementEditor = props => {

    return (
        <View>
            {props.children}
            <View style={styles.controls}>
                <Button title="previous" onPress={props.prev} disabled={!props.prev} />
                <Button title="cancel" onPress={props.cancel} />
                <Button title="preview" onPress={props.selectEditor.bind(this, 'preview')} />
                <Button title="next" onPress={props.next} disabled={!props.next}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row'
    }
})

export default CocktailEelementEditor