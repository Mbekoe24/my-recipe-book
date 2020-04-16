const db = require('../db')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const faker = require('faker')

const main = async () => {
  const users = [...Array(1)].map(user => (
    {
      username: faker.name.firstName(),
      password_digest: faker.random.uuid()
    }
  ))

  await User.insertMany(users)
  console.log("Created users!")
}
const run = async () => {
  await main()
  db.close()
}

run()
