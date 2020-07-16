const generateDaiquiris = () => {
    let output = []
    for (let i = 0; i < 100; i++) {
        output = output.concat({
            id: 'cocktail_' + i,
            name: 'Daiquiri #' + i,
            ingredients: [
                { name: 'Rum', amount: '2 oz' },
                { name: 'Lime juice', amount: '1 oz' },
                { name: 'Simple syrup', amount: '1 oz' }
            ],
            garnish: 'none',
            method: 'shaken'


        })
    }
    return output
}

export default generateDaiquiris()