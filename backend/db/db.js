import mongoose from "mongoose";


const connectDb =async ()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected mongodb')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;