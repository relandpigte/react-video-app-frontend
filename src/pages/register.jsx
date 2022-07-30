import Joi from 'joi-browser'
import auth from '../services/authService'
import { Container, Form } from 'react-bootstrap'
import { useState } from 'react'
import { RenderButton, RenderInput } from '../components/common/formInputs'
import { register } from '../services/userService'
import { toast } from 'react-toastify'

function Register() {
  const [data, setData] = useState({
    user: { name: '', email: '', password: '' },
    errors: [],
  })

  const schema = {
    name: Joi.string().min(5).max(50).required().label('Title'),
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(5).max(50).required(),
  }

  const validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(data.user, schema, options)
    if (!error) return null

    const errors = {}
    error.details.map((detail) => (errors[detail.path[0]] = detail.message))
    return errors
  }

  const validateField = (name, value, schema) => {
    const { error } = Joi.validate({ [name]: value }, { [name]: schema[name] })
    if (!error) return null

    const errors = {}
    error.details.map((detail) => (errors[detail.path[0]] = detail.message))
    return errors
  }

  const handleChange = (e) => {
    const { id: name, value } = e.target
    const errors = validateField(name, value, schema) ?? {}

    setData({
      ...data,
      user: { ...data.user, [name]: value },
      errors: { ...data.errors, [name]: errors[name] },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validate()
    setData({ ...data, errors: errors })
    if (errors) return

    try {
      const response = await register(data.user)
      auth.loginWithJwt(response.headers['x-auth-token'])

      window.location = '/'
    } catch (ex) {
      if (ex.response?.status === 400) {
        toast.error(ex.response.data)
      }
    }
  }

  const { user, errors } = data
  return (
    <main>
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle mx-auto w-50 border p-4">
          <h3>Register</h3>

          <Form onSubmit={handleSubmit}>
            <RenderInput
              type="text"
              id="name"
              label="Name"
              placeholder="Name"
              onChange={handleChange}
              value={user.name}
              error={errors?.name}
            />

            <RenderInput
              type="email"
              id="email"
              label="Email"
              placeholder="email@domain.com"
              onChange={handleChange}
              value={user.email}
              error={errors?.email}
            />

            <RenderInput
              type="password"
              id="password"
              label="Password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
              error={errors?.password}
            />

            <RenderButton label="Register" />
          </Form>
        </div>
      </Container>
    </main>
  )
}

export default Register
