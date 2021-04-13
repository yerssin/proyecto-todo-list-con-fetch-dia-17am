import React, { useState, useEffect } from "react";
import TareaForm from "./componentes/TareaForm";
import Tarea from "./componentes/Tarea";
import "./App.css";

function App() {
  const [listaTareas, setListaTareas] = useState([]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/barbaraulloa")
      .then((response) => response.json())
      .then((data) => setListaTareas(data));
  }, []);

  const nuevaTarea = (tarea) => {
    const tareaCreada = {
      done: false,
      label: tarea,
    };
    setListaTareas([tareaCreada, ...listaTareas]);
    actualizarLista([tareaCreada, ...listaTareas]);
  };

  const borrar = (id) => {
    const listaFiltrada = listaTareas.filter((e, index) => index !== id);
    setListaTareas(listaFiltrada);
    actualizarLista(listaFiltrada);
  };

  const actualizarLista = (listaNueva) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(listaNueva);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://assets.breatheco.de/apis/fake/todos/user/barbaraulloa",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <TareaForm nuevaTarea={nuevaTarea} />

      <div className="lista">
        {listaTareas.map((e, index) => (
          <Tarea key={index} tarea={e} borrar={borrar} id={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
