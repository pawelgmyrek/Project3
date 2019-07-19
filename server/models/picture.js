require('mongoose-type-url');
const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Url } = mongoose.SchemaTypes;

const PictureSchema = new Schema({
  picUrl: {
    type: Url,
    default: 'https://via.placeholder.com/200x200',
  },
  note: {
    type: String,
    default: '',
  },
});

const Picture = mongoose.model('Picture', PictureSchema);

module.exports = Picture;
