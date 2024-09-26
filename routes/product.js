import express from "express";
import * as productController from "../controllers/productController.js";
import singleFileMiddleware from "../middleware/singleFileMiddleware.js";

const productRouter = express.Router();
productRouter.post("/create", singleFileMiddleware('image'), productController.createProduct);
productRouter.get("/productlist",productController.getProductList);
productRouter.get("/edit/:id",productController.getEdit);
productRouter.put("/edit/:id",singleFileMiddleware('image'),productController.doEdit);
productRouter.delete("/delete/:id",productController.destroyProduct);
export {  productRouter };
