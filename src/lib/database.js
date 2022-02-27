import { MongoClient } from "mongodb";

async function connectToCluster(uri) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
    process.exit();
  }
}

export async function getUser(id) {
  const uri = process.env.DB_URI;
  let mongoClient;

  try {
    mongoClient = await connectToCluster(uri);
    const db = mongoClient.db("laboratorioremotofi");
    const collection = db.collection("users");
    return await collection.findOne({ id });
  } finally {
    await mongoClient.close();
  }
}
