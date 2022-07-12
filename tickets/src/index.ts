import mongoose from 'mongoose';
import { natsWrapper } from './routes/nats-wrapper';

import { app } from './app'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT is not found')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not found')
  }
  try {
    await natsWrapper.connect('ticketing', 'lasdsa', 'http://nats-srv:4222');
    await mongoose.connect(process.env.MONGO_URI, {})
    console.log('Conncted to MongoDB successfully!!')
  } catch (err) {
    console.log(err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
}
start();

