// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Meet, { FavoritesGlobal } from "./components/Meet.page";

function App() {
  const people = [
    {
      id: 1,
      name: "John Doe",
      image: "https://westernfinance.org/wp-content/uploads/speaker-3-v2.jpg",
    },
    { id: 2, name: "Jane Doe", image: "" },
    { id: 3, name: "Charlie Mason", image: "" },
    {
      id: 4,
      name: "Bob Smith",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkGb0KXZff72_aNYCOMxSo3wBXLUugcSQItw&s",
    },
    { id: 5, name: "Robert Myers", image: "" },
    {
      id: 6,
      name: "Diana Evans",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5NTBNBrHAvaW_hEYgujDAUqbLQ1j0R22ANw&s",
    },
    { id: 7, name: "Frank Green", image: "" },
    { id: 8, name: "Grace Harris", image: "" },
    { id: 9, name: "Hank Lee", image: "" },
  ];

  return (
    <FavoritesGlobal>
      <Meet people={people} />
    </FavoritesGlobal>
  );
}

export default App;
