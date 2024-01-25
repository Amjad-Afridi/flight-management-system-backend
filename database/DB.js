const mongoose = require('mongoose');
mongoose.connect(process.env.ConnectionString).then(()=> {
    console.log('Connected to Database!');
}).catch((e) => {
    console.log('Could not connect to Database!', e.message);
})