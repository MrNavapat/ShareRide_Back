const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    "string.empty": "first name is required",
    "any.required": "first name is required",
  }),

  lastName: Joi.string().required().trim().messages({
    "string.empty": "last name is required",
    "any.required": "last name is required",
  }),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]/)
    .required()
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters and contain only alphabet and number",
      "any.required": "password is required",
    }),
  userName:Joi.string().required(),
  sex: Joi.string().required(),
  birthday: Joi.date().required(),
  nationality: Joi.string(),
  occupation: Joi.string(),
  telephone: Joi.string(),
  userType: Joi.string(),
  drivingLicense: Joi.string(),
  nationalId: Joi.string(),
  carModel:Joi.string(),
  numSeat:Joi.number(),
  
  
  
 
});

const validateRegister = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    throw error;
  }

  req.body = value;
  console.log(req.body);
  next();
};


const loginSchema = Joi.object({
  
  userName:Joi.string().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]/)
    .required()
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":"password must be characters and contain only alphabet and number",       
      "any.required": "password is required",
    }),
  
 
 
});


const validateLogin = (req, res, next) => {
  
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    throw error;
  }

  req.body = value; 
  next();
};

module.exports= { validateRegister ,validateLogin};
