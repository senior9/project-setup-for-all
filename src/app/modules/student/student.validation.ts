import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Z][a-z]*$/)
    .messages({
      "string.pattern.base": "{#label} is not in the capitalize format",
      "string.empty": "First name is required"
    }),
  middleName: Joi.string().trim().allow(''),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.pattern.base": "{#label} is not perfectly correct",
      "string.empty": "Last name is required"
    })
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    "string.empty": "Father's name is required"
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    "string.empty": "Father's occupation is required"
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    "string.empty": "Father's contact number is required"
  }),
  motherName: Joi.string().trim().required().messages({
    "string.empty": "Mother's name is required"
  }),
  motherOccupation: Joi.string().trim().required().messages({
    "string.empty": "Mother's occupation is required"
  }),
  motherContactNo: Joi.string().trim().required().messages({
    "string.empty": "Mother's contact number is required"
  })
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Local guardian's name is required"
  }),
  occupation: Joi.string().trim().required().messages({
    "string.empty": "Local guardian's occupation is required"
  }),
  contactNo: Joi.string().trim().required().messages({
    "string.empty": "Local guardian's contact number is required"
  }),
  address: Joi.string().trim().required().messages({
    "string.empty": "Local guardian's address is required"
  })
});

const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    "string.empty": "ID is required"
  }),
  name: userNameValidationSchema.required().messages({
    "any.required": "Name is required"
  }),
  gender: Joi.string()
    .valid("female", "male", "other")
    .required()
    .messages({
      "any.only": "{#label} is not supported",
      "string.empty": "Gender is required"
    }),
  dateOfBirth: Joi.string().trim().allow(''),
  email: Joi.string().trim().email().required().messages({
    "string.email": "Email must be a valid email address",
    "string.empty": "Email is required"
  }),
  contactNo: Joi.string().trim().required().messages({
    "string.empty": "Contact number is required"
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    "string.empty": "Emergency contact number is required"
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-")
    .allow(''),
  presentAddress: Joi.string().trim().required().messages({
    "string.empty": "Present address is required"
  }),
  permanentAddress: Joi.string().trim().required().messages({
    "string.empty": "Permanent address is required"
  }),
  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian information is required"
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local guardian information is required"
  }),
  profileImg: Joi.string().trim().uri().allow(''),
  isActive: Joi.string()
    .valid("active", "inactive")
    .default("active")
    .trim()
});

export default studentValidationSchema;
