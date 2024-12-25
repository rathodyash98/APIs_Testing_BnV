import express from 'express';
import orderRoutes from './routes/order.route'

const app = express()

const PORT = 3000;

app.use(express.json())

app.use("/api", orderRoutes);

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})