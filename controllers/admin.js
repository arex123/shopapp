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
  Product.create({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description
  }).then((d)=>{

      res.redirect('/');
  }).catch((e)=>{
    console.log(e)
  })
  
};


exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode){
    return res.redirect('/')
  }
  
  let pid = req.params.productId
  console.log(req.query,pid)
  Product.findByPk(pid).then(product=>{

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
  // Product.findById(pid,product=>{
  // })
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then(rows=>{
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(e=>{
  console.log(e)
  })
  
};


exports.postEditProduct = (req, res, next) => {
  const pid = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;


  Product.findByPk(pid).then(product=>{
    product.title = updatedTitle
    product.description = updatedDesc
    product.imageUrl = updatedImageUrl
    product.price = updatedPrice
    return product.save()
  }).then((d)=>{
    res.redirect('/admin/products');
  })
  .catch(e=>{
    console.log(e)
  })


};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findByPk(prodId).then(product=>{
    return product.destroy()
  }).then((d)=>{
    res.redirect('/admin/products');
  })
  .catch(e=>{
    console.log(e)
  })
};