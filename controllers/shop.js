const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

  Product.findAll().then(product=>{
    res.render('shop/product-list', {
      prods: product,
      pageTitle: 'All Products',
      path: '/products'
    }); 
  }).catch(e=>{
    console.log(e)
  })
  
};

exports.getProductDetail = (req,res,next)=>{
  const pid = req.params.productid
  console.log("11pid : ",req.params.productid)
Product.findByPk(pid).then(p=>{

  res.render('shop/product-detail',{
    product:p,
    pageTitle:p.title,
    path:'/products'
  })
}).catch(e=>{
  console.log(e)
})

}

exports.getIndex = (req, res, next) => {
  Product.findAll().then(product=>{
    res.render('shop/index', {
      prods: product,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(e=>{
    console.log(e)
  })
 
};

exports.getCart = (req, res, next) => {

  req.user
  .getCart()
  .then(cart=>{
    return cart.getProducts()
  })
  .then(products=>{

    // console.log("&&&& item ",products[0]['cart-item'])
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products:products
    });

  }).catch(e=>{
    console.log(e)
  })

};


exports.postCart = (req,res,next)=>{
  const prodId = req.body.productid;
  let ourCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      ourCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product['cart-item'].quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return ourCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.deleteCartProduct=(req,res,next)=>{
  console.log("deletig ",req.body)
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts({where:{id:req.body.productId}})
  })
  .then(product=>{
    // console.log("products ",product[0])
    return product[0]['cart-item'].destroy()
   
  })
  .then((d)=>{
    res.redirect('/cart')
  }).catch(e=>{
    console.log(e)
  })
}