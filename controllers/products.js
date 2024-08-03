const products = []
const Product = require('../models/products')

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }


exports.postAddProduct = (req, res, next) => {
    // products.push({ title: req.body.title });
    let prod = new Product(req.body.title)
    prod.save()
    res.redirect('/');
}

exports.getProducts =  (req, res, next) => {
    Product.fetchAll(products=>{
      res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
  })
}

exports.contactup = (req,res)=>{
    res.render('contact',{
        path:'/admin/contactus',
        pageTitle:'contact us'
    })
}