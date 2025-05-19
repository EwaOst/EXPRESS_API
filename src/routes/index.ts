import { Router } from "express";
import productRouter from "./product.route";

const routes = Router();

routes.use('/products', productRouter);

export default routes;

