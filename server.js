//practical example for redis

const express = require("express");
const axios = require("axios").default;

//without using redis the data is loading at an average time of 200ms
const client = require("./client");

const app = express();

app.get("/", async (req, res) => {
  //check the data in the storage
  const cacheValue = await client.get("todos");
  if (cacheValue) return res.json(JSON.parse(cacheValue));

  //if the data is not present in redis then firstly fetch it and the store it in redis with some expiry so that we always get the updated data
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  await client.set("todos", JSON.stringify(data));
  await client.expire("todos", 30);
  return res.json(data);
});

//now after initializing redis the loading time shirks down to only 4ms

app.listen(9000);
