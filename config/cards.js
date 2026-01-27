// const mongoose = require('mongoose');

// const cardSchema = new mongoose.Schema({
//   simpleId: Number,
//   title: {
//     type: String,
//     required: true
//   },
//   status:{
//     type: String,
//     enum: ["active", "deleted", "done"],
//     required: true
//   }
// });

// const Card = mongoose.model('Card', cardSchema);

// module.exports = Card;

// module.exports.getCardBySimpleId = (id, callback) => {
//     const query = {simpleId: id};
//     Card.findOne(query, callback);
// }

// module.exports.addCard = function(newCard, callback) {
//     newCard.save(callback);
// }