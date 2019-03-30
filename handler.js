'use strict';
const MongoClient = require('mongodb').MongoClient;
module.exports.addUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const { name, email, phone } = JSON.parse(event.body)
  const t = (code, message) => {
    return {
      statusCode: code,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        message: message
      })
    }
  };
  try {
    const timeStamp = new Date()
    const client = await MongoClient.connect('mongodb+srv://root:<password>@cluster0-subt6.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    await client.db('april_fool').collection('users').insertOne({ email, name, phone, timeStamp });
    callback(null, t(200, 'success'));
  } catch (error) {
    callback(null, t(500, 'error in connecting or operation'))
  } finally {
    client.close()
  }
};
