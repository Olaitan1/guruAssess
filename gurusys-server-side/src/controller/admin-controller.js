const User = require('../model/user-model');
const {registerSchema, loginSchema, GenerateToken, postSchema, forgotPasswordSchema, resetPasswordSchema} = require('../utils/index');
const {GeneratePassword} = require ('../utils/index')
const  {GenerateSalt} = require ('../utils/index')
const {option} = require ('../utils/index')
const bcrypt =require  ('bcrypt');
const Post = require ('../model/post-model');
const { appSecret, FromAdminMail } = require('../config');
const { emailHtml2, mailSent } = require('../utils/notification')
const jwt = require('jsonwebtoken');
const Advert = require('../model/advert-model');
const multer = require('multer');


/*************************  SUPERADMIN REGISTER **************************/

const SuperAdminRegister = async (req, res) =>
{
    try
    {
        const { email, username, password } = req.body
        const validateRegister = registerSchema.validate(req.body, option);
        if (validateRegister.error)
        {
            return res
                .status(400)
                .json({ Error: validateRegister.error.details[0].message });
        }
        //Generate salt
        const salt = await GenerateSalt(10);
        //Encrypting password
        const adminPassword = await GeneratePassword(password, salt);
        const admin = await User.findOne({ $or: [{ email }, { username }] });

        if (admin)
        {
            if (admin.username === username)
            {
                return res.status(400).json({ Error: "Username already exists" });
            }
            if (admin.email === email)
            {
                return res.status(400).json({ Error: "Admin email already exists" });
            }
        }

        //create admin
        const superNewAdmin = await User.create({
            username,
            email,
            password: adminPassword,
            role: "superadmin"
        })
        return res.status(201).json(
            {
                message: "User created successfully",
                newAdmin: superNewAdmin
            }
            
        )
        
    } catch (error)
    {
        res.status(500).json(error)
        console.log(error)
    }
};

/************************************* ADMIN LOGIN ******************************/

const SuperAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body
        const validateRegister = loginSchema.validate(req.body, option);
        if (validateRegister.error)
        {
            return res
                .status(400)
                .json({ Error: validateRegister.error.details[0].message });
        }
    // Find the admin by email
    const admin = await User.findOne({ email });
    
    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({ error: "Not a registered User" });
    }
    
    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    
    // Generate and return a token if the login is successful
    const token = await GenerateToken({
      id: admin.id,
      email: admin.email
    });
    res.status(200).json({ token , admin});
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/****************** RESET PASSWORD*********************/
const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const validateResult = forgotPasswordSchema.validate(req.body, option);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    //check if the User exist
     const oldUser = await User.findOne({ email})

    if (!oldUser)
    {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const secret = appSecret + oldUser.password;
    const token = await GenerateToken({email:oldUser.email, id:oldUser.id})
        

    const link = `${process.env.CLIENT_URL}/forgot-password/?userId=${oldUser.id}&token=${token}`;
    console.log(link)
  
      const html = emailHtml2(link);
      await mailSent(
        FromAdminMail,
        oldUser.email,
        "Reset your password",
        html
      );
      return res.status(200).json({
        message: "password reset link sent to email",
        link,
      });
    
  } catch (error) {
    res.status(500).json({
      Error: "Internal server Error"+error,
      route: "/forgot-password",
      
    });
  }
};

//On clicking the email link ,
const resetPasswordGet = async (req, res) => {
  const { userId, token } = req.params;
  const oldUser = await User.findById( userId )

  if (!oldUser) {
    return res.status(400).json({
      message: "User Does Not Exist",
    });
  }
 
  try {
    const verify = jwt.verify(token, appSecret);
    return res.status(200).json({
      email: oldUser.email,
      verify,
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal server Error"+error,
      route: "/resetpassword/:id/:token",
    });
  }
};

// Page for filling the new password and confirm password

const resetPasswordPost = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const validateResult = resetPasswordSchema.validate(req.body, option);
  if (validateResult.error) {
    return res.status(400).json({
      Error: validateResult.error.details[0].message,
    });
  }
    const oldUser = await User.findOne({ _id: id })
  if (!oldUser) {
    return res.status(400).json({
      message: "user does not exist",
    });
  }
  // const secret = appSecret + oldUser.password;
  try {
    const verify = jwt.verify(token, appSecret);
    const salt = await GenerateSalt()
    const encryptedPassword = await bcrypt.hash(password, salt);
    const updatedPassword = await User.updateOne(
  { _id: id }, 
  { password: encryptedPassword } 
);
    return res.status(200).json({
      message: "you have succesfully changed your password",
      updatedPassword,
    });
  } catch (error) {
    res.status(500).json({
      Error: "Internal server Error"+error,
      route: "/resetpassword/:id/:token",
    });
  }
};

