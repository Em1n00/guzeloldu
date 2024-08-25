const card = document.getElementsByClassName("card");
const btnAdd = document.getElementsByClassName("btn-info");
const btnCart = document.querySelector(".btn-cart");
const cartList = document.querySelector(".shopping-cart-list");

class Shopping {
    constructor(image, title, price) {
        this.image = image;
        this.title = title;
        this.price = price;
    }
}

class UI {
    addToCart(shopping) {
        const listItem = document.createElement("div");
        listItem.classList.add("list-item");

        listItem.innerHTML = `
            <div class="row align-items-center text-white-50">
                <div class="col-md-2">
                    <img src="${shopping.image}" class="img-fluid"> 
                </div>
                <div class="col-md-5">
                    <div class="title">${shopping.title}</div>
                </div>
                <div class="col-md-2">
                    <div class="price">${shopping.price}</div>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-delete">
                        <i class="fas fa-trash-alt text-danger"></i>
                    </button>
                </div>
            </div>
        `;

        cartList.appendChild(listItem);

        // Silme butonuna tıklama olayını burada ekleyin
        this.removeCart();
        this.cartCount(); // Sepet sayısını güncelle
    }

    removeCart() {
        const btnRemove = document.getElementsByClassName("btn-delete");
        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener("click", function() {
                this.parentElement.parentElement.parentElement.remove();
                // Sepet sayısını güncelle
                new UI().cartCount();
            });
        }
    }

    cartCount() {
        let cartListItems = cartList.getElementsByClassName("list-item");
        let itemCount = document.getElementById("item-count");
        itemCount.innerHTML = cartListItems.length; 
    }
}

for (let i = 0; i < card.length; i++) {
    btnAdd[i].addEventListener("click", function(e) {
        let title = card[i].getElementsByClassName("card-title")[0].textContent;
        let price = card[i].getElementsByClassName("price")[0].textContent;
        let image = card[i].getElementsByClassName("card-img-top")[0].src; 
        btnAdd[i].classList.add("disabled");
        btnAdd[i].textContent = "in Cart";

        let shopping = new Shopping(image, title, price);
        let ui = new UI();

        ui.addToCart(shopping);

        e.preventDefault();
    });
}

function cartToggle() {
    btnCart.addEventListener("click", function() {
        cartList.classList.toggle("d-none");
    });
}
cartToggle();
