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
    var today = formatDate();

    await listDatabases(client);
    var dbo = client.db("testdb");
    var myobj = {
      title: "Schachspiel",
      weblink: "https://www.chess.com/",
      created: today,
    };
    dbo.collection("webList").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
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

function formatDate() {
  let date = new Date();
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + "/" + month + "/" + year;
}
