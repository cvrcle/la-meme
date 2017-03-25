// const Models = require('../models/index.js');

const db = require('../models/index.js');

module.exports = {
  // users: {
  //   get: (req, res) => {
  //     Users.find({}, (err, result) => {
  //       if (err) {
  //         throw err;
  //         res.status(404);
  //       } else {
  //         console.log('successful user get');
  //         res.status(200).send(result);
  //       }
  //     })
  //     // res.end();
  //   },
  //   getById: (req, res) => {
  //     res.end();
  //   },
  //   post: (req, res) => {
  //     let newUser = newUser(req.body);
  //     newUser.save((err, data) => {
  //       if (err) {
  //         throw err;
  //       } else {
  //         console.log('successful user post');
  //         res.status(201);
  //         res.json({
  //         })
  //       }
  //     })
  //     // console.log(req.body);
  //     res.end();
  //   },
  // },
  memes: {
    // finds a random url from database. We have 50 pictures and the id numbering starts at 1
    get: (req, res) => {
      const x = Math.ceil(Math.random() * 6);
      db.Memes.findAll({
        where: { id: x }
      })
      .then((meme) => {
        console.log('THE MEME BROASDFASDFASDFASDFASDFSDFASDFSDF', meme)
        res.send(meme[0].dataValues.href);
        res.end();
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
    },
    post: (req, res) => {
      res.end();
    },
  },
  // rooms: {
  //   get: (req, res) => {
  //     res.end();
  //   },
  //   getById: (req, res) => {
  //     res.end();
  //   },
  //   post: (req, res) => {
  //     res.end();
  //   },
  // },
};
