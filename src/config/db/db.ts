import { createPool } from "mariadb";
import * as dotenv from 'dotenv';

dotenv.config();

export const connection = createPool({
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '3306', 10),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD, 
  database: process.env.DATABASE_NAME,
});
