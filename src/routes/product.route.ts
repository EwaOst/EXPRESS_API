import { Router } from "express";
import productController from "../controller/product.controller";

const productRouter = Router();
productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.get('/search/:name', productController.getByName);
productRouter.patch('/', productController.updateProduct);
productRouter.delete('/:id', productController.deleteProduct);
productRouter.post('/', productController.createProduct);

export default productRouter;

