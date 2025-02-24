import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useLocation } from "react-router-dom";


const Detail = () => {
  
  const { id } = useParams();

  
  const { store, actions } = useContext(Context);

  
  const params = useParams();

 
  const location = useLocation(); 

  
  const [detail, setDetail] = useState({});

  
  const search = () => {
    
    let searchDetail = store.characters
      .concat(store.planets)
      .find((item) => item._id === params.id);

   
    setDetail(searchDetail);
  };

  
  useEffect(() => {
    search(); 
  }, [store.characters, store.planets]);

  
  const isCharacterDetail = location.pathname.includes("characters");

  return (
    <div className="d-flex justify-content-center">
      <div className="card border-danger mb-3">
        <div className="card-header text-danger">
          <h3>star wars</h3>
        </div>
        <div className="card-body text-danger">
          {/* Mostrar detalles específicos del personaje o planeta */}
          <h5 className="card-title">{detail?.properties?.name}</h5>
          <p className="card-text">{detail?.properties?.gender}</p>
          <p className="card-text">{detail?.properties?.eye_color}</p>
          <p className="card-text">{detail?.properties?.birth_year}</p>
          <p className="card-text">{detail?.properties?.height}</p>
          <p className="card-text">{detail?.properties?.climate}</p>
          <p className="card-text">{detail?.properties?.diameter}</p>
          <p className="card-text">{detail?.properties?.population}</p>
          <p className="card-text">{detail?.properties?.terrain}</p>
          {/* Mostrar la imagen correspondiente al tipo de detalle (personaje o planeta) */}
          {isCharacterDetail ? (
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${detail?.uid}.jpg`}
              alt="Character"
            />
          ) : (
            <img
              src={`https://starwars-visualguide.com/assets/img/planets/${detail?.uid}.jpg`}
              alt="Planet"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;