import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import "./Meet.page.css";

const FavoritesContext = createContext();

export const FavoritesGlobal = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/favorites")
      .then((res) => {
        setFavorites(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:4000/favorites").then((res) => {
      const existingFavorites = res.data;

      //Avoid duplicates
      const favoritesToAdd = favorites.filter((favorite) => {
        return !existingFavorites.some(
          (existing) => existing.id === favorite.id
        );
      });

      favoritesToAdd.forEach((favorite) => {
        axios.post("http://localhost:4000/favorites", favorite);
      });
    });
  }, [favorites]);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const addFavorite = (person) => {
    setFavorites((prevFavorites) => {
      //If person isn't in list already
      if (!prevFavorites.find((favorite) => favorite.id === person.id)) {
        return [...prevFavorites, person];
      }
      return prevFavorites;
    });
  };
  const removeFavorite = async (removeId) => {
    try {
      await axios.delete(`http://localhost:4000/favorites/${removeId}`);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((person) => person.id !== removeId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

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
          <img src={person.image} className="image" alt="Profile Pic"></img>
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
