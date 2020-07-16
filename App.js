import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import initialData from './constants/intial_data'

export default function App() {
  const [data, setData] = useState(initialData)

  return (
    <View style={styles.main}>
      <Text>Cocktail Index</Text>

      <FlatList
        style={styles.list}
        data={data}
        renderItem={({ item, index }) => {
          return (
            <Text>{item.name}</Text>
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
  list: {
    width: '100%',
  }
})