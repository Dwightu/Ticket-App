import express from 'express';
import { body } from 'express-validator'
import { Request, Response } from 'express';
import { validateRequest } from '@dwightu/common';
import { User } from '../models/user';
import { BadRequestError } from '@dwightu/common';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken'


const router = express.Router();

router.post('/api/users/signin', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a right password')
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        throw new BadRequestError('Invalid Credentials');
    }
    const passwordMatah = await Password.compare(existingUser.password, password);
    if (!passwordMatah) {
        throw new BadRequestError('Invalid Credentials')
    }
    // Generate JWT
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    //Store it on session Object
    req.session = {
        jwt: userJwt
    };


    res.status(200).send(existingUser);
});

export { router as signinRouter }