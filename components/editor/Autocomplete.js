import React, { useState } from 'react'
import { StyleSheet, View, Button, Text, TextInput, FlatList, AsyncStorage } from 'react-native'


const Autocomplete = (props) => {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [selectedSuggestion, setSelectedSuggestion] = useState(0)
    const [suggestionList, setSuggestionList] = useState([])

    const onUserInput = (event) => {
        const newInput = event.target.value
        if (newInput == '') {
            props.onChange({ name: '', isNew: false })
        } else {
            const filteredSuggestions = props.options.filter(item => {
                return item.toLowerCase().includes(newInput.toLowerCase())
            })
            setSuggestionList(filteredSuggestions)
            setShowSuggestions(filteredSuggestions.length > 0)
            const isWildInput = !props.options.some(option => option.toLowerCase() == newInput.toLowerCase())
            props.onChange({ name: newInput, isNew: isWildInput })
        }


    }

    const onKeyDown = (event) => {
        if (!showSuggestions) return undefined

        const keyCode = event.keyCode
        if (keyCode == 38) { // UP
            const newSelectedSuggestion = Math.max(0, selectedSuggestion - 1)
            setSelectedSuggestion(newSelectedSuggestion)
            props.onChange({ name: suggestionList[newSelectedSuggestion], isNew: false })
        } else if (keyCode == 40) { // DOWN
            const newSelectedSuggestion = Math.min(suggestionList.length - 1, selectedSuggestion + 1)
            setSelectedSuggestion(newSelectedSuggestion)
            props.onChange({ name: suggestionList[newSelectedSuggestion], isNew: false })
        } else if (keyCode == 13) { // ENTER
            props.onChange({ name: suggestionList[selectedSuggestion], isNew: false })
            setShowSuggestions(false)
        } else if (keyCode == 9) { // TAB
            setShowSuggestions(false)
        }
    }

    const onMouseDown = (index) => () => {
        props.onChange({ name: suggestionList[index], isNew: false })
        setShowSuggestions(false)
    }

    const onBlur = () => {
        setShowSuggestions(false)
    }

    const onFocus = () => {
        const filteredSuggestions = props.options.filter(item => {
            return item.toLowerCase().includes(props.value.name.toLowerCase())
        })
        setSuggestionList(filteredSuggestions)
        setShowSuggestions(filteredSuggestions.length > 0)
    }

    const Suggestions = () => {
        if (!showSuggestions) return null

        return (
            <View className={styles.suggestions}>
                {
                    suggestionList.map((option, i) => {
                        const rowStyles = `${styles.suggestionRow} ${i == selectedSuggestion ? styles.selected : null}`
                        return (
                            <Text key={i}
                                className={rowStyles}
                                value={option}
                                onMouseDown={onMouseDown(i)} />
                        )
                    })
                }
            </View>
        )
    }

    return (
        <View style={styles.autocomplete}>
            <TextInput style={[styles.input, props.value.isNew ? styles.highlight : null]}
                value={props.value.name}
                onChange={onUserInput}
                onKeyDown={onKeyDown}
                onBlur={onBlur}
                onFocus={onFocus}
            />
            <Suggestions />
        </View>
    )

}

export default Autocomplete

const styles = StyleSheet.create({


    autocomplete: {
        flexGrow: 1,
        position: relative;
    }
    
    // .input {
    //     box-sizing : border-box;
    //     width: 100%;
    //     outline: none;
    // }
    
    // .highlight {
    //     border-color: red;
    // }
    
    // .suggestions {
    //     position: absolute;
    //     z-index: 1;
    //     width: 100%;
    //     background-color: white;
    //     padding-top: 3px;
    //     padding-bottom: 3px;
    //     border-radius: 5px;
    //     border: 1px solid gray;
    //     cursor: pointer;
    // }
    
    // .suggestionRow {
    //     padding-left: 5px;
    // }
    
    // .selected {
    //     background-color: lightgray;
    // }


})