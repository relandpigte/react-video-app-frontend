import Joi from 'joi-browser'
import { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovie, saveMovie } from '../services/movieServices'
import { getGenres } from '../services/genreService'
import { RenderInput, RenderButton, RenderSelect } from './common/formInputs'

function MovieForm() {
  const { movieId } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({
    movie: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
    errors: {},
  })

  const schema = {
    _id: Joi.string(),
    title: Joi.string().min(5).max(50).required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate'),
  }

  useEffect(() => {
    const populateGenres = async () => {
      const { data: genres } = await getGenres()
      setData((prevData) => ({ ...prevData, genres }))
    }

    const populateMovies = async () => {
      try {
        if (movieId === 'new') return

        const { data: movie } = await getMovie(movieId)
        setData((prevData) => ({ ...prevData, movie: mapMovies(movie) }))
      } catch (ex) {
        if (ex.response?.status === 404) {
          navigate('/not-found')
        }
      }
    }

    populateGenres()
    populateMovies()
  })

  const mapMovies = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    }
  }

  const validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(data.movie, schema, options)
    if (!error) return null

    const errors = {}
    error.details.map((detail) => (errors[detail.path[0]] = detail.message))
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errors = validate()
    setData({ ...data, errors: errors })
    if (errors) return

    const movie = await saveMovie(data.movie)
    if (movie) navigate('/')
  }

  const handleChange = (e) => {
    const { id: name, value } = e.target
    const errors = validateField(name, value, schema) ?? {}

    setData({
      ...data,
      movie: { ...data.movie, [name]: value },
      errors: { ...data.errors, [name]: errors[name] },
    })
  }

  const validateField = (name, value, schema) => {
    const { error } = Joi.validate({ [name]: value }, { [name]: schema[name] })
    if (!error) return null

    const errors = {}
    error.details.map((detail) => (errors[detail.path[0]] = detail.message))
    return errors
  }

  const { movie, errors, genres } = data

  return (
    <main>
      <Container>
        <div className="position-absolute top-50 start-50 translate-middle mx-auto w-50 border p-4">
          <h3>{movieId === 'new' ? `Add movie` : `Edit: ${movie.title}`}</h3>

          <Form onSubmit={handleSubmit}>
            <RenderInput
              type="text"
              id="title"
              label="Title"
              placeholder="Title"
              onChange={handleChange}
              value={movie.title}
              error={errors?.title}
            />

            <RenderSelect
              id="genreId"
              label="Genre"
              value={movie.genreId}
              onChange={handleChange}
              options={genres}
              error={errors?.genreId}
            />

            <RenderInput
              type="text"
              id="numberInStock"
              label="Stock"
              placeholder="Stock"
              onChange={handleChange}
              value={movie.numberInStock}
              error={errors?.numberInStock}
            />

            <RenderInput
              type="text"
              id="dailyRentalRate"
              label="Rate"
              placeholder="Rate"
              onChange={handleChange}
              value={movie.dailyRentalRate}
              error={errors?.dailyRentalRate}
            />

            <RenderButton label="Save" />
          </Form>
        </div>
      </Container>
    </main>
  )
}

export default MovieForm
