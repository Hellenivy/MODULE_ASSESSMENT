var productName = document.getElementById('productName');
var productDesc = document.getElementById('productDesc');
var productModel = document.getElementById('productModel');
var productPrice = document.getElementById('productPrice');
var productBtn = document.getElementById('productBtn');
var productImg = document.getElementById('productImg');
var formControl = document.getElementsByClassName('form-control');
var myClose = document.getElementsByClassName('myClose');
var mySearchInp = document.getElementById('mySearchInp');
var productHeadline = document.getElementById('productHeadline');
//var viewBtn = document.getElementById('viewBtn');
var successProductAlert = document.getElementById('successProductAlert');
var dataRow = document.getElementById('dataRow');
var productContainer;
var currentIndex = 0;
//check for local storage at begining
if (localStorage.getItem('productsStorage') == null) {
    productContainer = [];
    productHeadline.style.display = 'none';
    searchItem.style.display = 'none';
} else {
    productContainer = JSON.parse(localStorage.getItem('productsStorage'));
    showProducts();
}
//check for empty fields to disable button
disableBtn();

productBtn.addEventListener('click', function () {
    if (productBtn.innerHTML == 'add product') {
        //disableBtn();
        addProducts();
        showAlert();
        showProducts();
        emptyFields();
    } else {
        saveUpdate();
        emptyFields();
    }

});

function showAlert() {
    $(successProductAlert).fadeIn(500, function () {
        $(successProductAlert).fadeOut(2000);
    });
}
//if (productName.value == '' && productDesc.value == '' && productModel.value == '' && productPrice.value == '')
function disableBtn() {
    for (var i = 0; i < formControl.length - 1; i++) {
        if (formControl[i].value == '') {
            productBtn.disabled = true;
            //console.log('empty');
        } else {
            productBtn.removeAttribute('disabled');
        }
    }
}

function addProducts() {

    var products = {
        productName: productName.value,
        // productImg: productImg.value,
        productDesc: productDesc.value,
        productModel: productModel.value,
        productPrice: productPrice.value
    };
    productContainer.push(products);

    localStorage.setItem('productsStorage', JSON.stringify(productContainer));
    console.log('products added');
}

function showProducts() {

    var rows = '';
    for (var i = 0; i < productContainer.length; i++) {
        rows += '<div class="col-lg-4 col-md-6 col-sm-12 my-2 products"><div class="product"><div class="card p-1 text-center m-auto" style="width: 18rem;"><div class="d-flex justify-content-between"><i class="fas fa-edit fa-2x" onclick="updateProduct(' + i + ')"></i><i class="fa fa-times-circle fa-2x " onclick="deleteItem(' + i + ')"></i></div><img class="img-fluid" src="images/3191.png" class="card-img-top" alt="test"><div class="card-body"><h5 class="card-title">' + productContainer[i].productName + '</h5><p class="card-text">' + productContainer[i].productDesc + '</p><a href="#" class="btn btn-primary">' + productContainer[i].productPrice + ' L.E</a></div></div></div></div>';
    }
    document.getElementById('dataRow').innerHTML = rows;
    //console.log('show products func');
    productContainer = JSON.parse(localStorage.getItem('productsStorage'));
    productHeadline.style.display = 'block';
    searchItem.style.display = 'block';
}

function updateProduct(index) {
    //console.log('clicked');
    productName.value = productContainer[index].productName;
    productDesc.value = productContainer[index].productDesc;
    productPrice.value = productContainer[index].productPrice;
    productModel.value = 'sn123';
    productBtn.innerHTML = 'update product';
    currentIndex = index;
}

function saveUpdate() {
    var products = {
        productName: productName.value,
        productDesc: productDesc.value,
        productModel: productModel.value,
        productPrice: productPrice.value
    };
    productContainer[currentIndex] = products;
    localStorage.setItem('productsStorage', JSON.stringify(productContainer));
    showProducts();
    productBtn.innerHTML = 'add product';
}

function emptyFields() {
    for (var i = 0; i < formControl.length; i++) {
        formControl[i].value = '';
    }
    disableBtn();
}

