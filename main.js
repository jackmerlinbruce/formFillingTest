window.addEventListener('DOMContentLoaded', e => {

    // SET UP ELEMENTS
    const items = Array.from(document.getElementsByClassName('item'))
    const submit = document.getElementById('submit')

    // GENERATE SHOPPING LIST FROM INPUT
    submit.addEventListener('click', e => {
        let shoppingList = {}
        items.forEach(item => {    
            shoppingList[item.name] = +item.value
        })
        console.log(getTop10(sortPrice(getPricesAllCities(shoppingList))))
    })
    
    // PRICE SHOPPING LIST, GET TOP 10
    let getPricesAllCities = function(shoppingList) {
        const sum = array => array.reduce((a,b) => a + b, 0)
        const groceryPrices = $.getJSON({ 'url': "./groceries.json", 'async': false }).responseJSON
        let locationTotals = {}
        Object.keys(groceryPrices).forEach(location => {
            let locationTotal = []
            Object.keys(shoppingList).forEach(item => {
                let numItems = shoppingList[item]
                let priceItem = groceryPrices[location][item]
                locationTotal.push(numItems * priceItem)
            })
            if (!Number.isNaN(sum(locationTotal))) {
                locationTotals[location] = sum(locationTotal)
            }
        })
        return locationTotals
    }

    function sortPrice(obj) {
        var arr = []
        var prop
        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push({
                    'label': prop,
                    'value': obj[prop]
                })
            }
        }
        arr.sort(function(a, b) {
            return b.value - a.value
        });
        return arr
    }

    let getTop10 = function(sortedLocationTotals) {
        let top10 = Object.entries(sortedLocationTotals).slice(0, 10)
        let top10arr = []
        top10.forEach(city => {
            // Object.entries returns an array with [1] as the actual data
            top10arr.push(city[1])
        })
        return [{ 
            "key": "top10",
            "values": top10arr
        }]
    }

    /*
    json output needs to look like:
    [{"key": "cinema_ticket", "values": [{"label": "Akureyri, Iceland", "value": 136.5114956876565}, {"label": "Reykjavik, Iceland", "value": 115.59929966326438}, {"label": "Odense, Denmark", "value": 115.06523623568384}, {"label": "Zurich, Switzerland", "value": 108.95794431095909}, {"label": "Kolding, Denmark", "value": 105.0595635195374}, {"label": "Lucerne, Switzerland", "value": 100.30363266025489}, {"label": "Bergen, Norway", "value": 98.58528045684281}, {"label": "Fribourg, Switzerland", "value": 98.16191808387936}, {"label": "Nice, France", "value": 98.04591686378565}, {"label": "Herzliya, Israel", "value": 97.43875278396436}]}]
    */

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