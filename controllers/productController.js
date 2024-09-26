import Product from "../models/productSchema.js";


export async function createProduct(req, res) {
  try {

    if (!req.file) {
      return res.status(400).json({ msg: "Image file is required", success: false });
    }

    let path = req.file.path;
    let fname = req.file.filename;

    const { name, description, price, discount, stock } = req.body;
    if (!name || !description || !price || !discount || !stock) {
      return res.status(400).json({ msg: "Required fields are missing", success: false });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      discount,
      stock,
    });
     newProduct.image.filename=fname;
     newProduct.image.url = path;
     
    await newProduct.save();

    console.log(newProduct);

    res.status(200).json({ msg: "Product created", success: true });
  } catch (error) {
    console.error(error);
    res.status(200).json({ msg: "Error creating product", error });
  }
}
export async function getProductList(req,res){
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching invoices", error: error.message });
  }
}
export async function getEdit(req,res){
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    console.log(product);
    if(product){
    res.status(200).json(product);}
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
}
export async function doEdit(req, res) {
  try {
    const { id } = req.params;
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ msg: "Image file is required", success: false });
    }

    const path = req.file.path;
    const fname = req.file.filename;

    const { name, description, price, discount, stock } = req.body;

   
    if (!name || !description || !price || !discount || !stock) {
      return res.status(400).json({ msg: "Required fields are missing", success: false });
    }


    const product = await Product.findById(id);

    
    if (!product) {
      return res.status(404).json({ msg: "Product not found", success: false });
    }

   
    product.name = name;
    product.description = description;
    product.price = price;
    product.discount = discount;
    product.stock = stock;
    product.image.filename=fname;
    product.image.url = path;
    product.updatedAt = Date.now();

    await product.save();

    res.status(200).json({ msg: "Product updated successfully", success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
}
export async function destroyProduct(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }
    const result = await Product.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    console.log(`Invoice with ID ${id} deleted`);
    res.status(200).json({ message: 'Invoice deleted successfully' ,success:true});
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ message: 'Error deleting invoice', error: error.message });
  }
};



