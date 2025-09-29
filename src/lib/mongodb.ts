// // lib/mongodb.ts
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// interface MongooseCache {
//   conn: typeof mongoose | null;
//   promise: Promise<typeof mongoose> | null;
// }

// // Extend global object
// declare global {
//   // eslint-disable-next-line no-var
//   var mongoose: MongooseCache | undefined;
// }

// /**
//  * Gets or initializes the cached connection
//  */
// function getMongooseCache(): MongooseCache {
//   if (!global.mongoose) {
//     global.mongoose = { conn: null, promise: null };
//   }
//   return global.mongoose;
// }

// const cached = getMongooseCache();

// async function dbConnect(): Promise<typeof mongoose> {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI as string, opts);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";
if (!MONGODB_URI) {
  throw new Error("Please define the MONGO_URI environment variable.");
}
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "todoApp" });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};
export default connectDB;
