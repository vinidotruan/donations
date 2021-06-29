import { db } from "../main";
const actionsCollections = db.collection("actions");

export const createAction = (action) => {
  return actionsCollections.add(action);
};

export const getAllActions = async () => {
  const snapshot = await actionsCollections.orderBy("createdAt", "desc").get();

  return snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

export const deleteActions = async (id) => {
  console.log(id);
  return await actionsCollections.doc(id).delete();
};

export const getMyActions = async (user) => {
  const snapshot = await actionsCollections
    .orderBy("createdAt", "desc")
    .where("user", "==", user)
    .get();

  return snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};

export const getAction = async (id) => {
  const action = await actionsCollections.doc(id).get();
  return action.exists ? action.data() : null;
};

export const getFavoriteActions = async (user) => {
  const favoritesCollections = db.collection("favorites").doc(user);
  const list = await favoritesCollections.get();
  return list.exists ? list.data() : { favorites: {} };
};
