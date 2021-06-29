import { db } from "../main";
import firebase from "firebase";
const favoritesCollections = db.collection("favorites");

export const likeActions = async (userID, action) => {
  const collection = await favoritesCollections.doc(userID).get();
  const data = { favorites: [action] };
  if (collection.exists) {
    var favoriteList = favoritesCollections.doc(userID);

    favoriteList.update({
      favorites: firebase.firestore.FieldValue.arrayUnion(action),
    });
  } else {
    return await favoritesCollections.doc(userID).set(data);
  }
};
