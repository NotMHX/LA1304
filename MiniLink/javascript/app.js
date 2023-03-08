//console.log("hier0")
const { MongoClient } = require("mongodb");
const FileSystem = require("fs");
//const url = 'mongodb://localhost:27017'
/**const client = new MongoClient(url);
await client.connect();
await listDatabases(client);*/

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  //const url = "mongodb+srv://<username>:<password>@<your-cluster-url>/sample_airbnb?retryWrites=true&w=majority";

  const url = "mongodb://admin:secret@localhost:27017/";

  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
    var dbo = client.db("webList");
    var myobj = {
      title: "Emil Frey AG",
      weblink: "https://www.emilfrey.ch/de",
      created: "2/1/2023",
    };
    dbo.collection("websites").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    /* var dele = { _id: "insert" };
    dbo.collection("websites").deleteOne(dele, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    }); */
  } catch (e) {
    console.error(e);
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function convertToJSON() {
  const url = "mongodb://admin:secret@localhost:27017/";
  const client = new MongoClient(url);
  let db = client.db("webList");
  let dbJson = db.toObject();

  FileSystem.writeFile("test.json", JSON.stringify(dbJson), (error) => {
    if (error) throw error;
  });
}

main().catch(console.error);

convertToJSON();
