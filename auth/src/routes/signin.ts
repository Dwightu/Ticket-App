import express from 'express';
import { body, validationResult } from 'express-validator'
import { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signin', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a right password')
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    res.send('Hi there!sdsdsds');
});

export { router as signinRouter }