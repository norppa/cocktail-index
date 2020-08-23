const STORAGE_KEY = '@cocktails'
const readLocalStore = async () => {
    try {
        const cocktails = await AsyncStorage.getItem(STORAGE_KEY)
        if (cocktails !== null) {
            return JSON.parse(cocktails)
        }
    } catch (error) {
        return { error: 'Failed to read local storage: ' + error }
    }
}

const writeLocalStore = async (cocktails) => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cocktails))
        return {}
    } catch (error) {
        return { error: 'Failed to read local storage: ' + error }
    }
}

const baseUrl = 'https://jtthaavi.kapsi.fi/subrosa/cocktail-index'
const getCocktails = async () => {
    const url = baseUrl
    const result = await fetch(url)
    if (result.status != 200) {
        console.error(result)
        return { error: result.status }
    } else {
        const cocktails = await result.json()
        return cocktails
    }
}

const getAvailable = async (type) => {
    const url = baseUrl + '/' + type
    const result = await fetch(url)
    if (result.status != 200) {
        console.error(result)
        return []
    } else {
        const resultJson = await result.json()
        return resultJson.map(item => item.name)
    }
}

const saveNewIngredient = async (name) => {
    const url = baseUrl + '/ingredient'
    const body = { ingredient: name }
    const result = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })

    if (Response.ok) {
        return { status: result.statusText }
    } else {
        return { error: await result.text() }
    }
}

const saveCocktail = async (cocktail) => {
    const method = cocktail.id ? 'PUT' : 'POST'
    const url = baseUrl
    const result = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cocktail)
    })

    if (result.status != 200) {
        console.error(result)
        return result.status
    }
}

export {
    getCocktails,
    getAvailable,
    saveNewIngredient,
    saveCocktail,
    readLocalStore,
    writeLocalStore
}