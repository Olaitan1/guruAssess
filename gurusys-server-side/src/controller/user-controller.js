const Post = require('../model/post-model');

// Endpoint to increase likes
const LikePosts = async (req, res) =>
{
    const postId = req.params.postId;

   try {
    const postId = req.params.postId;

    // Use findOneAndUpdate to increment the likes field
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $inc: { likes: 1 } }, // Increment likes field by 1
      { new: true } // Return the updated post after the update
    ).exec();

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json({ message: 'Like added successfully', post: updatedPost });
  } catch (error) {
    console.error('Error while adding like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//Endpoint to add comment to posts
const AddComment = async (req, res) => {
  const postId = req.params.postId;
  const { content, author } = req.body;

  try {
    // Find the post by postId
    const post = await Post.findOne({ _id: postId }).exec();

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create a new comment object
    const newComment = {
      content,
      author,
      createdAt: new Date(),
    };

    // Push the new comment to the comments array in the post
    post.comments.push(newComment);

    // Save the updated post
    const updatedPost = await post.save();

    return res.status(201).json({ message: 'Comment added successfully', post: updatedPost });
  } catch (error) {
    console.error('Error while adding comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {LikePosts,AddComment}
