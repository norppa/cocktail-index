import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, FlatList } from 'react-native';

import initialData from './constants/intial_data'
import Cocktail from './components/Cocktail'
import AddCocktailModal from './components/AddCocktailModal';

export default function App() {
  const [cocktails, setCocktails] = useState(initialData)
  const [searchInput, setSearchInput] = useState('')
  const [showAddCocktail, setShowAddCocktail] = useState(false)

  const scrollTo = (index) => {
    console.log('scrollTo called', { index })
    _flatList.scrollToIndex({ index })
  }

  const saveCocktail = (cocktail) => {
    const id = 'cocktail_' + cocktails.length
    setCocktails(cocktails => [...cocktails, { ...cocktail, id }])
    setShowAddCocktail(false)
  }

  return (
    <View style={styles.main}>
      <Text>Cocktail Index</Text>

      <View style={styles.controls}>
        <TextInput style={styles.input} onChangeText={setSearchInput} value={searchInput} />
        <View style={styles.addButton}>
          <Button title="new" onPress={setShowAddCocktail.bind(this, true)} />
        </View>
      </View>

      <FlatList
        ref={flatList => _flatList = flatList}
        style={styles.list}
        data={cocktails}
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

      <AddCocktailModal
        show={showAddCocktail}
        close={setShowAddCocktail.bind(this, false)}
        save={saveCocktail} />

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
  addButton: {
    marginLeft: 20,
    borderColor: 'red'
  },
  input: {
    width: '60%',
    borderWidth: 1
  },
  list: {
    width: '100%',
  }
})