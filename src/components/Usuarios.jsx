import React from "react";
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
  {
    id: 1,
    matricula: "A01645270",
    nombre: "Ariana",
    apellidos: "Espinoza Lopez",
    edad: "21",
    universidad: "Tec",
    carrera: "ITC",
  },
  {
    id: 2,
    matricula: "A01234567",
    nombre: "Carlos",
    apellidos: "Lopez Garcia",
    edad: "22",
    universidad: "Tec",
    carrera: "ISS",
  },
  {
    id: 3,
    matricula: "A09876543",
    nombre: "Maria",
    apellidos: "Torres Ugalde",
    edad: "20",
    universidad: "Tec",
    carrera: "IRS",
  },
];

const emptyForm = {
  id: "",
  matricula: "",
  nombre: "",
  apellidos: "",
  edad: "",
  universidad: "",
  carrera: "",
};

class Usuarios extends React.Component {
  state = {
    data: initialData,
    modalActualizar: false,
    modalInsertar: false,
    form: emptyForm,
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: { ...dato },
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({
      modalActualizar: false,
      form: emptyForm,
    });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
      form: emptyForm,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({
      modalInsertar: false,
      form: emptyForm,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  };

  editar = () => {
    const { form, data } = this.state;

    const nuevaData = data.map((registro) =>
      registro.id === form.id ? { ...registro, ...form } : registro
    );

    this.setState({
      data: nuevaData,
      modalActualizar: false,
      form: emptyForm,
    });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(
      "¿Estás seguro que deseas eliminar el elemento " + dato.id + "?"
    );

    if (!opcion) return;

    const nuevaData = this.state.data.filter(
      (registro) => registro.id !== dato.id
    );

    this.setState({
      data: nuevaData,
      modalActualizar: false,
      form: emptyForm,
    });
  };

  insertar = () => {
    const { form, data } = this.state;

    if (
      form.matricula.trim() === "" ||
      form.nombre.trim() === "" ||
      form.apellidos.trim() === "" ||
      form.edad.trim() === "" ||
      form.universidad.trim() === "" ||
      form.carrera.trim() === ""
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    const nuevoId = data.length ? Math.max(...data.map((x) => x.id)) + 1 : 1;

    const valorNuevo = {
      ...form,
      id: nuevoId,
    };

    this.setState({
      data: [...data, valorNuevo],
      modalInsertar: false,
      form: emptyForm,
    });
  };

  render() {
    const { data, form, modalActualizar, modalInsertar } = this.state;

    return (
      <>
        <Container className="py-4">
          <h2 className="text-center mb-4">CRUD Formulario Login</h2>

          <Button color="success" onClick={this.mostrarModalInsertar}>
            Crear
          </Button>

          <div className="table-wrapper mt-4">
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Matrícula</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Edad</th>
                  <th>Universidad</th>
                  <th>Carrera</th>
                  <th>Acción</th>
                </tr>
              </thead>

              <tbody>
                {data.map((dato) => (
                  <tr key={dato.id}>
                    <td>{dato.id}</td>
                    <td>{dato.matricula}</td>
                    <td>{dato.nombre}</td>
                    <td>{dato.apellidos}</td>
                    <td>{dato.edad}</td>
                    <td>{dato.universidad}</td>
                    <td>{dato.carrera}</td>
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
          </div>
        </Container>

        <Modal isOpen={modalActualizar} toggle={this.cerrarModalActualizar}>
          <ModalHeader toggle={this.cerrarModalActualizar}>
            <h3>Editar Registro</h3>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input className="form-control" readOnly type="text" value={form.id} />
            </FormGroup>

            <FormGroup>
              <label>Matrícula:</label>
              <input
                className="form-control"
                name="matricula"
                type="text"
                onChange={this.handleChange}
                value={form.matricula}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellidos:</label>
              <input
                className="form-control"
                name="apellidos"
                type="text"
                onChange={this.handleChange}
                value={form.apellidos}
              />
            </FormGroup>

            <FormGroup>
              <label>Edad:</label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={this.handleChange}
                value={form.edad}
              />
            </FormGroup>

            <FormGroup>
              <label>Universidad:</label>
              <input
                className="form-control"
                name="universidad"
                type="text"
                onChange={this.handleChange}
                value={form.universidad}
              />
            </FormGroup>

            <FormGroup>
              <label>Carrera:</label>
              <input
                className="form-control"
                name="carrera"
                type="text"
                onChange={this.handleChange}
                value={form.carrera}
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

        <Modal isOpen={modalInsertar} toggle={this.cerrarModalInsertar}>
          <ModalHeader toggle={this.cerrarModalInsertar}>
            <h3>Insertar Registro</h3>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={data.length ? Math.max(...data.map((x) => x.id)) + 1 : 1}
              />
            </FormGroup>

            <FormGroup>
              <label>Matrícula:</label>
              <input
                className="form-control"
                name="matricula"
                type="text"
                onChange={this.handleChange}
                value={form.matricula}
              />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={form.nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellidos:</label>
              <input
                className="form-control"
                name="apellidos"
                type="text"
                onChange={this.handleChange}
                value={form.apellidos}
              />
            </FormGroup>

            <FormGroup>
              <label>Edad:</label>
              <input
                className="form-control"
                name="edad"
                type="text"
                onChange={this.handleChange}
                value={form.edad}
              />
            </FormGroup>

            <FormGroup>
              <label>Universidad:</label>
              <input
                className="form-control"
                name="universidad"
                type="text"
                onChange={this.handleChange}
                value={form.universidad}
              />
            </FormGroup>

            <FormGroup>
              <label>Carrera:</label>
              <input
                className="form-control"
                name="carrera"
                type="text"
                onChange={this.handleChange}
                value={form.carrera}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>
              Insertar
            </Button>
            <Button color="danger" onClick={this.cerrarModalInsertar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Usuarios;