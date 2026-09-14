const quantityAddTOCart = document.querySelector('.quantity-addtocart');
const incQuantity = quantityAddTOCart.querySelector('.inc-quantity');
const decQuantity = quantityAddTOCart.querySelector('.dec-quantity');
const noOfQuantity = quantityAddTOCart.querySelector('.no-quantity');
const itemsInsideCart = document.querySelector('.items-incart');
const noOfQuantityCart = itemsInsideCart.querySelector('.number-of-items');
const aboutProductImg = document.querySelector('.about-product');
const mainImg = aboutProductImg.querySelectorAll('.main-product img');
const thumbnail = aboutProductImg.querySelectorAll('.thumbnail img');
const lightBoxModel = document.querySelector('.light-box');
const imageOfItem = document.querySelectorAll('.img-content img');
const imagesOfItem = document.querySelectorAll('.thumbnail-imgs img');
let currentId = '1'
function saveUserData() {
    const activeCard = document.querySelector('.thumbnail img.active-thumb');
    const activeId = activeCard ? activeCard.dataset.id : '1';
    let dataToSave = {
        quantity: noOfQuantity.textContent,
        cart: noOfQuantityCart.textContent,
        activeImg: activeId,
        lightBoxOPen: lightBoxModel.style.display === 'flex',
        lightBoxImage: currentId,
        cartItems: noOfQuantityCart.textContent,
        cartContentDisplay: document.querySelector('.content-after-add-item').style.display,
        checkoutDisplay: document.querySelector('.checkout').style.display
    }
    localStorage.setItem('E-commercePage', JSON.stringify(dataToSave))
}
function savedImageId(id) {
    mainImg.forEach(main => {
        main.style.display = (main.dataset.id === id) ? 'block' : 'none'
    });
    thumbnail.forEach(t => t.classList.toggle('active-thumb', t.dataset.id === id));
}
function responsiveMainProductImg() {
    const previousBtn = document.querySelector('.previous-btn1');
    const nextBtn = document.querySelector('.next-btn1');
    nextBtn.addEventListener('click', () => {
        let numId = parseInt(currentId);
        if (numId < mainImg.length) {
            numId++;
            currentId = numId.toString();
            savedImageId(currentId)
            saveUserData()
        }
    });
    previousBtn.addEventListener('click', () => {
        let numId = parseInt(currentId);
        if (numId > 1) {
            numId--;
            currentId = numId.toString();
            savedImageId(currentId)
            saveUserData()
        }
    });
}
responsiveMainProductImg()
function lightBoxSavedImageId(id) {
    imageOfItem.forEach(main => {
        main.style.display = (main.dataset.id === id) ? 'block' : 'none'
    });
    imagesOfItem.forEach(t => t.classList.toggle('active-thumb', t.dataset.id === id))
}
function loadSavedData() {
    let savedData = localStorage.getItem('E-commercePage');
    if (savedData) {
        let parseData = JSON.parse(savedData);
        noOfQuantity.textContent = parseData.quantity;
        noOfQuantityCart.textContent = parseData.cart;
        document.querySelector('.content-after-add-item').style.display = parseData.cartContentDisplay;
        document.querySelector('.checkout').style.display = parseData.checkoutDisplay;
        const savedId = parseData.activeImg || '1';
        if (parseData.lightBoxOPen) {
            currentId = parseData.lightBoxImage || savedId;
            lightBoxSavedImageId(currentId)
            lightBoxModel.style.display = 'flex';
            document.body.classList.add('no-scroll')
        }
        savedImageId(savedId)

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
    const cartprice = document.querySelector('.price-cart');
    const unitPrice = parseFloat(document.querySelector('.price-cart').textContent.replace('$', ''));
    const quantity = cartprice.querySelector('.quantity-cart');
    const totalPrice = cartprice.querySelector('.total-price');
    const emptyMsg = document.querySelector('.empty');
    const cartContent = document.querySelector('.content-after-add-item');
    addTOCart.addEventListener('click', () => {
        let selectedQuantity = parseInt(noOfQuantity.textContent) || 0;
        if (selectedQuantity === 0) return;
        let currentQuantity = parseInt(noOfQuantityCart.textContent) || 0;
        let totalQuantity = selectedQuantity + currentQuantity;
        noOfQuantityCart.textContent = totalQuantity;
        quantity.textContent = totalQuantity
        totalPrice.textContent = "$" + (unitPrice * totalQuantity).toFixed(2);
        emptyMsg.style.display = 'none';
        cartContent.style.display = 'flex';
        checkout.style.display = 'block';
        noOfQuantity.textContent = 0;
        saveUserData()
    })
}
addItemsToCart()
function displayImageOfItem() {
    thumbnail.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            const mainImgId = e.target.dataset.id;
            savedImageId(mainImgId)
            saveUserData()
        })
    })
}
displayImageOfItem()
function lightBox() {
    const previousBtn = document.querySelector('.previous-btn');
    const nextBtn = document.querySelector('.next-btn');
    const exitBtn = document.querySelector('.exit')
    mainImg.forEach(main => {
        main.addEventListener('click', () => {
            currentId = main.dataset.id
            lightBoxModel.style.display = 'flex';
            document.body.classList.add('no-scroll');
            lightBoxSavedImageId(currentId)
            saveUserData()

        })
    });
    exitBtn.addEventListener('click', () => {
        lightBoxModel.style.display = 'none';
        document.body.classList.remove('no-scroll');
        savedImageId(currentId)
        saveUserData()
    })
    nextBtn.addEventListener('click', () => {
        let numId = parseInt(currentId);
        if (numId < imageOfItem.length) {
            numId++;
            currentId = numId.toString();
            lightBoxSavedImageId(currentId)
            saveUserData()
        }
    });

    previousBtn.addEventListener('click', () => {
        let numId = parseInt(currentId);
        if (numId > 1) {
            numId--;
            currentId = numId.toString();
            lightBoxSavedImageId(currentId)
            saveUserData()
        }
    });
    imagesOfItem.forEach(thumb => {
        thumb.addEventListener('click', e => {
            currentId = e.target.dataset.id
            lightBoxSavedImageId(currentId)
            saveUserData()
        })
    })
}
lightBox()
function toggleMenu() {
    const menu = document.querySelector('.menu');
    const itemsNavbar = document.querySelector('.items_navbar');
    const closeBtn = document.querySelector('.close');
    menu.addEventListener('click', () => {
        itemsNavbar.classList.toggle('active');
    });
    closeBtn.addEventListener('click', () => {
        itemsNavbar.classList.remove('active');
    })
}
toggleMenu()
function displayCart() {
    const cart = document.querySelector('.cart');
    const cartBtn = cart.querySelector('.items-incart');
    const dropdownCart = document.querySelector('.dropdown-cart');
    cartBtn.addEventListener('click', () => {
        dropdownCart.style.display = (dropdownCart.style.display === 'block') ? 'none' : 'block';
        const deleteItems = document.querySelector('.delete-item')
        const deleteBtn = deleteItems.querySelector('.delete');
         const emptyMsg = document.querySelector('.empty');
        deleteBtn.addEventListener('click', () => {
            const cartContent = document.querySelector('.content-after-add-item');
            const checkout = document.querySelector('.checkout');
            cartContent.style.display = 'none';
            checkout.style.display = 'none';
            emptyMsg.style.display = 'block';
            saveUserData()
        })
    })
    saveUserData()
}
displayCart()