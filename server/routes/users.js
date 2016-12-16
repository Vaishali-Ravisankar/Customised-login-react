import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcryptjs';
import isEmpty from 'lodash/isEmpty';
import nodemailer from 'nodemailer';
import SMTPtransporter from '../configs/MailConfig';
import jwt from 'jsonwebtoken';
import JWTconfig from '../configs/JWTConfig';

import User from '../models/user';

let router = express.Router();


function createMailOptions(toEmail,subj,token){
  return {
    to: 'vaishaliravisankar@gmail.com',
    subject: 'Test',
    //text: "Hi Test"
    html : "Hello,<br> Please Click on the link to verify your email. Your default username is test-user and password is test-user<br><a href='http://localhost:2004/activateUser?token="+token+"'>Click here to verify</a>"
  }
}
// var mailOptions = {
//     to: 'vaishaliravisankar@gmail.com',
//     subject: 'Test',
//     //text: "Hi Test"
//     html : "Hello,<br> Please Click on the link to verify your email. Your default username is test-user and password is test-user<br><a href='http://localhost:2004/activateUser?token='"+token_email+"'>Click here to verify</a>"
// };
    
function sendActivationMail(token){
  
      SMTPtransporter.sendMail(createMailOptions('vaishaliravisankar@gmail.com','Test',token), function (error, response) {
      if (error) {
          console.log(error);
          
      } else {
          console.log("Message sent: " + response.message);
          
      }
  });
}
    

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      if (user.get('username') === data.username) {
        errors.username = 'There is user with such username';
      }
      if (user.get('email') === data.email) {
        errors.email = 'There is user with such email';
      }
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  })

}

router.get('/:identifier', (req, res) => {
  User.query({
    select: [ 'username', 'email' ],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  }).fetch().then(user => {
    res.json({ user });
  });
});


router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, timezone, email } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

      User.forge({
        username, timezone, email, password_digest
      }, { hasTimestamps: true }).save()
        .then(user => {
          const token_email = jwt.sign({
          id: user.get('id'),
          email: user.get('email')
        }, JWTconfig.jwtSecret);
        console.log("From sendActivation");
        console.log(token_email);
          sendActivationMail(token_email);
          return res.json({ success: true });
        })
        .catch(err => res.status(500).json({ error: err }));

    } else {
      res.status(400).json(errors);
    }
  });

});

export default router;