function deleteItem(item) {
    productContainer.splice(item, 1);
    localStorage.setItem('productsStorage', JSON.stringify(productContainer));
    showProducts();
}
mySearchInp.addEventListener('keyup', function (e) {
    //console.log(e.target.value);
    var rows = '';
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].productName.toLowerCase().includes(e.target.value.toLowerCase())) {
            rows += '<div class="col-lg-4 col-md-6 col-sm-12 my-2 products"><div class="product"><div class="card p-1 text-center m-auto" style="width: 18rem;"><div class="d-flex justify-content-between"><i class="fas fa-edit fa-2x" onclick="updateProduct(' + i + ')"></i><i class="fa fa-times-circle fa-2x" onclick="deleteItem(' + i + ')"></i></div><img class="img-fluid" src="images/3191.png" class="card-img-top" alt="test"><div class="card-body"><h5 class="card-title">' + productContainer[i].productName + '</h5><p class="card-text">' + productContainer[i].productDesc + '</p><a href="#" class="btn btn-primary">' + productContainer[i].productPrice + '</a></div></div></div></div>';
        }
    }
    document.getElementById('dataRow').innerHTML = rows;
});

//nav bar scroll
let navHeight = $('nav').outerHeight();
//console.log('nav height = ' + navHeight);
$(window).scroll(function () {
    let scrollTop = $(window).scrollTop();
    if (scrollTop > navHeight) {
        document.querySelector('nav').style.position = 'fixed';
        document.querySelector('nav').style.zIndex = '1000';
        document.querySelector('.my-Container').style.width = '85%';
        document.querySelector('nav').style.width = '85%';
        document.querySelector('.marginTop').style.marginTop = '0rem';
    } else {
        // $('nav').css('backgroundColor', 'green');
        document.querySelector('nav').style.position = 'relative';
        document.querySelector('.my-Container').style.width = '85%';
        document.querySelector('nav').style.width = '100%';
        document.querySelector('.marginTop').style.marginTop = '3rem';
    }
});


