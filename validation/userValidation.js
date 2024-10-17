const Joi = require('joi');

const userValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': '"Name" should be a type of text',
            'string.empty': '"Name" cannot be an empty field',
            'string.min': '"Name" should have a minimum length of 3',
            'string.max': '"Name" should have a maximum length of 50',
            'any.required': '"Name" is a required field',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': '"Email" must be a valid email',
            'string.empty': '"Email" cannot be an empty field',
            'any.required': '"Email" is a required field',
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': '"Password" should be a type of text',
            'string.empty': '"Password" cannot be an empty field',
            'string.min': '"Password" should have a minimum length of 6',
            'any.required': '"Password" is a required field',
        }),
});

module.exports = userValidationSchema;
