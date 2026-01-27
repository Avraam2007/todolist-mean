// const response = await fetch('../json/database.json');

const database = [];

export const getDatabase = () => database;

export const clearDatabase = () => database.length = 0;