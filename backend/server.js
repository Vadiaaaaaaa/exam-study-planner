const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const plannerRoutes = require('./routes/plannerRoutes');


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/exam_planner');


app.use('/api', plannerRoutes);


const PORT = 5001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
