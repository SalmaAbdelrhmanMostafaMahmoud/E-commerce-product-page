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
        lightBoxImage: currentId
    }
    localStorage.setItem('E-commercePage', JSON.stringify(dataToSave))
}
function savedImageId(id) {
    mainImg.forEach(main => {
        main.style.display = (main.dataset.id === id) ? 'block' : 'none'
    });
    thumbnail.forEach(t => t.classList.toggle('active-thumb', t.dataset.id === id));
}
function responsiveMainProductImg(){
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
        const savedId = parseData.activeImg || '1';
        if (parseData.lightBoxOPen) {
            currentId = parseData.lightBoxImage || savedId;
            lightBoxSavedImageId(currentId)
            lightBoxModel.style.display ='flex';
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
function toggleMenu(){
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