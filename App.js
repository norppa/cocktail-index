import React, { useState } from 'react';
import { Text, AsyncStorage } from 'react-native';


import Viewer from './components/viewer/Viewer'
import Editor from './components/editor/Editor'
import {
  getCocktails,
  readLocalStore,
  writeLocalStore
} from './tools'


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
      initialize()
    }
    setEditorView(false)
  }

  const openEditorView = () => {
    setEditorView(true)
  }

  if (editorView) {
    return <Editor cocktail={cocktails[selected]} 
      closeEditor={closeEditorView}
    />
  }
  
  return <Viewer cocktails={cocktails}
    selected={selected}
    select={select}
    openEditor={openEditorView}
  />
}