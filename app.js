const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();
const sequelize  = require('./util/database')
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product')
const User = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findByPk(1).then(u=>{
        req.user = u
        next()
    }).catch(e=>console.log(e))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'})
User.hasMany(Product)

sequelize.sync()
.then(res=>{
    return User.findByPk(1)
})
.then(user=>{
    if(!user){
        return User.create({name:'Aditya',email:'test@gmail.com'})
    }
    return user
})
.then((d)=>{
    app.listen(3000);
}).catch((e)=>{
    console.log(e)
})
