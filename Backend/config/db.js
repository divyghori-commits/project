import mongoose from 'mongoose';
import dns from 'dns';

// Set DNS servers fallback for Windows SRV resolution
try {
  dns.setServers(['1.1.1.1', '8.8.8.8']);
} catch (e) {
  // Ignore if not permitted
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI.trim(), {
      // These options are no longer needed in Mongoose 6+, but kept for compatibility
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
