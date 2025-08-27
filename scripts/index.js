import algoliasearch from "algoliasearch";
import fs from "fs";

// load product data
const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));

// connect to Algolia
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_KEY
);
const index = client.initIndex("products");

async function run() {
  try {
    const res = await index.saveObjects(products, {
      autoGenerateObjectIDIfNotExist: true,
    });
    console.log(`Indexed ${res.objectIDs.length} products`);
  } catch (err) {
    console.error("Error indexing:", err);
  }
}

run();

