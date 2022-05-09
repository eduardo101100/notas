import { useState } from "react";

const App = () => {
  //hool -> use .....
  //stage ->useState

  const [inputsState, setInputsState] = useState({
    title: "",
    date: "",
    note: "",
  });

  let initialState = JSON.parse(localStorage.getItem("notas")) || [];
  const [notas, setNotas] = useState(initialState);

  const handleInputChange = (event) => {
    setInputsState({ ...inputsState, [event.target.name]: event.target.value });
  };

  const handleClickLimpiar = (event) => {
    setInputsState({ title: "", date: "", note: "" });
  };

  const handleClickGuardar = () => {
    setNotas([...notas, inputsState]);
    localStorage.setItem("notas", JSON.stringify(...notas, inputsState));
    handleClickLimpiar();
  };

  const handleRemoveNote = (index) => {
    const NuevoArreglo = [];
    notas.forEach((nota, i) => {
      if (index !== i) {
        NuevoArreglo.push(nota);
      }
    });
    localStorage.setItem("notas", JSON.stringify(NuevoArreglo));
    setNotas(NuevoArreglo);
  };
  const handleClickLimpiarLista = () => {
    setNotas([]);
    localStorage.setItem("notas", JSON.stringify([]));
  };

const handleClicNota = (index) =>{
setInputsState({
    title: notas[index].title,
    date: notas[index].date,
    note: notas[index].note,
  });
};

  return (
    <div className="App container">
      <div className="row">
        <div className="col">
          <h3>Lista</h3>
          {
            notas.length === 0 ?( <p> No hay notas capturadas.</p> 
            ):(
          <ul>
            {notas.map((nota, index) => {
              return (
                <li onClick={() => handleClicNota(index)} 
                key={index} 
                style={{cursor:"pointer"}}>
                  {nota.title} ({nota.date})&nbsp;
                  <i
                    className="bi-x-circle"
                    onClick={() => handleRemoveNote(index)}
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                  ></i>
                </li>
              );
            })}
          </ul>
          )}


          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClickLimpiarLista}
            disabled ={notas.length === 0}
          >
            Limpiar lista
            
          </button>
        </div>
        <div className="col">
          <h3>Notas</h3>
          <label className="mb-2" style={{ width: "100%" }}>
            Titulo
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleInputChange}
              value={inputsState.title}
              style={{ width: "100%" }}
              
            />
          </label>
          <br />
          <label className="mb-2" style={{ width: "100%" }}>
            Fecha
            <input
              id="date"
              name="date"
              type="date"
              onChange={handleInputChange}
              value={inputsState.date}
              style={{ width: "100%" }}
            />
          </label>
          <br />
          <label style={{ width: "100%" }}>
            Nota
            <textarea
              id="note"
              name="note"
              onChange={handleInputChange}
              value={inputsState.note}
              style={{ width: "100%" }}
            />
          </label>
          <hr />
          <div className="row">
            <span className="col">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={handleClickLimpiar}
                style={{ width: "100%" }}
                disabled={inputsState.title === "" && 
                initialState.date === "" &&
                inputsState.note === ""}
              >
                Limpiar
              </button>
            </span>
            <span className="col">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={handleClickGuardar}
                style={{ width: "100%" }}
                disabled={inputsState.title === "" || 
                initialState.date === "" ||
                inputsState.note === ""}
              >
                Guardar
              </button>{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;