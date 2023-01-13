const mongoose = require('mongoose');

async function connectDB() {

    try {
        await mongoose.connect(process.env.DATABASE_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    } catch (error) {
        if (error) console.log({message:error});
    }

    mongoose.set('strictQuery', false);
}

module.exports = connectDB;