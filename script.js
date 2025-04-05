// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";


const startTime = performance.now();

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  let profile = {};

  try {
      profile['id'] = id;
        const returnedDB = await central(id);
      // console.log(returnedDB);
      const returnedInfo = await dbs[returnedDB](id);
      // console.log(returnedInfo);
      const returnedPII = await vault(id);
      // console.log(returnedPII);    
      profile = Object.assign(profile, returnedPII, returnedInfo);
      console.log(profile);
      return profile;
  } catch (error) {
      console.error(`${error}`);
  }
}


const endTime = performance.now();


getUserData(3);
getUserData(12);
getUserData("2");

const elapsedMs = (endTime - startTime) * 1000;
console.log(elapsedMs);