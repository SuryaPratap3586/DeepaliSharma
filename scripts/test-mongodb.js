const { MongoClient } = require("mongodb");

async function main() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    await client.db(process.env.MONGODB_DB || "portfolio").command({ ping: 1 });
    console.log("MongoDB connection successful!");
  } finally {
    await client.close();
  }
}

main().catch((error) => {
  console.error("MongoDB connection failed:", error.message);
  process.exitCode = 1;
});
