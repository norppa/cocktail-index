import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, FlatList, AsyncStorage } from 'react-native';


import initialData from './constants/intial_data'
import Cocktail from './components/Cocktail'
import AddCocktailModal from './components/AddCocktailModal';

export default function App() {
  const [cocktails, setCocktails] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [showAddCocktail, setShowAddCocktail] = useState(false)
  const STORAGE_KEY = '@cocktails'

  const saveCocktailData = async (cocktails) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cocktails))
      console.log('data saved')
    } catch (e) {
      aleconsole.log('Failed to save the data to the storage' + e)
    }
  }

  const readCocktailData = async () => {
    try {
      const cocktails = await AsyncStorage.getItem(STORAGE_KEY)
  
      if (cocktails !== null) {
        setCocktails(JSON.parse(cocktails))
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage')
    }
  }

  React.useEffect(() => {
    console.log('effect, read data')
    readCocktailData()
  }, [])

  const scrollTo = (index) => {
    console.log('scrollTo called', { index })
    _flatList.scrollToIndex({ index })
  }

  const saveCocktail = (cocktail) => {
    const id = 'cocktail_' + cocktails.length
    const newCocktails = [...cocktails, { ...cocktail, id: 'cocktail_' + cocktails.length }]
    setCocktails(newCocktails)
    saveCocktailData(newCocktails)
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