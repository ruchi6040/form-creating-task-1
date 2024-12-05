const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
mongoose.connect('mongodb+srv://aavularuchitha:1234@cluster0.gzbss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use('/api/forms', formRoutes);
console.log('helow');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
