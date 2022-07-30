import { ListGroup } from 'react-bootstrap'

function Sidebar({ genres, onSelectGenre, selectedItem }) {
  return (
    <ListGroup as="ul">
      {genres.map((genre) => (
        <ListGroup.Item
          style={{ cursor: 'pointer' }}
          key={genre._id}
          as="li"
          active={selectedItem === genre ? true : false}
          onClick={() => onSelectGenre(genre)}
        >
          {genre.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}

Sidebar.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
}

export default Sidebar