(function( $ ) {
    $.Shop = function( element ) {
        this.$element = $( element ); 
        this.init();
    };

    $.Shop.prototype = {
        init: function() {
        // Properties

            this.cartPrefix = "winery-"; 
            this.cartName = this.cartPrefix + "cart"; 
            this.shippingRates = this.cartPrefix + "shipping-rates"; 
            this.total = this.cartPrefix + "total"; 
            this.storage = sessionStorage; 

            this.$formAddToCart = this.$element.find( "form.add-to-cart" ); 
            this.$formCart = this.$element.find( "#shopping-cart" ); 
            this.$checkoutCart = this.$element.find( "#checkout-cart" ); 
            this.$checkoutOrderForm = this.$element.find( "#checkout-order-form" );  
            this.$shipping = this.$element.find( "#sshipping" ); 
            this.$subTotal = this.$element.find( "#stotal" ); 
            this.$shoppingCartActions = this.$element.find( "#shopping-cart-actions" ); 
            this.$updateCartBtn = this.$shoppingCartActions.find( "#update-cart" ); 
            this.$emptyCartBtn = this.$shoppingCartActions.find( "#empty-cart" ); 
            this.$userDetails = this.$element.find( "#user-details-content" ); 
            this.$paypalForm = this.$element.find( "#paypal-form" ); 

            this.currency = "&euro;"; 
            this.currencyString = "€"; 
            this.paypalCurrency = "EUR"; 
            this.paypalBusinessEmail = "yourbusiness@email.com"; 
            this.paypalURL = "https://www.sandbox.paypal.com/cgi-bin/webscr"; 

            // form validation
            this.requiredFields = {
                expression: {
                    value: /^([w-.]+)@((?:[w]+.)+)([a-z]){2,4}$/
                },

                str: {
                    value: ""
                }

            };

createCart: function() {
    if( this.storage.getItem( this.cartName ) == null ) {

        var cart = {};
        cart.items = [];

        this.storage.setItem( this.cartName, this._toJSONString( cart ) );
        this.storage.setItem( this.shippingRates, "0" );
        this.storage.setItem( this.total, "0" );
    }
}

            // public methods invocation
            var $body = $( "body" ),
    page = $body.attr( "id" );

    switch( page ) {
        case "product-list":
            // actions for handling products
            break;
        case "shopping-cart":
            // actions for handling the shopping cart
            break;
        case "checkout":
            // actions for handling the checkout's page
            break;
        default:
            break;
    $.Shop.prototype = {
    // empties session storage

    _emptyCart: function() {
        this.storage.clear();
    }
    _formatNumber: function( num, places ) {
    var n = num.toFixed( places );
    return n;
}
    _extractPrice: function( element ) {
    var self = this;
    var text = $.trim( element.text() );
    var price = text.replace( self.currencyString, "" ).replace( " ", "" );
    return price;
}

_convertString: function( numStr ) {
    var num;
    if( /^[-+]?[0-9]+.[0-9]+$/.test( numStr ) ) {
        num = parseFloat( numStr );
    } else if( /^d+$/.test( numStr ) ) {
        num = parseInt( numStr );
    } else {
        num = Number( numStr );
    }

    if( !isNaN( num ) ) {
        return num;
    } else {
        console.warn( numStr + " cannot be converted into a number" );
        return false;
    }
},


_convertNumber: function( n ) {
    var str = n.toString();
    return str;
}


_toJSONObject: function( str ) {
    var obj = JSON.parse( str );
    return obj;
},


_toJSONString: function( obj ) {
    var str = JSON.stringify( obj );
    return str;
}


_addToCart: function( values ) {
    var cart = this.storage.getItem( this.cartName );
    var cartObject = this._toJSONObject( cart );
    var cartCopy = cartObject;
    var items = cartCopy.items;
    items.push( values );

    this.storage.setItem( this.cartName, this._toJSONString( cartCopy ) );
    this._addToCart({
     product: "Test",
     qty: 1,
     price: 2
});    
}


_calculateShipping: function( qty ) {
    var shipping = 0;
    if( qty >= 6 ) {
        shipping = 10;
    }
    if( qty >= 12 && qty <= 30 ) {
        shipping = 20;
    }

    if( qty >= 30 && qty <= 60 ) {
        shipping = 30;
    }

    if( qty > 60 ) {
        shipping = 0;
    }

    return shipping;

}


_validateForm: function( form ) {
        var self = this;
        var fields = self.requiredFields;
        var $visibleSet = form.find( "fieldset:visible" );
        var valid = true;

        form.find( ".message" ).remove();

    $visibleSet.each(function() {

        $( this ).find( ":input" ).each(function() {
        var $input = $( this );
        var type = $input.data( "type" );
        var msg = $input.data( "message" );

        if( type == "string" ) {
            if( $input.val() == fields.str.value ) {
                $( "<span class='message'/>" ).text( msg ).
                insertBefore( $input );

                valid = false;
            }
        } else {
            if( !fields.expression.value.test( $input.val() ) ) {
                $( "<span class='message'/>" ).text( msg ).
                insertBefore( $input );

                valid = false;
            }
        }

    });
    });

    return valid;
}


_saveFormData: function( form ) {
    var self = this;
    var $visibleSet = form.find( "fieldset:visible" );

    $visibleSet.each(function() {
        var $set = $( this );
        if( $set.is( "#fieldset-billing" ) ) {
            var name = $( "#name", $set ).val();
            var email = $( "#email", $set ).val();
            var city = $( "#city", $set ).val();
            var address = $( "#address", $set ).val();
            var zip = $( "#zip", $set ).val();
            var country = $( "#country", $set ).val();

            self.storage.setItem( "billing-name", name );
            self.storage.setItem( "billing-email", email );
            self.storage.setItem( "billing-city", city );
            self.storage.setItem( "billing-address", address );
            self.storage.setItem( "billing-zip", zip );
            self.storage.setItem( "billing-country", country );
        } else {
            var sName = $( "#sname", $set ).val();
            var sEmail = $( "#semail", $set ).val();
            var sCity = $( "#scity", $set ).val();
            var sAddress = $( "#saddress", $set ).val();
            var sZip = $( "#szip", $set ).val();
            var sCountry = $( "#scountry", $set ).val();

            self.storage.setItem( "shipping-name", sName );
            self.storage.setItem( "shipping-email", sEmail );
            self.storage.setItem( "shipping-city", sCity );
            self.storage.setItem( "shipping-address", sAddress );
            self.storage.setItem( "shipping-zip", sZip );
            self.storage.setItem( "shipping-country", sCountry );

        }
    });
}


handleAddToCartForm: function() {
    var self = this;
    self.$formAddToCart.each(function() {
        var $form = $( this );
        var $product = $form.parent();
        var price = self._convertString( $product.data( "price" ) );
        var name =  $product.data( "name" );

        $form.on( "submit", function() {
            var qty = self._convertString( $form.find( ".qty" ).val() );
            var subTotal = qty * price;
            var total = self._convertString( self.storage.getItem( self.total ) );
            var sTotal = total + subTotal;
            self.storage.setItem( self.total, sTotal );
            self._addToCart({
                product: name,
                price: price,
                qty: qty
            });
            var shipping = self._convertString( self.storage.getItem( self.shippingRates ) );
            var shippingRates = self._calculateShipping( qty );
            var totalShipping = shipping + shippingRates;

            self.storage.setItem( self.shippingRates, totalShipping );
        });
    });
}


displayCart: function() {
    if( this.$formCart.length ) {
        var cart = this._toJSONObject( this.storage.getItem( this.cartName ) );

var items = [
    {
        product: "Test",
        qty: 1,
        price: 5
    },
    {
        product: "Foo",
        qty: 5,
        price: 10
    },
    {
        product: "Bar",
        qty: 2,
        price: 8
    }
];

items = $.grep( items, function( item ) {
    return item.product !== "Test";

});

console.log( items );

        var $tableCart = this.$formCart.find( ".shopping-cart" );
        var $tableCartBody = $tableCart.find( "tbody" );

        for( var i = 0; i < items.length; ++i ) {
            var item = items[i];
            var product = item.product;
            var price = this.currency + " " + item.price;
            var qty = item.qty;
            var html = "<tr><td class='pname'>" + product + "</td>" + "<td class='pqty'><input type='text' value='" + qty + "' class='qty'/></td>" + "<td class='pprice'>" + price + "</td></tr>";

            $tableCartBody.html( $tableCartBody.html() + html );
        }

        var total = this.storage.getItem( this.total );
        this.$subTotal[0].innerHTML = this.currency + " " + total;
    } else if( this.$checkoutCart.length ) {
        var checkoutCart = this._toJSONObject( this.storage.getItem( this.cartName ) );
        var cartItems = checkoutCart.items;
        var $cartBody = this.$checkoutCart.find( "tbody" );

        for( var j = 0; j < cartItems.length; ++j ) {
            var cartItem = cartItems[j];
            var cartProduct = cartItem.product;
            var cartPrice = this.currency + " " + cartItem.price;
            var cartQty = cartItem.qty;
            var cartHTML = "<tr><td class='pname'>" + cartProduct + "</td>" + "<td class='pqty'>" + cartQty + "</td>" + "<td class='pprice'>" + cartPrice + "</td></tr>";

            $cartBody.html( $cartBody.html() + cartHTML );
        }

        var cartTotal = this.storage.getItem( this.total );
        var cartShipping = this.storage.getItem( this.shippingRates );
        var subTot = this._convertString( cartTotal ) + this._convertString( cartShipping );

        this.$subTotal[0].innerHTML = this.currency + " " + this._convertNumber( subTot );
        this.$shipping[0].innerHTML = this.currency + " " + cartShipping;

    }
}

// Updates cart

updateCart: function() {
        var self = this;
    if( self.$updateCartBtn.length ) {
        self.$updateCartBtn.on( "click", function() {
            var $rows = self.$formCart.find( "tbody tr" );
            var cart = self.storage.getItem( self.cartName );
            var shippingRates = self.storage.getItem( self.shippingRates );
            var total = self.storage.getItem( self.total );

            var updatedTotal = 0;
            var totalQty = 0;
            var updatedCart = {};
            updatedCart.items = [];

            $rows.each(function() {
                var $row = $( this );
                var pname = $.trim( $row.find( ".pname" ).text() );
                var pqty = self._convertString( $row.find( ".pqty > .qty" ).val() );
                var pprice = self._convertString( self._extractPrice( $row.find( ".pprice" ) ) );

                var cartObj = {
                    product: pname,
                    price: pprice,
                    qty: pqty
                };

                updatedCart.items.push( cartObj );

                var subTotal = pqty * pprice;
                updatedTotal += subTotal;
                totalQty += pqty;
            });

            self.storage.setItem( self.total, self._convertNumber( updatedTotal ) );
            self.storage.setItem( self.shippingRates, self._convertNumber( self._calculateShipping( totalQty ) ) );
            self.storage.setItem( self.cartName, self._toJSONString( updatedCart ) );

        });
    }
}

emptyCart: function() {
    var self = this;
    if( self.$emptyCartBtn.length ) {
        self.$emptyCartBtn.on( "click", function() {
            self._emptyCart();
        });
    }
}


handleCheckoutOrderForm: function() {
    var self = this;
    if( self.$checkoutOrderForm.length ) {
        var $sameAsBilling = $( "#same-as-billing" );
        $sameAsBilling.on( "change", function() {
            var $check = $( this );
            if( $check.prop( "checked" ) ) {
                $( "#fieldset-shipping" ).slideUp( "normal" );
            } else {
                $( "#fieldset-shipping" ).slideDown( "normal" );
            }
        });

        self.$checkoutOrderForm.on( "submit", function() {
            var $form = $( this );
            var valid = self._validateForm( $form );

            if( !valid ) {
                return valid;
            } else {
                self._saveFormData( $form );
            }
        });
    }
}


displayUserDetails: function() {
    if( this.$userDetails.length ) {
        if( this.storage.getItem( "shipping-name" ) == null ) {
            var name = this.storage.getItem( "billing-name" );
            var email = this.storage.getItem( "billing-email" );
            var city = this.storage.getItem( "billing-city" );
            var address = this.storage.getItem( "billing-address" );
            var zip = this.storage.getItem( "billing-zip" );
            var country = this.storage.getItem( "billing-country" );

            var html = "<div class='detail'>";
                html += "<h2>Billing and Shipping</h2>";
                html += "<ul>";
                html += "<li>" + name + "</li>";
                html += "<li>" + email + "</li>";
                html += "<li>" + city + "</li>";
                html += "<li>" + address + "</li>";
                html += "<li>" + zip + "</li>";
                html += "<li>" + country + "</li>";
                html += "</ul></div>";

            this.$userDetails[0].innerHTML = html;
        } else {
            var name = this.storage.getItem( "billing-name" );
            var email = this.storage.getItem( "billing-email" );
            var city = this.storage.getItem( "billing-city" );
            var address = this.storage.getItem( "billing-address" );
            var zip = this.storage.getItem( "billing-zip" );
            var country = this.storage.getItem( "billing-country" );

            var sName = this.storage.getItem( "shipping-name" );
            var sEmail = this.storage.getItem( "shipping-email" );
            var sCity = this.storage.getItem( "shipping-city" );
            var sAddress = this.storage.getItem( "shipping-address" );
            var sZip = this.storage.getItem( "shipping-zip" );
            var sCountry = this.storage.getItem( "shipping-country" );

            var html = "<div class='detail'>";
                html += "<h2>Billing</h2>";
                html += "<ul>";
                html += "<li>" + name + "</li>";
                html += "<li>" + email + "</li>";
                html += "<li>" + city + "</li>";
                html += "<li>" + address + "</li>";
                html += "<li>" + zip + "</li>";
                html += "<li>" + country + "</li>";
                html += "</ul></div>";

                html += "<div class='detail right'>";
                html += "<h2>Shipping</h2>";
                html += "<ul>";
                html += "<li>" + sName + "</li>";
                html += "<li>" + sEmail + "</li>";
                html += "<li>" + sCity + "</li>";
                html += "<li>" + sAddress + "</li>";
                html += "<li>" + sZip + "</li>";
                html += "<li>" + sCountry + "</li>";
                html += "</ul></div>";

            this.$userDetails[0].innerHTML = html;

        }
    }
}

populatePayPalForm: function() {
    var self = this;
    if( self.$paypalForm.length ) {
        var $form = self.$paypalForm;
        var cart = self._toJSONObject( self.storage.getItem( self.cartName ) );
        var shipping = self.storage.getItem( self.shippingRates );
        var numShipping = self._convertString( shipping );
        var cartItems = cart.items;
        var singShipping = Math.floor( numShipping / cartItems.length );

        $form.attr( "action", self.paypalURL );
        $form.find( "input[name='business']" ).val( self.paypalBusinessEmail );
        $form.find( "input[name='currency_code']" ).val( self.paypalCurrency );

        for( var i = 0; i < cartItems.length; ++i ) {
            var cartItem = cartItems[i];
            var n = i + 1;
            var name = cartItem.product;
            var price = cartItem.price;
            var qty = cartItem.qty;

            $( "<div/>" ).html( "<input type='hidden' name='quantity_" + n + "' value='" + qty + "'/>" ).
            insertBefore( "#paypal-btn" );
            $( "<div/>" ).html( "<input type='hidden' name='item_name_" + n + "' value='" + name + "'/>" ).
            insertBefore( "#paypal-btn" );
            $( "<div/>" ).html( "<input type='hidden' name='item_number_" + n + "' value='SKU " + name + "'/>" ).
            insertBefore( "#paypal-btn" );
            $( "<div/>" ).html( "<input type='hidden' name='amount_" + n + "' value='" + self._formatNumber( price, 2 ) + "'/>" ).
            insertBefore( "#paypal-btn" );
            $( "<div/>" ).html( "<input type='hidden' name='shipping_" + n + "' value='" + self._formatNumber( singShipping, 2 ) + "'/>" ).
            insertBefore( "#paypal-btn" );

        }

    }
}

};        
    }
};   
    }


    $(function() {
        var shop = new $.Shop( "#site" ); // object's instance
        console.log( shop.$element );
    });

})( jQuery );
