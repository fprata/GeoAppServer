'use strict';


const mongoose = require('mongoose');

const Location = mongoose.model('Location');
const { wrap: async } = require('co');
const { respond, respondOrRedirect } = require('../utils');
const only = require('only');
const assign = Object.assign;

exports.create = async(function* (req, res) {
	console.log('location create: ' + JSON.stringify(req.body));
  const location = new Location(req.body, 'title body tags');
  location.user = req.user;
  try {
    yield location.uploadAndSave();
    console.log('location saved');
  	res.setHeader('Content-Type', 'application/json');
  	res.send(JSON.stringify(location));
    // respondOrRedirect({ req, res }, `/location/${location._id}`, location, {
    //   type: 'success',
    //   text: 'Successfully created location!'
    // });
  } catch (err) {
    // respond(res, 'location/new', {
    //   title: location.title || 'New Location',
    //   errors: [err.toString()],
    //   location
    // }, 422);
    console.log('Exception saving location');
  }
});


exports.index = async(function* (req, res) {
  const page = (req.query.page > 0 ? req.query.page : 1) - 1;
  const _id = req.query.item;
  const limit = 30;
  const options = {
    limit: limit,
    page: page
  };

  if (_id) options.criteria = { _id };

  const locations = yield Location.list(options);
  const count = yield Location.count();
  console.log('location: ' + count);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(locations));
  // respond(res, 'location', {
  //   title: 'Locations',
  //   locations: locations,
  //   page: page + 1,
  //   pages: Math.ceil(count / limit)
  //});
});