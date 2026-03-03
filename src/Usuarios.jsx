import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const initialData = [
  { id: 1, nombre: "Jorge Carranza", empresa: "Tec", edad: "20", pais: "Mexico", contacto: "jorge.carranza@tec.mx" },
  { id: 2, nombre: "Ramon Velez", empresa: "Banorte", edad: "21", pais: "Mexico", contacto: "jorge.carranza@tec.mx" },
  { id: 3, nombre: "Hugo Sanchez", empresa: "Real Madrid", edad: "30", pais: "España", contacto: "jorge.carranza@tec.mx" },
  { id: 4, nombre: "Rafael Marquez", empresa: "Barcelona", edad: "35", pais: "España", contacto: "jorge.carranza@tec.mx" },
  { id: 5, nombre: "Carlos Alcaraz", empresa: "Mallorca", edad: "25", pais: "España", contacto: "jorge.carranza@tec.mx" },
  { id: 6, nombre: "N. Djokovic", empresa: "Serbia", edad: "24", pais: "Mexico", contacto: "jorge.carranza@tec.mx" },
  { id: 7, nombre: "Sergio Perez", empresa: "Cadillac", edad: "30", pais: "Mexico", contacto: "jorge.carranza@tec.mx" },
  { id: 8, nombre: "Max Verstappen", empresa: "Oracle Red Bull Racing", edad: "32", pais: "Mexico", contacto: "jorge.carranza@tec.mx" },
  { id: 9, nombre: "Carlos Sainz", empresa: "Williams Racing", edad: "40", pais: "Mexico", contacto: "jorge.carranza@tec.mx" },
];

class App extends React.Component {
  state = {
    data: initialData,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      empresa: "",
      edad: "",
      pais: "",
      contacto: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: { ...dato }, // no editar por referencia
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
      form: {
        id: "",
        nombre: "",
        empresa: "",
        edad: "",
        pais: "",
        contacto: "",
      }, // limpia form al abrir
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  editar = () => {
    const { form, data } = this.state;

    const nuevaData = data.map((registro) =>
      registro.id === form.id
        ? {
            ...registro,
            nombre: form.nombre,
            empresa: form.empresa,
            edad: form.edad,
            pais: form.pais,
            contacto: form.contacto,
          }
        : registro
    );

    this.setState({
      data: nuevaData,
      modalActualizar: false,
      form: {
        id: "",
        nombre: "",
        empresa: "",
        edad: "",
        pais: "",
        contacto: "",
      },
    });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(
      "¿Estás seguro que deseas eliminar el elemento " + dato.id + "?"
    );
    if (!opcion) return;

    const nuevaData = this.state.data.filter((registro) => registro.id !== dato.id);

    this.setState({ data: nuevaData, modalActualizar: false });
  };

  insertar = () => {
    const { form, data } = this.state;

    const nuevoId = data.length ? Math.max(...data.map((x) => x.id)) + 1 : 1;

    const valorNuevo = {
      id: nuevoId,
      nombre: form.nombre,
      empresa: form.empresa,
      edad: form.edad,
      pais: form.pais,
      contacto: form.contacto,
    };

    this.setState({
      data: [...data, valorNuevo],
      modalInsertar: false,
      form: {
        id: "",
        nombre: "",
        empresa: "",
        edad: "",
        pais: "",
        contacto: "",
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={this.mostrarModalInsertar}>
            Crear
          </Button>
          <br />
          <br />

          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Edad</th>
                <th>Pais</th>
                <th>Contacto</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.empresa}</td>
                  <td>{dato.edad}</td>
                  <td>{dato.pais}</td>
                  <td>{dato.contacto}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* MODAL ACTUALIZAR */}
        <Modal isOpen={this.state.modalActualizar} toggle={this.cerrarModalActualizar}>
          <ModalHeader toggle={this.cerrarModalActualizar}>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.empresa}
              />
            </FormGroup>

            <FormGroup>
              <label>Edad:</label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.edad}
              />
            </FormGroup>

            <FormGroup>
              <label>Pais:</label>
              <input
                className="form-control"
                name="pais"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.pais}
              />
            </FormGroup>

            <FormGroup>
              <label>Contacto:</label>
              <input
                className="form-control"
                name="contacto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.contacto}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.editar}>
              Editar
            </Button>
            <Button color="danger" onClick={this.cerrarModalActualizar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* MODAL INSERTAR */}
        <Modal isOpen={this.state.modalInsertar} toggle={this.cerrarModalInsertar}>
          <ModalHeader toggle={this.cerrarModalInsertar}>
            <div>
              <h3>Insertar</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={
                  this.state.data.length
                    ? Math.max(...this.state.data.map((x) => x.id)) + 1
                    : 1
                }
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.empresa}
              />
            </FormGroup>

            <FormGroup>
              <label>Edad:</label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.edad}
              />
            </FormGroup>

            <FormGroup>
              <label>Pais:</label>
              <input
                className="form-control"
                name="pais"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.pais}
              />
            </FormGroup>

            <FormGroup>
              <label>Contacto:</label>
              <input
                className="form-control"
                name="contacto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.contacto}
              />
            </FormGroup>
            
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>
              Insertar
            </Button>
            <Button className="btn btn-danger" onClick={this.cerrarModalInsertar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
