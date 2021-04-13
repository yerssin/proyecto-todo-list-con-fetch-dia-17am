import React, { useState } from "react";
import "../App.css";

const TareaForm = ({ nuevaTarea }) => {
  const [inputText, setInputText] = useState("");
  const [valido, setValido] = useState(true);

  const manejarFormulario = (event) => {
    setInputText(event.target.value);
  };

  const agregarTarea = (event) => {
    event.preventDefault();

    if (inputText === "") {
      setValido(false);
    } else {
      nuevaTarea(inputText);
      setInputText("");
      setValido(true);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={agregarTarea}>
        <span>Añadir tarea</span>
        <input
          value={inputText}
          onChange={manejarFormulario}
          placeholder="Ej.: Pasear a ghost"
        />
      </form>
      {!valido ? (
        <div className="validacion">Añada una tarea, por favor</div>
      ) : null}
    </div>
  );
};

export default TareaForm;
