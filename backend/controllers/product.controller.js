import Product from "../models/product.model.js";

const createProduct = async(req, res) => {
    const product = req.body;
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false,message: 'Name, price, and image are required' });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getProducts = async (req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).send({success:true,data:products})
    }catch(error){
        console.log('Error fetching products:', error.message);
        res.status(500).send({sucess: false,message:"no products"})
    }
}

const updateProduct = async(req, res) => {
    const {id} = req.params;
    const product = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        if (!updatedProduct) {return res.status(404).json({ success: false, message: 'Product not found' 
            });
        }
        res.status(200).json({ success: true,data:updatedProduct});
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(404).json({ success: false, message: 'Product not found' });
    }
}

const deleteProduct = async(req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const deleledProduct = await Product.findByIdAndDelete(id);
        if (!deleledProduct) {return res.status(404).json({ success: false, message: 'Product not found' 
            });}
        res.status(200).json({ success: true,message:"deleted." });
    } catch (error) {
        console.error('Error Deleting product:', error.message);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export {createProduct, getProducts, updateProduct, deleteProduct};