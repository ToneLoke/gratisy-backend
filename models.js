const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt')

let itemSchema = new Schema({
  name: { type: String, required: true},
  description: String,
  color: String,
  price: Number,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  imgUrl: String,
  categories: [String]
})

// movieSchema.statics.search = function (query, cb) {
//   console.log(query)
//   let searchObj = {}
//   if (query.genre) searchObj = {...searchObj, genre: { $in: [query.genre] } }
//   if (query.rating) searchObj = {...searchObj, rating: query.rating }
//   if (query.runtime) searchObj = {...searchObj, runtime: { $gte: query.runtime } }
//
//     // genre and runtime { rating: query.rating, genre: { $in: [query.genre] },  { $gte: query.runtime } }
//   return this.find(searchObj)
//           .exec(cb)
//             // this.where('rating', query.rating)
//             //  .where('genre').in([query.genre])
//             //  .where('runtime').gte(query.runtime)
//             //  .exec(cb)
// }

let Item = mongoose.model('Item', itemSchema)

let userSchema = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true},
  firstName: String,
  lastName: String,
  picUrl: String,
  password: { type: String, required: true, minlength: 8 },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  approved: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  pending: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  myItems: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
})
userSchema.pre('save', function (next) {
  let currentUser = this
  let hashedPW = bcrypt.hashSync(currentUser.password, 8)
  currentUser.password = hashedPW
  next()
})

userSchema.methods.verifyPW = function (textPW) {
  let currentUser = this
  let isValid = bcrypt.compareSync(textPW, currentUser.password)
  return isValid ? {valid: true, message: 'successfully logged in'} : {valid: false, message: 'incorrect credentials please try again'}
}

let User = mongoose.model('User', userSchema)

module.exports = {items: Item, users: User}
