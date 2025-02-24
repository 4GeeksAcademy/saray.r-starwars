import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams, useLocation } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";

const Detail = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const location = useLocation();
  const [detail, setDetail] = useState({});
  const isCharacterDetail = location.pathname.includes("characters");

  const search = () => {
    let searchDetail = store.characters
      .concat(store.planets)
      .find((item) => item._id === params.id);
    setDetail(searchDetail);
  };

  useEffect(() => {
    search();
  }, [store.characters, store.planets]);

  return (
    <div className="container mt-5">
      <div className="card border-warning mb-3">
        <div className="card-header text-warning">
          <h3>Details...</h3>
        </div>
        <div className="card-body text-warning">
          <div className="row">
            <div className="col-md-6">
              <img
                src={
                  isCharacterDetail
                    ? `https://starwars-visualguide.com/assets/img/characters/${detail?.uid}.jpg`
                    : `https://starwars-visualguide.com/assets/img/planets/${detail?.uid}.jpg`
                }
                alt={isCharacterDetail ? "Character" : "Planet"}
                className="img-fluid mb-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = rigoImage;
                }}
              />
            </div>
            <div className="col-md-6">
              <h5 className="card-title">{detail?.properties?.name}</h5>
              <p>
                <strong>Gender:</strong> {detail?.properties?.gender}
              </p>
              <p>
                <strong>Eye Color:</strong> {detail?.properties?.eye_color}
              </p>
              <p>
                <strong>Birth Year:</strong> {detail?.properties?.birth_year}
              </p>
              <p>
                <strong>Height:</strong> {detail?.properties?.height}
              </p>
              {!isCharacterDetail && (
                <>
                  <p>
                    <strong>Climate:</strong> {detail?.properties?.climate}
                  </p>
                  <p>
                    <strong>Diameter:</strong> {detail?.properties?.diameter}
                  </p>
                  <p>
                    <strong>Population:</strong> {detail?.properties?.population}
                  </p>
                  <p>
                    <strong>Terrain:</strong> {detail?.properties?.terrain}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;