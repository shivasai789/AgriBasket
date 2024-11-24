const Product = require("../../models/Product")
const ProductReview = require("../../models/Review")


const getFilteredProducts = async(req,res) => {
    try{

        const {category = [],sortBy = "price-lowtohigh"} = req.query

        let filters = {};

        if(category.length){
            filters.category = {$in: category.split(',')}
        }

        let sort = {}

        switch (sortBy) {
            case "price-lowtohigh":
                sort.price = 1
                break;
            case "price-hightolow":
                sort.price = -1
                break;
            case "title-atoz":
                sort.title = 1
                break;
            case "title-ztoa":
                sort.title = -1
                break;
            default:
                sort.price = 1
                break;
        }

        const products = await Product.find(filters).sort(sort);

        res.status(200).json({
            success: true,
            data: products
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

const getProductsDetails = async (req,res) => {
    try{
        const {id} = req.params
        const product = await Product.findById(id)

        if(!product ) return res.status(404).json({
            success: false,
            message: 'Product not found!'
        }) 
        
        res.status(200).json({
            success: true,
            data: product
        }) 
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        }) 
    }
}

//fetch all reviews
const fetchAllReviews = async (req, res) => {
    try {
      const reviews = await ProductReview.find({});
      
      res.status(200).json({
          success: true,
          data: reviews,
      })
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };

module.exports = {getFilteredProducts,getProductsDetails,fetchAllReviews}