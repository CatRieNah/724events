import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
// copier le tableau focus et le trier par date décroissante
  const byDateDesc = data?.focus
    ? [...data.focus].sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
      )
    : [];
// fonction pour passer à la carte suivante,React passe la valeur actuelle de l'état (index) dans prevIndex.
  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);

    return () => clearTimeout(timer); // Nettoie le timer pour éviter les problèmes de mémoire
  }, [index, byDateDesc.length]); // Redémarre le timer lorsque l'index ou la longueur change

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination unique */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((_, radioIdx) => (
            <input
              key={{radioIdx}} // Clé unique correcte
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)} // Ajoute la possibilité de changer directement
              readOnly // Ajout pour éviter des avertissements React
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;