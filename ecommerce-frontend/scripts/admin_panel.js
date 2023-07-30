
const add_icon = document.getElementById('add-icon')
const edit_icon = document.getElementById('edit-icon')
const del_icon = document.getElementById('del-icon')

const add_form = document.getElementById('add-form')
const find_form = document.getElementById('find-form')
const edit_form = document.getElementById('edit-form')
const del_form = document.getElementById('del-form')
const del_card = document.getElementById('del-card')

// function to  toggle hidden and flex classes
function hideUnhideElement(element) {
    element.classList.toggle('hidden')
    element.classList.toggle('flex')
}

add_icon.addEventListener('click', function () {
    hideUnhideElement(add_form)
})
edit_icon.addEventListener('click', function () {
    hideUnhideElement(find_form)
})
del_icon.addEventListener('click', function () {
    hideUnhideElement(del_form)
})

// function to find product by id
async function findProduct(product_id) {
    if (product_id.length != 0) {
        let formdata = new FormData()
        formdata.append('id', product_id)
        let options = {
            method: 'POST',
            body: formdata
        }
        // to be filled
        try {
            const response = await fetch('', options)
            const json = await response.json()
            return json
        } catch (e) {
            console.log('failed to fetch', e)
        }
    } else return false
}

// function to fill edit form
function fillEditForm(json) {
    const title_input = document.getElementById('edit-title')
    const brand_input = document.getElementById('edit-brand')
    const price_input = document.getElementById('edit-price')
    const qty_input = document.getElementById('edit-qty')
    const screen_input = document.getElementById('edit-screen')
    const battery_input = document.getElementById('edit-battery')

    title_input.value = json.title
    brand_input.value = json.brand
    price_input.value = json.price
    qty_input.value = json.qty
    screen_input.value = json.screen
    battery_input.value = json.battery
}

const find_btn = document.getElementById('find-btn')
const edit_input = document.getElementById('find-input')

// function to show edit form and get product id to be edited from user
find_btn.addEventListener('click', async function () {
    let product_id = edit_input.value
    find_btn.disabled = true;
    if (product_id != "") {
        const product = findProduct(product_id)
        if (product) {
            edit_input.value = 'Found'
            hideUnhideElement(find_form)
            hideUnhideElement(edit_form)
            fillEditForm(product)
            find_btn.disabled = false
            edit_input.value = ""
        }
    } else {
        edit_input.value = 'Product not Found'
    }
})

function deleteProduct(id) {
    // to be filled
    console.log("deleted", id)
}

const del_btn = document.getElementById('del-btn')
const del_input = document.getElementById('del-input')

// function to show delete form and get user consent
del_btn.addEventListener('click', async function () {
    let product_id = del_input.value
    del_btn.disabled = true;
    // check if user didn't send empty string
    if (product_id != "") {
        // check if product is found
        if (findProduct(product_id)) {
            del_input.value = 'Found'

            // user consent
            const consent = document.createElement('h4')
            consent.innerText = 'Are you sure you want to remove product?(y/n)'
            del_card.appendChild(consent)
            const consent_input = document.createElement('input')
            consent_input.classList.add('input')
            del_card.appendChild(consent_input)

            // if yes delete product otherwise hide delete form
            consent_input.addEventListener('change', function () {
                if (consent_input.value == 'y' || consent_input.value == 'Y') { deleteProduct(product_id); }
                else { hideUnhideElement(del_form) }
            })
        }
    } else {
        del_input.value = 'Product not Found'
    }
})

const add_btn = document.getElementById('add-btn')

// function to show add form
add_btn.addEventListener('click', async function () {
    const title = document.getElementById('title').value
    const brand = document.getElementById('brand').value
    const price = document.getElementById('price').value
    const qty = document.getElementById('qty').value
    const screen = document.getElementById('screen').value
    const battery = document.getElementById('battery').value
    const desc = document.getElementById('desc').value

    let formdata = new FormData()
    formdata.append('title', title)
    formdata.append('brand', brand)
    formdata.append('price', price)
    formdata.append('qty', qty)
    formdata.append('screen', screen)
    formdata.append('battery', battery)
    formdata.append('description', desc)

    let options = {
        method: 'POST',
        body: formdata
    }
    // to be filled
    try {
        const response = await fetch('', options)
        const json = await response.json()
        return json
    } catch (e) {
        console.log('failed to fetch', e)
    }
})
