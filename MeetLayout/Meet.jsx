import React, { createContext, useContext, useState, useEffect } from "react";
import "./Meet.css";

const FavoritesContext = createContext();

export const FavoritesGlobal = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedData = window.localStorage.getItem("favorites");
    if (savedData) {
      try {
        setFavorites(JSON.parse(savedData));
      } catch (error) {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    //If not empty, store
    if (favorites.length > 0) {
      window.localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const addFavorite = (person) => {
    setFavorites((prevFavorites) => {
      //If person isn't in list already
      if (!prevFavorites.find((favorite) => favorite.id === person.id)) {
        return [...prevFavorites, person];
      }
      return prevFavorites;
    });
  };

  const removeFavorite = (removeId) => {
    setFavorites((prevFavorites) => {
      return prevFavorites.filter((favorite) => favorite.id !== removeId);
    });
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

function Meet({ people }) {
  const { favorites, addFavorite, removeFavorite } =
    useContext(FavoritesContext);

  const [showFavorites, setShowFavorites] = useState(false);

  //To generate random colors for profile
  const randomCol = () => {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const display = people.map((person) => {
    return (
      <div id={person.id} key={person.id} className="person">
        <button
          className="favorite"
          onClick={() => addFavorite(person)}
        ></button>
        {person.image ? (
          <img src={person.image} className="image"></img>
        ) : (
          <div className="imageText" style={{ backgroundColor: randomCol() }}>
            {person.name.charAt(0)}
          </div>
        )}
        <div className="name">{person.name}</div>
      </div>
    );
  });

  return (
    <>
      <button onClick={() => setShowFavorites(!showFavorites)}>
        {/* Give the option of the opposite state */}
        {showFavorites ? "Hide Favorites" : "Show Favorites"}
      </button>
      {showFavorites && (
        <div className="favoritesList">
          <ul>
            {favorites.map((person) => (
              <li key={person.id}>
                {person.name + " "}
                <button onClick={() => removeFavorite(person.id)} id="remove">
                  -
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>{display}</div>
    </>
  );
}

export default Meet;
