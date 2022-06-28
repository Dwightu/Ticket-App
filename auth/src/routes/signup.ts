import express, { Request, response, Response } from 'express';
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/BadRequestError';
import jwt from 'jsonwebtoken'

const router = express.Router();


router.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters"),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);

        console.log(errors)
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('Email in Use');
        }
        const user = User.build({ email, password });
        await user.save();
        // Generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        //Store it on session Object
        req.session = {
            jwt: userJwt
        };


        res.status(201).send(user);
    }
);

// router.post("/api/users/signup", (req, res) => {
//     res.send('sdsads')
// })

export { router as signupRouter }