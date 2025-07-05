import  { v2 as cloudinary } from 'cloudinary';

import productModel from '../models/product-model.js';

const addProduct = async (req,res) =>{

   try {
     const {name,description,price,category,sizes} = req.body;

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 &&  req.files.image2[0]
    const image3 = req.files.image3 &&  req.files.image3[0]
    const image4 = req.files.image4 &&  req.files.image4[0]

    const images = [image1, image2 ,image3, image4].filter((item) => item!== undefined);

    let imagesUrl = await Promise.all(
    images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url; 
    })
);
 console.log(imagesUrl);
    const productData = {
        name,
        description,
        price : Number(price),
        image : imagesUrl,
        category,
        size : JSON.parse(sizes)
    }
   
    const product = new productModel(productData);
    await product.save();
    res.json({success: true, message: "product added"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const removeProduct = async (req,res) =>{

    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success : true, message:"Product removed"})
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }

};


const listProduct = async (req,res) =>{

   try {
     const products =await productModel.find({})
    res.json({success : true, products});
    
   } catch (error) {
    res.status(500).json({ success: false, message: error.message }); 
   }

};

const singleProduct = async (req,res) => {
    try {

        const product = await productModel.findById(req.body.id);
        res.json({success : true, product}); 
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });

        
    }

};

export {addProduct, removeProduct, listProduct, singleProduct};