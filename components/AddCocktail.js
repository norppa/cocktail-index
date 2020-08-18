import React, { useState } from 'react'
import {
    StyleSheet, Text, View, Button, Modal, TextInput, FlatList, TouchableHighlightComponent, TouchableHighlight, TouchableOpacity
} from 'react-native'

const DialogBox = props => {
    console.log('props', props)
    return (
        <View style={{ ...props.style, ...styles.dialogBox }}>
            {props.children}

            <View style={styles.dialogBoxControls}>
                <Button title="previous" onPress={props.prev} disabled={!props.prev} />
                <Button title="cancel" onPress={props.cancel} />
                <Button title="preview" onPress={props.preview} />
                <Button title="next" onPress={props.next} disabled={!props.next}/>
            </View>
        </View>
    )
}

const PreviewBox = props => {
    return (
        <View>
            <Text>This is preview Box</Text>
            <Button title="close" onPress={props.close} />
        </View>
    )
}

const NameDialogBox = props => {
    return (
        <DialogBox {...props}>
            <Text>Cocktail name:</Text>
            <TextInput style={styles.textInput} />
        </DialogBox>
    )
}

const IngredientDialogBox = props => {
    return (
        <DialogBox {...props}>
            <Text>Ingredients:</Text>
        </DialogBox>
    )
}

const GarnishDialogBox = props => {
    return (
        <DialogBox {...props}>
            <Text>Garnish:</Text>
            <TextInput style={styles.textInput} />
        </DialogBox>
    )
}

const AddCocktail = props => {
    const [dialogBox, setDialogBox] = useState('name')
    const [cocktail, setCocktail] = useState({})

    const cancel = () => {
        setDialogBox('name')
        setCocktail({})
        props.close()
    }

    const dialogBoxSelect = () => {
        if (dialogBox == 'name') {
            return (<NameDialogBox
                next={setDialogBox.bind(this, 'ingredients')}
                cancel={cancel}
                preview={setDialogBox.bind(this, null)}
            />)
        } else if (dialogBox == 'ingredients') {
            return <IngredientDialogBox
                prev={setDialogBox.bind(this, 'name')}
                next={setDialogBox.bind(this, 'garnish')}
                cancel={cancel}
                preview={setDialogBox.bind(this, null)}
            />
        } else if (dialogBox == 'garnish') {
            return <GarnishDialogBox
                prev={setDialogBox.bind(this, 'ingredients')}
                cancel={cancel}
                preview={setDialogBox.bind(this, null)}
            />
        } else {
            return <PreviewBox close={cancel} />
        }
    }

    return (
        <Modal visible={props.show}>
            <View style={styles.container}>
                {dialogBoxSelect()}

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    dialogBox: {
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        width: '80%'
    },
    dialogBoxControls: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        borderWidth: 1
    }
})

export default AddCocktail
