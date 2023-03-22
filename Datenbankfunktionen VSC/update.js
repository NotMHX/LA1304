//console.log("hier0")
const { MongoClient } = require("mongodb");
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
    await client.connect();

    await listDatabases(client);
    var dbo = client.db("testdb");

    var upda = { _id: "1" };
    var newvalues = { $set: { name: "Mickey", address: "Canyon 123" } };
    dbo.collection("orders").updateOne(upda, newvalues, function (err, res) {
      if (err) throw err;
      console.log(`1 document updated: ${newvalues}`);
    });
  } catch (e) {
    console.error(e);
  }
}

main().catch(console.error);
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
