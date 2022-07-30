import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

export function RenderInput({ id, title, label, error, ...rest }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control {...rest} />
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  )
}

export function RenderButton({ label }) {
  return (
    <Button variant="primary" type="submit">
      <FontAwesomeIcon icon={faSave} className="mx-2" />
      {label}
    </Button>
  )
}

export function RenderSelect({ id, label, error, options, ...rest }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Select {...rest}>
        <option value="" />
        {options.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </Form.Select>

      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Form.Group>
  )
}
