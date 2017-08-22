

/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
//var Plugin = require('mongoose-user');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var LocationSchema = new Schema({
  pack: { type: String, default: '' },
  title: { type: String, default: '' },
  price: { type: String, default: 0 },
  description: { type: String, default: '' },
  city: { type: String, default: '' },  
  address: { type: String, default: '' },
  lat: { type: String, default: '' },
  lon: { type: String, default: '' },
  type: { type: String, default: '' },
  beds: { type: String, default: '' },
  baths: { type: String, default: '' },
  area: { type: String, default: '' },
  garages: { type: String, default: '' },
  user: { type: String, default: '' },
  createdAt  : { type : Date, default : Date.now }  
});

/**
 * User plugin
 */

//UserSchema.plugin(userPlugin, {});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

LocationSchema.method({

  /**
   * Save article and upload image
   *
   * @param {Object} images
   * @api private
   */

  uploadAndSave: function () {
  	console.log('save');
    const err = this.validateSync();
    console.log(err);
    if (err && err.toString()) throw new Error(err.toString());
    return this.save();
  }
});

/**
 * Statics
 */

LocationSchema.static({
  list: function (options) {
    const criteria = options.criteria || {};
    const page = options.page || 0;
    const limit = options.limit || 30;
    return this.find(criteria)
      //.populate('user', 'name username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
});

LocationSchema.static({

  load: function (_id) {
    return this.findOne({ _id })
      //.populate('user', 'name email username')
      .exec();
  },
});

/**
 * Register
 */

mongoose.model('Location', LocationSchema);
