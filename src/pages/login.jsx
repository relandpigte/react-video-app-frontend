import Joi from 'joi-browser'
import auth from '../services/authService'

import { RenderButton, RenderInput } from '../components/common/formInputs'
import { Container, Form } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'

function Login() {
  const { state } = useLocation()

  const [data, setData] = useState({
    user: { email: '', password: '' },
    errors: [],
  })

  const schema = {
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(5).max(50).required().label('Password'),
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
      const { email, password } = data.user
      await auth.login(email, password)

      window.location = state?.from ?? '/'
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
          <h3>Login</h3>

          <Form onSubmit={handleSubmit}>
            <RenderInput
              type="email"
              id="email"
              label="Email / Username"
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

            <RenderButton label="Login" />
          </Form>
        </div>
      </Container>
    </main>
  )
}

export default Login
