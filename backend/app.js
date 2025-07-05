import express from "express";
import cors from "cors";
import dotenv from "dotenv/config"; // this works fine with dotenv v16+
import connectDB from "./config/mongoose-connection.js"; // NOTE: add `.js` if using ES Modules
import cloudinaryConnect from "./config/cloudinary.js";
import userRouter from "./routes/usersRoute.js";
import productRouter from "./routes/productsRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from './routes/orderRoute.js'

const app = express();
const port = process.env.PORT || 4000;

// ✅ Call the function to connect to DB
connectDB();
cloudinaryConnect();

app.use(express.json());
app.use(cors());

app.use('/api/user',userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);

app.get("/", (req, res) => {
  res.send("It's working");
});




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
