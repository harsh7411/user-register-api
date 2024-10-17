const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../services/emailService');
const { messageResponse } = require('../services/messageResponse');
const userValidationSchema = require('../validation/userValidation');



// Register User and Send Verification Email
const registerUser = async (req, res) => {
const { name, email, password } = req.body;

  // Validate input with Joi validation
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: messageResponse.EMAIL_ALREADY_EXIST });
    };

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    user = new User({
      name,
      email,
      password: hashedPassword,
      profilePicture: req.file ? req.file.filename : '',
    });


    const verificationToken = user.generateVerificationToken();

    const verificationLink = `${process.env.BASE_URL}/api/verify-email?token=${verificationToken}`;
    const emailContent = `<p>Please click the following link to verify your email address:</p><a href="${verificationLink}">Verify Email</a>`;

    // sendEmail Function called here
    const emailSent = await sendEmail(user.email, 'Email Confirmation', emailContent);

    if (emailSent) {
      //save the user
      await user.save();
      return res.status(201).json({
        status: messageResponse.SUCCESS,
        statusCode: 201,
        successMessage: messageResponse.USER_REGISTERED,
      });
    } else {
      // If email failed, throw an error
      throw new Error('Email sending failed');
    }

  } catch (error) {
    res.status(500).json({error: error.message, msg: messageResponse.SERVER_ERROR });
  }
};



// Function to verify email
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    // Find user with the corresponding verification token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },  // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ msg: messageResponse.INVALID_TOKEN });
    }

    // Verify the email
    user.emailConfirmed = true;
    user.verificationToken = undefined;  // Remove the token
    user.verificationTokenExpires = undefined;  // Remove the expiration date
    await user.save();

    res.status(200).json({ status: messageResponse.SUCCESS,msg: messageResponse.EMAIL_VERIFIED });

  } catch (error) {
    res.status(500).json({error:error.message, msg: messageResponse.SERVER_ERROR });
  }
};

module.exports = {
  registerUser,
  verifyEmail,
};