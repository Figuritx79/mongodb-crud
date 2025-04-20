import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "todoapp" 
    });
    
    console.log('✅ MongoDB conectado a:', mongoose.connection.db.databaseName);
    
    mongoose.connection.on('connected', () => {
      console.log('Colecciones disponibles:', 
        mongoose.connection.db.listCollections().toArray());
    });
    
  } catch (err) {
    console.error('❌ Error de conexión:', err.message);
    console.log('ℹ URL usada:', process.env.DB_URL.replace(/:[^@]+@/, ':*****@'));
    process.exit(1);
  }
};