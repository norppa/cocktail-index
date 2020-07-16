import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Modal, TextInput } from 'react-native';

const AddIngredientModal = props => {

    return (
        <Modal visible={props.show}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text>Add New Recipe</Text>
                    <View style={styles.inputNameRow}>
                        <Text>Name</Text>
                        <View style={styles.nameInput}><TextInput /></View>
                    </View>
                    <View>
                        <Modal visible={true}>
                            <Text> test modal</Text>
                        </Modal>
                    </View>
                    <View style={styles.buttonRow} >
                        <Button title="save" />
                        <Button title="close" onPress={props.close} />
                    </View>
                </View>
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
        width: '80%',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black'
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})

export default AddIngredientModal