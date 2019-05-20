window.addEventListener('DOMContentLoaded', e => {

    // SET UP ELEMENTS
    const items = Array.from(document.getElementsByClassName('item'))
    const submit = document.getElementById('submit')

    // GENERATE SHOPPING LIST
    let shoppingList = {}
    submit.addEventListener('click', e => {
        items.forEach(item => {    
            shoppingList[item.name] = +item.value
        })
        console.log('shoppingList', shoppingList)
    })

    // PRICE SHOPPING LIST
    const groceries = $.getJSON({ 'url': "./groceries.json", 'async': false }).responseJSON
    console.log('groceries', groceries)
    console.log('shoppingList', shoppingList)

    /*
    TO DO:
    - replicate the below Python function in JS.
    - use the groceries.json file to retrieve the prices for each item in each city

    def getPricesAllCities(shoppingList):
        '''Get the prices for the items in the shopping list, for ALL locations'''
        allCityPrices = dict()
        for city_id in groceries.city_id.unique():
            try:
                groceriesInCity = groceries[groceries.city_id == city_id]
                shoppingListPrices = dict()
                for item in shoppingList:
                    numItems = shoppingList[item]
                    price = groceriesInCity[groceriesInCity.item == item].average_price.iloc[0]
                    total_cost = numItems * price
                    shoppingListPrices[item] = round(total_cost, 2)
            except:
                pass
            allCityPrices[city_id] = getTotalPrice(shoppingListPrices)
        
        # Convert dict to dataframe
        allCityPrices = pd.DataFrame([allCityPrices.keys(), allCityPrices.values()], index=['city_id', 'totalPrice']).transpose()    
        return allCityPrices
    */



});