import mongoose from "mongoose";

class MongoDb {
  constructor(credentials) {
    this.credentials = credentials;
    this.connection = null;
  }
  async connect() {
    await mongoose
      .connect(
        `mongodb+srv://${this.credentials}@atlascluster.anedki8.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`,
      )
      .then(() => console.log("connected to mongoDb"))
      .catch((err) => console.error("couldnt connect to mongoDb", err));
    this.connection = mongoose.connection;
    return this.connection;
  }
}

export default MongoDb;
