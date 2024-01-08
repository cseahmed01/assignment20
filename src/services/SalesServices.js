const SalesModel = require('../models/SalesModel')
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;


const TotoalRevenueService = async () => {
    try {
        const totalRevenue = await SalesModel.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } } } }
        ]).exec();

        // Access the total revenue directly from the first element of the array
        return { status: "success", data: totalRevenue[0].totalRevenue };
    } catch (error) {
        console.error(error);
        // Return a descriptive error message
        return { status: "fail", data: "Failed to calculate total revenue" };
    }
}


const TotalquantitySoldEachProductService = async()=>{
    try {
        const quantityByProduct = await SalesModel.aggregate([
          { $group: { _id: "$product", totalQuantity: { $sum: "$quantity" } } }
        ]).exec();
        return { status: "success", data: quantityByProduct };
 
      } catch (error) {
        console.error(error);
        return { status: "fail", data: "Failed to retrieve quantity by product" };
 
      }
}

const topProductsService = async()=>{


    try {
        const topProducts = await SalesModel.aggregate([
          { $group: { _id: "$product", totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } } } },
          { $sort: { totalRevenue: -1 } },  // Sort by totalRevenue in descending order
          { $limit: 5 }  // Limit to the top 5 products
        ]).exec();
        return { status: "success", data: topProducts };
        res.json(topProducts);
      } catch (error) {
        console.error(error);
        return { status: "fail", data: "Failed to retrieve top products" };
     
      }
}



const averagePriceService = async()=>{

    try {
        const averagePrice = await SalesModel.aggregate([
          { $group: { _id: null, totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }, totalQuantity: { $sum: "$quantity" } } },
          { $project: { averagePrice: { $divide: ["$totalRevenue", "$totalQuantity"] } } }
        ]).exec();
    
        return { status: "success", data: averagePrice[0].averagePrice };
      } catch (error) {
        console.error(error);
 
        return { status: "fail", data: "Failed to calculate average price" };
      }
}


const revenueByMonthService = async()=>{

    try {
        const revenueByMonth = await SalesModel.aggregate([
          {
            $group: {
              _id: {
                year: { $year: "$date" },
                month: { $month: "$date" }
              },
              totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } }
            }
          }
        ]).exec();
        return { status: "success", data: revenueByMonth };
 
      } catch (error) {
        console.error(error);
        return { status: "fail", data: "Failed to retrieve revenue by month" };
 
      }
}



const highestQuantitySaleService = async()=>{

    try {
        const highestQuantitySale = await SalesModel.aggregate([
          { $sort: { quantity: -1, date: 1 } },  // Sort by quantity (descending) then date (ascending)
          { $group: { _id: "$product", maxQuantity: { $max: "$quantity" }, date: { $first: "$date" } } },
          { $sort: { maxQuantity: -1 } },  // Sort again by maxQuantity (descending) to ensure the highest is first
          { $limit: 1 }  // Take only the top result
        ]).exec();
    
        return { status: "success", data: highestQuantitySale[0] };
         
      } catch (error) {
        console.error(error);
        return { status: "fail", data: "Failed to retrieve highest quantity sold" };
 
      }
}


module.exports = {
    TotoalRevenueService,
    TotalquantitySoldEachProductService,
    topProductsService,
    averagePriceService,
    revenueByMonthService,
    highestQuantitySaleService

}