const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('DB Online');
  } catch (error) {
    console.error(error);
    throw new Error("Error al conectar la base de datos")
  }
}; 

module.exports = {
  dbConnection
};
