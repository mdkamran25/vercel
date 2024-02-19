import mongoose from "mongoose";

const connectMongoDb = async () => {
  if (process.env.NEXT_PUBLIC_MONGO_URI) {
    await mongoose
      .connect(process.env.NEXT_PUBLIC_MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB Atlas:", error.message);
      });
  }
};

export default connectMongoDb;
