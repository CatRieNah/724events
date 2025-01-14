export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};
// date.getMonth retourne un nombre entre 0 et 11, et comme la clé de l'objet MONTHS commence à 1, on ajoute 1 à la valeur de date.getMonth pour obtenir le mois correspondant.
export const getMonth = (date) => MONTHS[date.getMonth() +1];
