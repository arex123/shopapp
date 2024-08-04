const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false,
    
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save().then((d)=>{

    res.redirect('/');
  }).catch((e)=>{
    console.log(e)
  });
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode){
    return res.redirect('/')
  }
  
  let pid = req.params.productId
  console.log(req.query,pid)
  Product.findById(pid,product=>{
    if(!product){
      return res.redirect('/')
    }
    console.log("pr ",product)
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing:editMode,
      product:product
    });
  })
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows,fields])=>{
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((e)=>{
    console.log("err ",e)
  });
};


exports.postEditProduct = (req, res, next) => {
  const pid = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    pid,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId).then((d)=>{
    res.redirect('/admin/products');

  }).catch((e)=>{
    console.log(e)
  });
};