const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const studentRoutes = require('./routes/studentRoutes');
const employerRoutes = require('./routes/employerRoutes');
const placementOfficerRoutes = require('./routes/placementOfficerRoutes');

dotenv.config();
const app = express();
const db= process.env.MONGO_URI 
mongoose.connect(db).then(()=>{
  console.log("connected to db")
}).catch((err)=>{
  console.log(err)
})

app.use(express.json());

app.use('/api/student', studentRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/placementOfficer', placementOfficerRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
