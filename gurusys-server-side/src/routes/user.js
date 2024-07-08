const router = require('express').Router();
const {
    AdminRegister,
    AdminLogin,
   ForgotPassword,
    CreateAdmin,
    DeleteAdmin,
    getAllAdmins,
    UpdateAdminPassword,
    getSingleAdmin,
    resetPasswordPost,
    resetPasswordGet,
    
} = require('../controller/admin-controller')
const {auth, protect, superAdmin, Admin} = require ('../middleware/authorization')

router.post('/register',AdminRegister)
/**
 * @openapi
 * '/blog/register':
 *  post:
 *    tags:
 *      - Auth
 *    summary: Register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *       201:
 *         description: User created sucessfully.
 *         content:
 *           application/json:
 *              schema:
 *                 $ref: '#/components/schemas/CreateUserResponse'
 *       500:
 *         description: internal server error
 *
 */
router.post('/login', AdminLogin);
/**
 * @openapi
 * /blog/login:
 *   post:
 *      tags: [Auth]
 *      summary: login a user
 *      description: verify user
 *      parameters:
 *       - name: signature
 *         in: path
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Returns verified true.
 */
router.post('/create-admin',protect, superAdmin, CreateAdmin)
/**
 * @openapi
 * /create-admin:
 *   post:
 *      tags: [Admin]
 *      summary: Create an admin user
 *      description: Create an admin user.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The username of the admin user.
 *                password:
 *                  type: string
 *                  description: The password of the admin user.
 *                email:
 *                  type: string
 *                  description: The email of the admin user.
 *      responses:
 *        200:
 *          description: Successfully created the admin user.
 *        400:
 *          description: Bad Request. Invalid or missing parameters.
 *        401:
 *          description: Unauthorized. Authentication required.
 *        403:
 *          description: Forbidden. Access not allowed.
 *        500:
 *          description: Internal Server Error.
 */
router.post("/forgot-password", ForgotPassword);
/**
 * @openapi
 * /forgot-password:
 *   post:
 *      summary: Request Password Reset
 *      description: Request password reset by providing the user's email.
 *      tags:
 *        - "Auth"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *              required:
 *                - email
 *      responses:
 *        200:
 *          description: "Password reset request sent successfully."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        400:
 *          description: "Bad Request. Invalid or missing parameters."
 *        500:
 *          description: "Internal Server Error."
 */

router.get("/resetpassword/:userId/:token", resetPasswordGet);
/**
 * @openapi
 * /resetpassword/{id}/{token}:
 *   get:
 *      summary: Get Reset Password Token Info
 *      description: Get information about the reset password token.
 *      tags:
 *        - "Auth"
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "User ID"
 *          required: true
 *          schema:
 *            type: "string"
 *        - name: "token"
 *          in: "path"
 *          description: "Reset Password Token"
 *          required: true
 *          schema:
 *            type: "string"
 *      responses:
 *        200:
 *          description: "Reset password token information retrieved successfully."
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  email:
 *                    type: string
 *                  expiration:
 *                    type: string
 *        400:
 *          description: "Bad Request. Invalid or missing parameters."
 *        401:
 *          description: "Unauthorized. Authentication required."
 *        403:
 *          description: "Forbidden. Access not allowed."
 *        500:
 *          description: "Internal Server Error."
 */

router.post("/resetpassword/:id/:token", resetPasswordPost);
/**
 * @openapi
 * /resetpassword/{id}/{token}:
 *   post:
 *      summary: Reset Password
 *      description: Reset the password for a user with a valid token.
 *      tags:
 *        - "Auth"
 *      parameters:
 *        - name: "id"
 *          in: "path"
 *          description: "User ID"
 *          required: true
 *          schema:
 *            type: "string"
 *        - name: "token"
 *          in: "path"
 *          description: "Reset Password Token"
 *          required: true
 *          schema:
 *            type: "string"
 *        - name: "password"
 *          in: "formData"
 *          description: "New Password"
 *          required: true
 *          schema:
 *            type: "string"
 *      responses:
 *        200:
 *          description: "Password successfully reset."
 *        400:
 *          description: "Bad Request. Invalid or missing parameters."
 *        401:
 *          description: "Unauthorized. Authentication required."
 *        403:
 *          description: "Forbidden. Access not allowed."
 *        500:
 *          description: "Internal Server Error."
 */

router.delete('/delete-admin/:adminId', protect, superAdmin, DeleteAdmin)
/**
 * @openapi
 * /delete-admin/{adminId}:
 *   delete:
 *      tags: [Admin]
 *      summary: Delete an admin user
 *      description: Delete an admin user by adminId.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: adminId
 *         in: path
 *         description: The ID of the admin user to be deleted.
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Successfully deleted the admin user.
 *        400:
 *          description: Bad Request. Invalid or missing parameters.
 *        401:
 *          description: Unauthorized. Authentication required.
 *        403:
 *          description: Forbidden. Access not allowed.
 *        404:
 *          description: Admin not found.
 *        500:
 *          description: Internal Server Error.
 */

router.get('/admins',protect, superAdmin, getAllAdmins)
/**
 * @openapi
 * /admins:
 *   get:
 *      tags: [Admin]
 *      summary: Get all admin users
 *      description: Get all admin users.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Successfully retrieved all admin users.
 *        401:
 *          description: Unauthorized. Authentication required.
 *        403:
 *          description: Forbidden. Access not allowed.
 *        500:
 *          description: Internal Server Error.
 */

router.patch('/admins/:adminId/password', protect, UpdateAdminPassword);
/**
 * @openapi
 * /admins/{adminId}/password:
 *   patch:
 *      tags: [Admin]
 *      summary: Update the password of an admin user
 *      description: Update the password of an admin user.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: adminId
 *         in: path
 *         description: ID of the admin user to update.
 *         required: true
 *         type: string
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                currentPassword:
 *                  type: string
 *                newPassword:
 *                  type: string
 *              required:
 *                - currentPassword
 *                - newPassword
 *      responses:
 *        200:
 *          description: Admin password updated successfully.
 *        400:
 *          description: Bad Request. Invalid or missing parameters.
 *        401:
 *          description: Unauthorized. Authentication required.
 *        404:
 *          description: Admin not found.
 *        500:
 *          description: Internal Server Error.
 */

router.get('/admins/:adminId',protect, getSingleAdmin)
/**
 * @openapi
 * /admins/{adminId}:
 *   get:
 *      tags: [Admin]
 *      summary: Get a single admin user by ID.
 *      description: Get a single admin user by ID.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: adminId
 *         in: path
 *         description: ID of the admin user to fetch.
 *         required: true
 *         type: string
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Successfully retrieved the admin user.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                  username:
 *                    type: string
 *                  email:
 *                    type: string
 *                  createdAt:
 *                    type: string
 *                  updatedAt:
 *                    type: string
 *        401:
 *          description: Unauthorized. Authentication required.
 *        404:
 *          description: Admin not found.
 *        500:
 *          description: Internal Server Error.
 */


module.exports = router