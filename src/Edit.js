import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      livro = null,
      show: false
    }
  }

  render() {
    <Modal show={this.state.show}  onHide={this.closeEdit}>
      <Modal.Header closeButton>
        <Modal.Title>{this.state.livro.titulo}</Modal.Title>
      </Modal.Header>
        <Form onSubmit={this.handleEdit}>
          <Modal.Body>
          <Form.Label>Código:</Form.Label>
          <Form.Control type="number" name="novoCod" placeholder={this.state.livro.cod} />
          <Form.Label>Título:</Form.Label>
          <Form.Control type="text" name="novoTitulo" placeholder={this.state.livro.titulo} />
          <Form.Label>Autor:</Form.Label>
          <Form.Control type="text" name="novoAutor" placeholder={this.state.livro.autor} />
          <Form.Label>Ano:</Form.Label>
          <Form.Control type="number" name="novoAno" placeholder={this.state.livro.ano} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeEdit}>Close</Button>
            <Button type="submit" variant="primary">Salvar</Button>
          </Modal.Footer>
        </Form>
    </Modal>
  }
}
