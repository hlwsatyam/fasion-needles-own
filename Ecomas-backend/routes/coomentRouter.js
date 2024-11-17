const express = require('express');
const authenticateToken = require('../middlewares/verifytoken');
const router = express.Router()
const comment = require('../Models/comment')
router.post('/', authenticateToken, async (req, res) => {


  try {
    const { subject, rating, productId, description } = req.body;
    const { id } = req.user;
    const existingComment = await comment.findOne({ user_id: id, product_id: productId });

    if (existingComment) {
      // User has already commented on this product, update the comment
      try {
        const updateResult = await comment.updateOne(
          { user_id: id, product_id: productId },
          {
            commentSubject: subject,
            star: rating,
            commentDescription: description
          }
        );
        return res.send({ message: 'Comment updated successfully', data: updateResult });
      } catch (err) {
        return res.status(500).send({ message: 'Error updating comment', error: err });
      }
    } else {
      // User has not commented on this product, create a new comment
      const newComment = new comment({
        user_id: id,
        product_id: productId,
        star: rating,
        commentSubject: subject,
        commentDescription: description,
      });

      try {
        const savedComment = await newComment.save();
        return res.status(200).send({ message: 'Comment created successfully', data: savedComment });
      } catch (err) {
        return res.status(500).send({ message: 'Error creating comment', error: err });
      }
    }
  } catch (err) {
    return res.status(500).send({ message: 'Error checking for existing comment', error: err });
  }
});
router.post('/getComment', async (req, res) => {


  try {
    const { product_id } = req.body;

    const existingComment = await comment.find({ product_id: product_id }).populate(
      "user_id"
    )
    if (existingComment) {
      return res.status(200).send({ message: 'Comment found', data: existingComment, length: existingComment.length });
    }
    return res.status(404).send({ message: 'Error checking for existing comment', error: err });
  } catch (err) {
    return res.status(500).send({ message: 'Error checking for existing comment', error: err });
  }
});


module.exports = router