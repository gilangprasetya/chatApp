import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/chatApp')
        console.log('connect to MongoDB')
    } catch (error) {
        console.error('Failed to connect to MongoDB', error)
    }
}

export default connectDB