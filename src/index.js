const userModel = require('./models/user.model')
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const express = require('express')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.post('/userData', async (req, res) => {
  const { name, age, position } = req.body

  try {
    const user = new userModel({
      name,
      age,
      position,
    })
    await user.save()

    res.send({ name, age, position })
  } catch (err) {
    console.log(err)
  }
})

app.get('/getData', async (req, res) => {
  const { name } = req.body
  try {
    const data = await userModel.find({ name })

    res.send(data)
  } catch (err) {
    console.log(err)
  }
})

//!update
// userModel.update(
//   {
//     name: 'prasad',
//   },
//   (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('Result :', result)
//     }
//   },
// )

//!updateMany
// userModel.updateMany(
//   {
//     name: 'prasad',
//   },
//   (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('Result :', result)
//     }
//   },
// )

//!updateOne
// userModel.updateOne(
//   { age: { $gte: 30 } },
//   { name: 'zayn malik' },
//   (err, docs) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('updated docs', docs)
//     }
//   },
// )

// const update = async () => {
//   try {
//     const data = await userModel.updateOne(
//       { age: { $gte: 30 } },
//       { name: 'ds' },
//     )
//     console.log(data);
//   } catch (err) {
//     console.log(err)
//   }
// }
// update()

//!deleteONE

// userModel
//   .deleteOne({ name: 'prasad1' })
//   .then(function () {
//     console.log('Data deleted') // Success
//   })
//   .catch(function (error) {
//     console.log(error) // Failure
//   })

app.listen(3001, async () => {
  console.log('server started on 3001')

  try {
    await mongoose.connect(process.env['mongodbURI'])
    console.log('DB Connected')
  } catch (err) {
    console.log(err)
  }
})
