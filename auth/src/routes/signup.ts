import express, { Request, response, Response } from 'express';
import { body, validationResult } from 'express-validator'



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
    (req: Request, res: Response) => {
        const errors = validationResult(req);

        console.log(errors)
        if (!errors.isEmpty()) {
            throw new Error('Invalid email or password');
        }
        const { email, password } = req.body;

        console.log("Creating a user...");
        throw new Error('Database has Errors')
        res.send({});

        // new User({ email, password })
    }
);

// router.post("/api/users/signup", (req, res) => {
//     res.send('sdsads')
// })

export { router as signupRouter }