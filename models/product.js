
const Cart = require('./cart');
const db = require('../util/database')

const getProductsFromFile = cb => {
 
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   
    return db.execute('insert into products (title,description,price,imageUrl) values (?,?,?,?)',
      [this.title,this.description,this.price,this.imageUrl])


    
  }

  static fetchAll() {
    return db.execute('select * from products;')
  }

  static findById(id){

    return db.execute(`select * from products where products.id=?`,[id])

  }


  static deleteById(id) {
    return db.execute('delete from products where products.id=?',[id])
  }

};
