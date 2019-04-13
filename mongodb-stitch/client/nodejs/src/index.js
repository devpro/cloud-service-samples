const {
  Stitch,
  ServerApiKeyCredential,
  RemoteMongoClient
} = require('mongodb-stitch-server-sdk');

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const STITCH_API_KEY = process.env.STITCH_API_KEY;
const STITCH_APPLICATION_ID = process.env.STITCH_APPLICATION_ID;

const client = Stitch.initializeDefaultAppClient(STITCH_APPLICATION_ID);

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('demoStorage');

client.auth.loginWithCredential(new ServerApiKeyCredential(STITCH_API_KEY))
  .then(user => {
    console.log("[MongoDB] Connected to Stitch");
    console.log("User profile name", user.profile.name);
    db.collection('images').updateOne({ owner_id: client.auth.user.id }, { $set: { number: 42 } }, { upsert: true });
  }).then(() =>
    db.collection('images').find({ owner_id: client.auth.user.id }, { limit: 100 }).asArray()
  ).then(docs => {
    console.log("Found docs", docs);
    client.close();
  }).catch(err => {
    console.log(err);
    client.close();
  });
