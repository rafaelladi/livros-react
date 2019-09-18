import ReactTable from 'react-table';
import 'react-table/react-table.css';
import React from 'react';
import {Livro} from './Livro.js';
import './TabLivro.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


export class TabLivro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      selected: '',
      novoCod: '',
      novoTitulo: '',
      novoAutor: '',
      novoAno: '',
      cod: '',
      titulo: '',
      autor: '',
      ano: '',
      pesq: '',
      showPesq: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePesqChange = this.handlePesqChange.bind(this);
    this.handlePesq = this.handlePesq.bind(this);
    this.livros = [];
    this.pesquisa = [];
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEditChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePesqChange(e) {
    this.setState({
      pesq: e.target.value
    })
  }

  handlePesq(e) {
    e.preventDefault();
    console.log(this.livros.length);
    this.pesquisa = [];
    let x=this.livros.length;
    if(this.state.pesq === '') {
      this.pesquisa = this.livros;
    } else if(!isNaN(this.state.pesq)) { //pesquisa por codigo
      for(let i=0;i<x;i++) {
        console.log(i + " - " + this.livros.length)
        if(this.state.pesq === this.livros[i].cod) {
          console.log("achou");
          this.pesquisa.push(this.livros[i]);
        }
      }
    } else { //pesquisa por titulo
      for(let i=0;i<x;i++) {
        if(this.state.pesq.toUpperCase() === this.livros[i].titulo.toUpperCase()) {
          console.log("achou " + this.livros[i].cod );
          this.pesquisa.push(this.livros[i]);
        }
      }
    }
    this.setState({
      pesq: '',
      showPesq: true
    })
  }

  handleSubmit(e) {
    console.log(this.state.novoCod + "\n" + this.state.novoTitulo + "\n" + this.state.novoAutor + "\n" + this.state.novoAno);
    if(this.state.novoCod === null || this.state.novoAno === null || this.state.novoAutor === '' || this.state.novoTitulo === '')
      alert("Preencha todos os campos para cadastrar um novo livro!");
    else {
      for(let i=0;i<this.livros.length;i++) {
        if(this.livros[i].cod === this.state.novoCod) {
          alert("Codigo ja cadastrado!");
          e.preventDefault();
          return 0;
        }
      }
      this.livros.push(new Livro(this.state.novoCod, this.state.novoAutor, this.state.novoTitulo, this.state.novoAno));
      this.pesquisa = this.livros;
      this.setState({
        novoCod: '',
        novoTitulo: '',
        novoAutor: '',
        novoAno: '',
      });
    }
    e.preventDefault();
  }

  handleDelete(e) {
    let novo = [];
    for(let i=0;i<this.livros.length;i++) {
      if(i !== this.state.selected) {
        novo.push(this.livros[i]);
      }
    }
    this.livros = novo;
    this.pesquisa = novo;
    this.setState({selected: null});
    this.closeEdit();
    console.log(this.livros);
  }

  handleEdit(e) {
    e.preventDefault();
    let livro = new Livro(this.state.cod, this.state.autor, this.state.titulo, this.state.ano);
    if(livro.autor === '' || livro.titulo === '' || livro.ano === null) {
      alert("Preencha todos os campos para alterar o livro!");
    } else {
      this.livros[this.state.selected] = livro;
      console.log(livro);
    }
    this.closeEdit();
  }

  openEdit() {
    this.setState({showEdit: true});
  }

  closeEdit() {
    this.setState({showEdit:false});
  }

  render() {
    const columns = [{
      Header: 'Código',
      id: 'cod',
      accessor: d=>Number(d.cod),
    }, {
      Header: 'Título',
      accessor: 'titulo',
    }, {
      Header: 'Autor',
      accessor: 'autor'
    }, {
      Header: 'Ano',
      id: 'ano',
      accessor: d=>Number(d.ano)
    }]
    return (
      <div className="main">
        <Modal show={this.state.showEdit}  onHide={this.closeEdit}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.titulo}</Modal.Title>
          </Modal.Header>
            <Form onSubmit={this.handleEdit}>
              <Modal.Body>
              <Form.Label>Código:</Form.Label>
              <Form.Control size="sm" type="number" name="cod" placeholder={this.state.cod} value={this.state.cod} disabled={true} onChange={this.handleEditChange}/>
              <Form.Label>Título:</Form.Label>
              <Form.Control size="sm" type="text" name="titulo" placeholder={this.state.titulo} value={this.state.titulo} onChange={this.handleEditChange} />
              <Form.Label>Autor:</Form.Label>
              <Form.Control size="sm" type="text" name="autor" placeholder={this.state.autor} value={this.state.autor} onChange={this.handleEditChange} />
              <Form.Label>Ano:</Form.Label>
              <Form.Control size="sm" type="number" name="ano" placeholder={this.state.ano} value={this.state.ano} onChange={this.handleEditChange}/>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeEdit}>Fechar</Button>
                <Button variant="danger" onClick={this.handleDelete}>Apagar</Button>
                <Button type="submit" variant="primary">Salvar</Button>
              </Modal.Footer>
            </Form>
        </Modal>
        <div className="left div">
        <Form onSubmit={this.handleSubmit}>
          <Form.Label>Código:</Form.Label>
          <Form.Control size="sm" type="number" name="novoCod" placeholder="Código do livro" value={this.state.novoCod} onChange={this.handleChange} />
          <Form.Label>Título:</Form.Label>
          <Form.Control size="sm" type="text" name="novoTitulo" placeholder="Título do livro" value={this.state.novoTitulo} onChange={this.handleChange} />
          <Form.Label>Autor:</Form.Label>
          <Form.Control size="sm" type="text" name="novoAutor" placeholder="Autor do livro" value={this.state.novoAutor} onChange={this.handleChange} />
          <Form.Label>Ano:</Form.Label>
          <Form.Control size="sm" type="number" name="novoAno" placeholder="Ano de lançamento" value={this.state.novoAno} onChange={this.handleChange} />

          <Button size="sm" variant="primary" type="submit">Novo livro</Button>
        </Form>
      </div>
      <div className="right div">
        <Form onSubmit={this.handlePesq}>
          <Form.Label>Pesquisar: </Form.Label>
          <Form.Control className="pesq" size="sm" type="text" name="pesquisa" placeholder="Digite o nome ou código do livro" onChange={this.handlePesqChange} />
          <Button size="sm" variant="primary" type="submit">Pesquisar</Button>
        </Form>
        <br />
      <div className="table">
      <ReactTable
        NoDataComponent={() => null}
        data={this.pesquisa}
        resizable={false}
        columns={columns}
        minRows={4}
        showPagination={false}
        getTrProps={(state, rowInfo) => {
          if(rowInfo && rowInfo.row) {
            return {
              onClick: (e) => {
                this.setState({
                  selected: rowInfo.index,
                  cod: rowInfo.original.cod,
                  titulo: rowInfo.original.titulo,
                  autor: rowInfo.original.autor,
                  ano: rowInfo.original.ano
                })
                console.log(rowInfo.original.cod + "\n" + rowInfo.original.titulo + "\n" + rowInfo.original.autor + "\n" + rowInfo.original.ano);
                console.log("index: " + rowInfo.index + " selected: " + this.state.selected);
              },
              onDoubleClick: (e) => {
                this.openEdit();
              },
              style: {
                background: rowInfo.index === this.state.selected ? '#4c5461' : '#282c34',
                color: rowInfo.index === this.state.selected ? 'white' : 'white'
              }
            }
          } else {
            return {}
          }
        }}
      />
  </div>
  </div>
  </div>
    )
  }
}
