const quantityAddTOCart = document.querySelector('.quantity-addtocart');
const incQuantity = quantityAddTOCart.querySelector('.inc-quantity');
const decQuantity = quantityAddTOCart.querySelector('.dec-quantity');
const noOfQuantity = quantityAddTOCart.querySelector('.no-quantity');
const itemsInsideCart = document.querySelector('.items-incart');
const noOfQuantityCart = itemsInsideCart.querySelector('.number-of-items');
const aboutProductImg = document.querySelector('.about-product');
const mainImg = aboutProductImg.querySelectorAll('.main-product img');
const thumbnail = aboutProductImg.querySelectorAll('.thumbnail img');
function saveUserData() {
    let dataToSave = {
        quantity: noOfQuantity.textContent,
        cart: noOfQuantityCart.textContent,
        mainImage: mainImg.src,
        thumbnail: thumbnail.src
    }
    localStorage.setItem('E-commercePage', JSON.stringify(dataToSave))
}
function loadSavedData() {
    let savedData = localStorage.getItem('E-commercePage');
    if (savedData) {
        let parseData = JSON.parse(savedData);
        noOfQuantity.textContent = parseData.quantity;
        noOfQuantityCart.textContent = parseData.cart;
        mainImg.src = parseData.mainImage;
        thumbnail.src = parseData.thumbnail
    }
}
loadSavedData()
function addQuantity() {
    incQuantity.addEventListener('click', () => {
        let currentQuantity = parseInt(noOfQuantity.textContent) || 0
        noOfQuantity.textContent = currentQuantity + 1
        saveUserData()
    });
    decQuantity.addEventListener('click', () => {
        let currentQuantity = parseInt(noOfQuantity.textContent) || 0
        if (currentQuantity > 0) {
            noOfQuantity.textContent = currentQuantity - 1
            saveUserData()
        }
    })
}
addQuantity()
function addItemsToCart() {
    const addTOCart = document.querySelector('.added-to-cart');
    addTOCart.addEventListener('click', () => {
        let selectedQuantity = parseInt(noOfQuantity.textContent) || 0;
        if (selectedQuantity === 0) return;
        let currentQuantity = parseInt(noOfQuantityCart.textContent) || 0;
        let totalQuantity = selectedQuantity + currentQuantity;
        noOfQuantityCart.textContent = totalQuantity;
        noOfQuantity.textContent = 0;
        saveUserData()
    })
}
function displayImageOfItem() {
    thumbnail.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            const mainImgId = e.target.dataset.id;
            mainImg.forEach(main => {
                if (mainImgId === main.dataset.id) {
                    main.style.display = 'block'
                } else {
                    main.style.display = 'none'
                }
            })
            saveUserData()
        })
    })
}
displayImageOfItem()