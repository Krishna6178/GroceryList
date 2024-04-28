const express = require('express');
const app = express();
const cors = require('cors');
const groceryRoutes = require('./routes/groceryRoutes');
const PORT = process.env.PORT || 3001;
const connectDB = require('./config/db');
connectDB();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.use('/api/grocery', groceryRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})