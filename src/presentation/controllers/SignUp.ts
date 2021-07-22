import { InvalidParamError } from './../errors/invalid-param-error'
import { EmailValidator } from './../protocols/email-validator'
import { Controller } from './../protocols/controller'
import { badRequest } from './../helpers/http-helper'
import { MissingParamError } from './../errors/missing-param-error'
import { HttpRequest, HttpResponse } from './../protocols/http'
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation'
    ]

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
