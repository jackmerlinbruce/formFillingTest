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



});