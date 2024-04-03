import express from 'express';
import registerUser from '../controllers/registerUser';
import loginUser from '../controllers/loginUser';
import getMyProfile from '../controllers/getMyProfile';
import authMiddleWare from '../../utils/authMiddleware';
import addUserEquipment from '../controllers/user/addUserEquipment';
import removeUserEquipment from '../controllers/user/removeUserEquipment';
import addUserIngredients from '../controllers/user/addUserIngredients';
import removeUserIngredient from '../controllers/user/removeUserIngredient';

const userRouter = express.Router();

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the provided username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - confirmPassword
 *               - firstName
 *               - lastName
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
userRouter.post('/', registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     description: Returns a server authToken using Firebase token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firebaseToken
 *             properties:
 *               firebaseToken:
 *                 type: string
 *                 description: The authToken returned to client by Firebase Authentication.
 *                 example: eyJhbGciOiJSUzI1NiIsImtpZCI6ImViYzIwNzkzNTQ1NzExODNkNzFjZWJlZDI5YzU1YmVmMjdhZDJjY2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXlvbmx5cGFucyIsImF1ZCI6Im15b25seXBhbnMiLCJhdXRoX3RpbWUiOjE3MTA5ODc4MjEsInVzZXJfaWQiOiJZUU5Ja0o2cGFFWEZWOWRneVBzNGdRZlJMekEzIiwic3ViIjoiWVFOSWtKNnBhRVhGVjlkZ3lQczRnUWZSTHpBMyIsImlhdCI6MTcxMDk4NzgyMSwiZXhwIjoxNzEwOTkxNDIxLCJlbWFpbCI6ImhqdC5yb2JsZXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhqdC5yb2JsZXNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.tapWyLINtWLKdO6FQhBK3F1sNLv7as1VqvH0nq51EwV5nmmL6Yf350Hazc_03sRGcL1o-YYEDry4On8iBsKWbV0gmb3CVkirdg0iMwjW5C66E4tep7KKe9EUAHAIfv-CqmxkP2jlfEY6iyCdoNAPeqnUY54PlAuKseGX4yE6j1gs1Qic-ZlMYsSjocHEl-U2u8OBp46tW5tEgwTDlctcu8XRP7f0VoiK2JWmcvVDZYRd0ro-U5XmU034ic08YLhMDsH5rx2J3XxY7n6K_XCHDpYYQ_D-VILoFET7OzrzmTlHyDyVNty8V61ytgcsSHI0cAUWUohDwn-wtqpKgl11jA
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid login credentials
 */
userRouter.post('/login', loginUser);

/**
 * @swagger
 * /user/myProfile:
 *   get:
 *     summary: Returns user profile
 *     description: This route returns user profile with the authToken.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         type: string
 *         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWZiOTZmNmZjYzE2M2FjNzgwYzI2ZDQiLCJpYXQiOjE3MTA5ODk4MTcsImV4cCI6MTcxMTA3NjIxN30.2o98areEsfSK1EooJoOIu_g24ad3JlCw6XrVf5XpmS0
 *         required: true
 *         description: User authToken
 *     responses:
 *       200:
 *         description: User profile found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: jdoe@email.com
 *                   description: User's email address
 *                 firstName:
 *                   type: string
 *                   example: John
 *                   description: User's first name
 *                 lastName:
 *                   type: string
 *                   example: Doe
 *                   description: User's last name
 *                 username:
 *                   type: string
 *                   example: jdoe
 *                   description: User's username
 *                 _id:
 *                   type: string
 *                   example: 65fb96f6fcc163ac780c26d4
 *                   description: User's unique identifier
 *       400:
 *         description: Bad request
 */
userRouter.get('/myProfile', authMiddleWare, getMyProfile);

userRouter.post('/addEquipment', authMiddleWare, addUserEquipment);

userRouter.post('/addIngredients', authMiddleWare, addUserIngredients);

userRouter.post('/removeEquipment', authMiddleWare, removeUserEquipment);

userRouter.post('/removeIngredient', authMiddleWare, removeUserIngredient);

export default userRouter;
