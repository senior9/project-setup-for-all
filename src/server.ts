import { Server } from 'http';
import app from './app';
import config from './app/config';

// getting-started.js
// const mongoose = require('mongoose');
import mongoose from 'mongoose';

let server:Server;

// main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server=app.listen(config.port, () => {
      console.log(`Example app is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

process.on('unhandledRejection',()=>{
  if(server){
    server.close(()=>{
      process.exit(1);
    })
  }
  process.exit();
})

process.on('uncaughtException',()=>{
  process.exit(1);
})