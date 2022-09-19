var express = require('express');
var router = express.Router();
var Users = require('../models/userModel');

/* GET users listing. */
router.get('/', function(req, res) {
  let search = new RegExp(req.query.name, 'i');
  if (search) {
    Users.find({$or: [{'username': search}, {'email': search}]}, (err, result) => {
      if (err) {
        console.log(err)
        return res.json(err)
      }
      res.json(result)
    })
  }
  else {
    Users.find({}, (err, listOfUser) => {
      if (err) {
        console.log(err)
        return res.json(err)
      }
      res.json(listOfUser)
    })
  }
});

//add new users
router.post('/', (req, res) => {
  let newUsers = req.body.newUsers;
  Users.find({}, (err, listOfUser) => {
    let numOfUsers = listOfUser.length;
    newUsers.forEach((user) => {
      numOfUsers += 1;
      console.log(numOfUsers)
      Users.create({...user, 'id': numOfUsers + 1}, (err, result) => {
        if (err) {
          console.log({'Can not create user': user});
          res.write(JSON.stringify({'Can not create user': user}));
        }
        else {
          console.log({'Add users success': result})
          res.write(JSON.stringify({'Add users success': result}));
        }
        res.end()
      })
    })
  })
})

//update users
router.post('/update', (req, res) => {
  let updateUsers = req.body.updateUsers;
  updateUsers.forEach((user, index) => {
    Users.findOneAndUpdate({id: user.id}, user, (err, result) => {
      if (err || !result) {
        console.log({'Can not find user': user});
        res.write(JSON.stringify({'Can not find user': user}));
      }
      else {
       
          console.log({'Update users success': result})
          res.write(JSON.stringify({'Update users success': result}));

      }
      res.end()
      }
    )
  })
})

module.exports = router;
