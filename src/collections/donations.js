import { db } from "../main";
const actionsCollections = db.collection("actions");

export const createAction = (action) => {
  return actionsCollections.add(action);
};

export const getAllActions = async () => {
  const snapshot = await actionsCollections.orderBy("createdAt", "desc").get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getMyActions = async (user) => {
  const snapshot = await actionsCollections
    .orderBy("createdAt", "desc")
    .where("user", "==", user)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};
