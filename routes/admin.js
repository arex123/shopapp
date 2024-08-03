const path = require('path');

const express = require('express');

const { getAddProduct, postAddProduct, contactup } = require('../controllers/products');
const { submit_success } = require('../controllers/success');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', getAddProduct);

// /admin/add-product => POST
router.post('/add-product', postAddProduct);


router.get('/contact-us',contactup)

router.post('/form-submit',submit_success)

module.exports = router
