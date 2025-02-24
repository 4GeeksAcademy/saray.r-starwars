import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-warning">Characters</h1>
        <div className="my-carousel">
          {store.characters.map((item) => {
            return (
              <div className="my-card" key={item._id}>
                <img
                  src={rigoImage} // Imagen de reemplazo por defecto
                  alt="..."
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = rigoImage; // Asegura que la imagen de reemplazo se muestre si hay errores
                  }}
                />
                <div className="my-body-text">
                  <h3>{item.properties.name}</h3>
                  <p>
                    <strong>Gender: {item.properties.gender}</strong>
                  </p>
                  <p>
                    <strong>Hair color: {item.properties.hair_color}</strong>
                  </p>
                  <p>
                    <strong>Eye-Color: {item.properties.eye_color}</strong>
                  </p>
                </div>
                <div className="my-footer">
                  <Link
                    to={`/characters/${item._id}`}
                    className="btn btn-outline-primary"
                  >
                    Ver más
                  </Link>
                  <button className="btn btn-outline-danger">
                    <i
                      className="fa fa-heart text-danger"
                      onClick={() => {
                        actions.guardarFavoritos(item.properties.name);
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mt-5">
        <h1 className="text-warning">Planets</h1>
        <div className="my-carousel">
          {store.planets.map((item) => {
            return (
              <div className="my-card" key={item.uid}>
                <img
                  src={rigoImage} // Imagen de reemplazo por defecto
                  alt="..."
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = rigoImage; // Asegura que la imagen de reemplazo se muestre si hay errores
                  }}
                />
                <div className="my-body-text">
                  <h3>{item.properties.name}</h3>
                  <p>
                    <strong>Population: {item.properties.population}</strong>
                  </p>
                  <p>
                    <strong>Terrain: {item.properties.terrain}</strong>
                  </p>
                </div>
                <div className="my-footer">
                  <Link
                    to={`/planets/${item._id}`}
                    className="btn btn-outline-primary"
                  >
                    Ver más
                  </Link>
                  <button className="btn btn-outline-danger">
                    <i
                      className="fa fa-heart text-danger"
                      onClick={() => {
                        actions.guardarFavoritos(item.properties.name);
                      }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};