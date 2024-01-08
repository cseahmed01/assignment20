const {TotoalRevenueService,TotalquantitySoldEachProductService,topProductsService,averagePriceService,revenueByMonthService,highestQuantitySaleService}=require('../services/SalesServices')

exports.TotoalRevenue=async(req,res)=>{
    let result=await TotoalRevenueService();
    return res.status(200).json(result)
}

exports.TotalquantitySoldProduct = async(req,res)=>{
    let result=await TotalquantitySoldEachProductService()
    return res.status(200).json(result)
}


exports.TopProducts = async(req,res)=>{
    let result=await topProductsService()
    return res.status(200).json(result)
}

exports.averagePrice = async(req,res)=>{
    let result=await averagePriceService()
    return res.status(200).json(result)
}


exports.revenueByMonth = async(req,res)=>{
    let result=await revenueByMonthService()
    return res.status(200).json(result)
}

exports.highestQuantitySale = async(req,res)=>{
    let result=await highestQuantitySaleService()
    return res.status(200).json(result)
}

