import { useEffect, useRef, useState } from "react";
import "./SimpleForm.css";

export const SimpleForm = () => {
  const [formData, setFormData] = useState({
    matricula: "",
    nombre: "",
    apellidos: "",
    edad: "",
    universidad: "",
    carrera: "",
  });

  const { matricula, nombre, apellidos, edad, universidad, carrera } = formData;
  const [enviado, setEnviado] = useState(false);
  const inputRef = useRef(null);

  const onInputChange = ({ target }) => {
    const { name, value } = target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="page-container">
      <div className="form-card">
        <h2 className="form-title">Formulario Login</h2>

        <form onSubmit={onSubmitForm} className="form-body">
          <input ref={inputRef} type="text" className="form-input" placeholder="Matrícula" name="matricula"
            value={matricula}
            onChange={onInputChange}
          />

          <input type="text" className="form-input"placeholder="Nombre" name="nombre"
            value={nombre}
            onChange={onInputChange}
          />

          <input type="text" className="form-input" placeholder="Apellidos" name="apellidos"
            value={apellidos}
            onChange={onInputChange}
          />

          <input type="text" className="form-input" placeholder="Edad" name="edad"
            value={edad}
            onChange={onInputChange}
          />

          <input type="text" className="form-input" placeholder="Universidad" name="universidad"
            value={universidad}
            onChange={onInputChange}
          />

          <input type="text" className="form-input" placeholder="Carrera" name="carrera"
            value={carrera}
            onChange={onInputChange}
          />

          <button type="submit" className="form-button">
            Enviar
          </button>
        </form>

        {enviado && (
          <div className="result-box">
            <h3>Datos enviados</h3>
            <p>Matrícula: {matricula}</p>
            <p>Nombre: {nombre}</p>
            <p>Apellidos: {apellidos}</p>
            <p>Edad: {edad}</p>
            <p>Universidad: {universidad}</p>
            <p>Carrera: {carrera}</p>
          </div>
        )}
      </div>
    </div>
  );
};