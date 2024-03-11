const client = require("./client");

async function init() {
  //   await client.lpush("names", "Omi1");
  //   await client.lpush("names", "Omi2");
  //   await client.lpush("names", "Omi3");
  //   await client.lpush("names", "Omi4");
  //   await client.lpush("names", "Omi5");
  //   await client.lpush("names", "Omi6");
  //   const result = await client.rpop("names");
  const result = await client.blpop("names", 20);
  console.log(result);
}

init();
