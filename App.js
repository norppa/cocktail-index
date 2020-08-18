import React, { useState } from 'react';
import { Text, AsyncStorage } from 'react-native';


import Viewer from './components/viewer/Viewer'
import {
  getCocktails,
  readLocalStore,
  writeLocalStore
} from './rest'


export default function App() {
  const [error, setError] = useState(null)
  const [cocktails, setCocktails] = useState([])
  const [selected, setSelected] = useState(null)
  const [editorView, setEditorView] = useState(false)

  const initialize = async () => {
    let cocktails = await getCocktails()
    if (cocktails.error) {
      console.log('could not read database (' + cocktails.error + '), using local storage')
      cocktails = readLocalStore()
    } else {
      writeLocalStore(cocktails)
    }
    setCocktails(cocktails)

  }

  React.useEffect(() => {
    initialize()
  }, [])

  const select = (index) => {
    if (selected == index) {
      setSelected(null)
    } else {
      setSelected(index)
    }
  }

  const closeEditorView = (withReload) => {
    if (withReload) {
      initializeCocktails()
    }
    setEditorView(false)
  }

  const openEditorView = () => {
    setEditorView(true)
  }


  console.log('cocktails', cocktails)
  return <Viewer cocktails={cocktails}
    selectedIdx={selected}
    select={select}
    openEditor={openEditorView}
  />
}