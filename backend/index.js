import express, { json, urlencoded } from 'express';
const app = express();
import cors from 'cors';
import groceryRoutes from './routes/groceryRoutes';
const PORT = process.env.PORT || 3001;
import connectDB from './config/db';
connectDB();
app.use(cors());

app.use(json());

app.use(urlencoded({ extended: false }));


app.use('/api/grocery', groceryRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})