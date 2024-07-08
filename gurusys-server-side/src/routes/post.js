const router  = require ('express').Router()

const { CreateNewPost, getAllPost, UpdatePost, DeletePost, GetSinglePost, updateAdvert, createAdvert , deleteAdvert, getAdvertById, getAllAdverts} = require('../controller/admin-controller');
const { LikePosts, AddComment } = require('../controller/user-controller');

const {protect, Admin} = require('../middleware/authorization')
const {upload} = require ('../utils/multer')

router.post('/new-post', protect, Admin, upload.array('photos', 2 ), CreateNewPost);
/**
 * @openapi
 * /new-post:
 *   post:
 *      tags: [Post]
 *      summary: Create a new post.
 *      description: Create a new post.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: Title of the post.
 *                description:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      heading:
 *                        type: string
 *                      content:
 *                        type: string
 *                  description: Array of objects containing headings and content of the post.
 *                photos:
 *                  type: array
 *                  items:
 *                    type: string
 *                  description: Array of image URLs for the post.
 *                category:
 *                  type: string
 *                  description: Category of the post.
 *                author:
 *                  type: string
 *                  description: Author of the post.
 *      responses:
 *        201:
 *          description: New post has been created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                  savedPost:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                      title:
 *                        type: string
 *                      description:
 *                        type: array
 *                        items:
 *                          type: object
 *                          properties:
 *                            heading:
 *                              type: string
 *                            content:
 *                              type: string
 *                      photos:
 *                        type: array
 *                        items:
 *                          type: string
 *                      category:
 *                        type: string
 *                      author:
 *                        type: string
 *                      likes:
 *                        type: integer
 *      400:
 *        description: Bad Request. Invalid or missing parameters.
 *      401:
 *        description: Unauthorized. Authentication required.
 *      500:
 *        description: Internal Server Error.
 */

router.get('/posts', getAllPost)
/**
 * @openapi
 * /posts:
 *   get:
 *      tags: [Post]
 *      summary: Get all posts.
 *      description: Get all posts.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: query
 *         in: query
 *         description: Search query to filter posts by author or title.
 *         required: false
 *         type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: false
 *         type: integer
 *         format: int32
 *       - name: limit
 *         in: query
 *         description: Number of posts to return per page.
 *         required: false
 *         type: integer
 *         format: int32
 *      responses:
 *        200:
 *          description: Successfully retrieved the posts.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  count:
 *                    type: integer
 *                  posts:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Post'
 *                  totalPages:
 *                    type: integer
 *                  currentPage:
 *                    type: integer
 *        401:
 *          description: Unauthorized. Authentication required.
 *        500:
 *          description: Internal Server Error.
 */

router.get('/post/:postId', GetSinglePost)
/**
 * @openapi
 * /post/{postId}:
 *   get:
 *      tags: [Post]
 *      summary: Get a single post by postId.
 *      description: Get a single post by postId.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: postId
 *         in: path
 *         description: ID of the post to retrieve.
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Successfully retrieved the post.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post'
 *        401:
 *          description: Unauthorized. Authentication required.
 *        404:
 *          description: Post not found.
 *        500:
 *          description: Internal Server Error.
 */

router.put('/edit-post/:postId', protect, Admin, upload.array('photos', 2), UpdatePost);
/**
 * @openapi
 * /edit-post/{postId}:
 *   put:
 *      tags: [Post]
 *      summary:  Update a post by postId.
 *      description: Update a post by postId.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: postId
 *         in: path
 *         description: ID of the post to update.
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
 *      responses:
 *        200:
 *          description: Successfully updated the post.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post'
 *        400:
 *          description: Bad Request. Invalid or missing parameters.
 *        401:
 *          description: Unauthorized. Authentication required.
 *        403:
 *          description: Forbidden. Access not allowed.
 *        404:
 *          description: Post not found.
 *        500:
 *          description: Internal Server Error.
 */

router.delete('/delete-post/:postId',protect, Admin, DeletePost);
/**
 * @openapi
 * /delete-post/{postId}:
 *   delete:
 *      tags: [Post]
 *      summary: Delete a post by postId.
 *      description: Delete a post by postId.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: postId
 *         in: path
 *         description: ID of the post to delete.
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Successfully deleted the post.
 *        400:
 *          description: Bad Request. Invalid or missing parameters.
 *        401:
 *          description: Unauthorized. Authentication required.
 *        403:
 *          description: Forbidden. Access not allowed.
 *        404:
 *          description: Post not found.
 *        500:
 *          description: Internal Server Error.
 */

router.post('/posts/:postId/like',LikePosts)
/**
 * @openapi
 * /posts/{postId}/like:
 *   post:
 *      tags: [Post]
 *      summary: Like a  post by postId.
 *      description: Like a post by postId.
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *       - name: Authorization
 *         in: header
 *         description: Bearer token
 *         required: true
 *         type: string
 *       - name: postId
 *         in: path
 *         description: ID of the post to like.
 *         required: true
 *         type: string
 *      responses:
 *        200:
 *          description: Successfully liked the post.
 *        400:
 *          description: Bad Request. Invalid or missing parameters.
 *        401:
 *          description: Unauthorized. Authentication required.
 *        403:
 *          description: Forbidden. Access not allowed.
 *        404:
 *          description: Post not found.
 *        500:
 *          description: Internal Server Error.
 */
router.post('/posts/:postId/comment',AddComment)

router.post('/post-ads',upload.single('imageUrl'), createAdvert)
router.get('/adverts/:advertId', getAdvertById)
router.get('/adverts', getAllAdverts)
router.delete('/adverts/:advertId', deleteAdvert)
router.put('/edit-ad/:advertId',upload.single('imageUrl'), updateAdvert)

module.exports = router