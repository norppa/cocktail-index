import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';

import initialData from './constants/intial_data'
import Cocktail from './components/Cocktail'

export default function App() {
  const [data, setData] = useState(initialData)
  const [searchInput, setSearchInput] = useState('')

  const scrollTo = (index) => {
    console.log('scrollTo called', { index })
    _flatList.scrollToIndex({ index })
  }

  return (
    <View style={styles.main}>
      <Text>Cocktail Index</Text>

      <View style={styles.controls}>
        <TextInput style={styles.input} onChangeText={setSearchInput} value={searchInput} />
      </View>

      <FlatList
        ref={flatList => _flatList = flatList}
        style={styles.list}
        data={data}
        renderItem={({ item, index }) => {
          if (!item.name.toLowerCase().includes(searchInput.toLowerCase())) {
            return null
          }
          return (
            <Cocktail
              cocktail={item}
              index={index}
              scrollTo={scrollTo} />
          )
        }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    marginHorizontal: '5%',
    marginTop: 20,
    alignItems: 'center',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  input: {
    width: '60%',
    borderWidth: 1
  },
  list: {
    width: '100%',
  }
})