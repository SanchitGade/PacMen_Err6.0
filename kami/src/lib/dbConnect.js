import mongoose from 'mongoose';

// Cache the connection to avoid reconnecting on every request
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // Use the existing connection if available
    return cached.conn;
  }

  if (!cached.promise) {
    // Create a new connection promise if one doesn't exist
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ DB Connected Successfully');
    return cached.conn;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error; 
  }
}

export default dbConnect;