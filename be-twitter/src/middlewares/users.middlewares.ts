import { ParamSchema, checkSchema } from 'express-validator'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/Validation'
import { hashPassword } from '~/utils/crypto'

const passwordSchema: ParamSchema = {
  notEmpty: { errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED },
  isString: { errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_A_STRING },
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  },
  //=>> Check độ mạnh của password
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG
  }
}

export const loginValidator = validate(
  checkSchema({
    email: {
      trim: true,
      // Check email có đúng định dạng hay không
      isEmail: { errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID },
      // check email có tồn tại trong db hay không
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.users.findOne({
            email: value,
            password: hashPassword(req.body.password) // Vì khi lưu mật khẩu vào db ta đã hash password
          })
          if (user === null) {
            throw new Error(USERS_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
          }
          req.user = user
          return true
        }
      }
    },
    passwordSchema: passwordSchema
  })
)