/********************** CREATE ADMIN *************************/

const CreateAdmin = async (req, res) => {
  try {
    const { email, username, password} = req.body;
    const validateRegister = registerSchema.validate(req.body, option);

    if (validateRegister.error) {
      return res.status(400).json({ Error: validateRegister.error.details[0].message });
    }

    // Generate salt
    const salt = await GenerateSalt(10);
    // Encrypting password
    const adminPassword = await GeneratePassword(password, salt);

    if (!req.user || req.user.role !== "superadmin") {
      return res.status(403).json({ message: "You are not authorized to perform this action" });
    }
    // Check if the admin already exists
    const existingAdmin = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingAdmin) {
      if (existingAdmin.username === username) {
        return res.status(400).json({ Error: "Username already exists" });
      }
      if (existingAdmin.email === email) {
        return res.status(400).json({ Error: "Admin email already exists" });
      }
    }

    // Create admin
    const newAdmin = await User.create({
      username,
      email,
      password: adminPassword,
      role: "admin",
    });

    return res.status(201).json({
      message: "You have successfully created an admin",
      newAdmin,
    });
  } catch (error) {
    console.error("Error during admin creation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /admins
const getAllAdmins = async (req, res) => {
  try {
    // Check if the user is a superadmin
    if (req.user.role !== "superadmin") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }

    // Find all admins
    const admins = await User.find({ role: "admin" }).exec();
    const count = admins.length;

      return res.status(200).json({
          count,
          admins
      });
  } catch (error) {
    console.error("Error retrieving admins:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /admin/:adminId
const DeleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    // Check if the user is a superadmin
    if (req.user.role !== "superadmin") {
      return res.status(403).json({
        message: "You are not authorized to perform this action",
      });
    }

    // Find the admin to be deleted
    const admin = await User.findById(adminId).exec();

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // Delete the admin
    await User.deleteOne({ _id: adminId });

    return res.status(200).json({
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Error during admin deletion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const UpdateAdminPassword = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { currentPassword, newPassword } = req.body;

 
    // Find the admin by adminId
    const admin = await User.findOne({ _id: adminId });

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid current password",
      });
    }

    // Generate salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // Update the admin's password
    admin.password = hashedNewPassword;
    await admin.save();

    return res.status(200).json({
      message: "Admin password updated successfully",
    });
  } catch (error) {
    console.error("Error during admin password update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getSingleAdmin = async (req, res) =>
{

  try {
    const { adminId } = req.params;

    // Find the admin by adminId
    const admin = await User.findById(adminId).exec();

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    // Return the admin data
    return res.status(200).json(admin);
  } catch (error) {
    console.error("Error while fetching admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/************************************* CREATE NEW POST****************************************/

const CreateNewPost = async (req, res) => {
  try {
    // Validate the request body using the postSchema
    const { error } = postSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ Error: error.details[0].message });
    }

    // Check if the post with the same title already exists
    const existingPost = await Post.findOne({ title: req.body.title });
    if (existingPost) {
      return res.status(400).json({ Error: "Post with the same title already exists" });
    }

    // Check if photos are uploaded
    if (!req.files || req.files.length < 1) {
      return res.status(400).json({ Error: "Photos are required" });
    }

    // Get image files from the request
    const images = req.files.map(file => file.path);

    // Create a new post using the Post model
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description.map(item => ({ heading: item.heading, content: item.content })),
      photos: images,
      category: req.body.category,
      author: req.body.author,
      likes: 0,
      comments: [],
    });

    // Save the new post to the database
    const savedPost = await newPost.save();

    return res.status(201).json({
      message: "New Post has been uploaded successfully",
      savedPost
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
  



/**************** Get all posts****************/

// const GetAllPost = async (req, res) => {
//   try {
//     const { query, page, limit } = req.query;

//     const currentPage = parseInt(page) || 1;
//     const limitPerPage = parseInt(limit) || 9;
//     const offset = (currentPage - 1) * limitPerPage;

//     let queryPage = {};
//     if (query) {
//       queryPage = {
//         $or: [
//           { author: { $regex: query, $options: "i" } },
//           { title: { $regex: query, $options: "i" } },
//         ],
//       };
//     }

//     const posts = await Post.find(queryPage)
//       .skip(offset)
//       .limit(limitPerPage);

//     const count = await Post.countDocuments(queryPage);
//     const totalPages = Math.ceil(count / limitPerPage);

//     res.status(200).json({
//       count,
//       posts,
//       totalPages,
//       currentPage,
//     });
//   } catch (error) {
//     console.error("Error while fetching posts:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// Get All Posts
const GetAllPost = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts.length === 0 || posts === undefined) {
      return res.json(posts);
    }
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ Error: "Error fetching posts" });
  }
};


// Get Single Post

const GetSinglePost = async (req, res) =>
{
  try
  {
    const {postId} = req.params;
    // Find the post by its _id in the database
    const post = await Post.findById(postId).exec();
    if (!post) {
      // If post with the given _id is not found, return a 404 response
      return res.status(404).json({ Error: 'Post not found' });
    }

    // Return the post data
    return res.status(200).json({
      post,
    });
  } catch (error) {
    console.error('Error while fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a post
const UpdatePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, description, category } = req.body;
    // Check if photos are uploaded
    if (!req.files || req.files.length < 1) {
      return res.status(400).json({ Error: "Photos are required" });
    }

            const images = req.files.map(file => file.path);

 const validatePosting = postSchema.validate(req.body, option);
        if (validatePosting.error)
        {
            return res
                .status(400)
                .json({ Error: validatePosting.error.details[0].message });
        }
    // Find the post by its ID
    const post = await Post.findByIdAndUpdate(
      postId,
      { title, description, category, photos:images },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    console.error("Error during post update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a post
const DeletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find the post by its ID and delete it
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error during post deletion:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Create a new advertisement with image upload
// const upload = multer({ dest: 'temp/' });

const createAdvert = async (req, res) =>
{
  try
  {
    
    const { title, link, startDate, endDate, position } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const newAdvert = new Advert({
      title,
      imageUrl,
      link,
      startDate,
      endDate,
      position
    });

    const savedAdvert = await newAdvert.save();
    res.status(201).json(savedAdvert);
  } catch (error)
  {
    console.error('Error during advert creation:', error);
    res.status(500).json({ error: 'Internal server error', error });
  }
}
//Get all advertisements
const getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find();
    res.status(200).json(adverts);
  } catch (error) {
    console.error('Error while fetching adverts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single advertisement by ID
const getAdvertById = async (req, res) => {
  try {
    const advertId = req.params.advertId;
    const advert = await Advert.findById(advertId);

    if (!advert) {
      return res.status(404).json({ error: 'Advert not found' });
    }

    res.status(200).json(advert);
  } catch (error) {
    console.error('Error while fetching advert:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Update an existing advertisement
const updateAdvert = async (req, res) =>
{
  try
  {
   
    const advertId = req.params.advertId;
    const { title, link, startDate, endDate } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const updatedAdvert = await Advert.findByIdAndUpdate(
      advertId,
      {
        title,
        imageUrl,
        link,
        startDate,
        endDate,
      },
      { new: true }
    );

    if (!updatedAdvert)
    {
      return res.status(404).json({ error: 'Advert not found' });
    }

    res.status(200).json({ message:"Updated advert successfully",updatedAdvert });
  } catch (error)
  {
    console.error('Error during advert update:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Delete an advertisement by ID
const deleteAdvert = async (req, res) => {
  try {
    const advertId = req.params.advertId;
    const deletedAdvert = await Advert.findByIdAndDelete(advertId);

    if (!deletedAdvert) {
      return res.status(404).json({ error: 'Advert not found' });
    }

    res.status(200).json({ message: 'Advert deleted successfully' });
  } catch (error) {
    console.error('Error during advert deletion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  AdminRegister: SuperAdminRegister,
  AdminLogin: SuperAdminLogin,
  ForgotPassword,
  CreateAdmin,
  DeleteAdmin,
  getAllAdmins,
  UpdateAdminPassword,
  getSingleAdmin,
  CreateNewPost,
  getAllPost: GetAllPost,
  UpdatePost,
  DeletePost,
  GetSinglePost,
  resetPasswordGet,
  resetPasswordPost,
  getAllAdverts,
  getAdvertById,
  deleteAdvert,
  updateAdvert,
  createAdvert
};
