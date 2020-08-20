import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, FlatList, AsyncStorage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Cocktail from './Cocktail'

const Viewer = (props) => {
  const [searchInput, setSearchInput] = useState('')

  const scrollTo = (index) => {
    console.log('scrollTo called', { index })
    // _flatList.scrollToIndex({ index })
  }

  return (
    <View style={styles.viewer}>
      <View style={styles.controls}>
        <View style={styles.textInput}>
          <TextInput type="text" value={searchInput} onChange={event => setSearchInput(event.nativeEvent.text)} />
        </View>
        <MaterialCommunityIcons name="square-edit-outline" size={32} color="black" onPress={props.openEditor} />
      </View>

      <FlatList
        style={styles.list}
        data={props.cocktails}
        renderItem={({ item, index }) => {
          if (!item.name.toLowerCase().includes(searchInput.toLowerCase())) {
            return null
          }
          return (
            <Cocktail cocktail={item}
              index={index}
              selected={index == props.selected}
              scrollTo={scrollTo}
              select={() => props.select(index)} />
          )
        }}
        keyExtractor={(item, index) => index + item.name}
      />
    </View>
  )

}


export default Viewer

const styles = StyleSheet.create({
  viewer: {
    marginHorizontal: '5%',
    marginTop: 40,
    alignItems: 'center',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  textInput: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10
  },
  list: {
    width: '100%',
  }
})