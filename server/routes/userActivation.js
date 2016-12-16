import express from 'express';
import jwt from 'jsonwebtoken';
import JWTconfig from '../configs/JWTConfig';

let router = express.Router();

router.post('/', (req, res) => {
  console.log(req);
  let token = req.param('token');

 

});

export default router;