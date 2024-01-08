const express=require('express');

const SalesController = require('../controllers/SalesController')



const router=express.Router();


router.get('/sales/total-revenue',SalesController.TotoalRevenue)
router.get('/sales/quantity-by-product',SalesController.TotalquantitySoldProduct)
router.get('/sales/top-products',SalesController.TopProducts)
router.get('/sales/average-price',SalesController.averagePrice)
router.get('/sales/revenue-by-month',SalesController.revenueByMonth)
router.get('/sales/highest-quantity-sold',SalesController.highestQuantitySale)




module.exports=router;