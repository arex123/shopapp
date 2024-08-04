const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {

  Product.fetchAll().then(([rows,fields])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch((e)=>{
    console.log(e)
  })

  
};

exports.getProductDetail = (req,res,next)=>{
  const pid = req.params.productid
  console.log("11pid : ",req.params.productid)
  Product.findById(pid)
  .then(([p])=>{
    console.log(p[0])
    res.render('shop/product-detail',{
      product:p[0],
      pageTitle:p[0].title,
      path:'/products'
    })
  }).catch((e)=>{
    console.log(e)
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows,fields])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};


exports.postCart = (req,res,next)=>{
  const pid = req.body.productid
  Product.findById(pid, product => {
    Cart.addProduct(pid, product.price);
  });
  res.redirect('/cart');
}

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
