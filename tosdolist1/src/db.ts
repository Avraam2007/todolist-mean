export type CardStatus = "done" | "active" | "deleted";

export interface CardObject {
    id: number,
    title: String,
    status: CardStatus
}

const database : CardObject[] = [];

export const getDatabase = () => database;

export const clearDatabase = () => database.length = 0;

export function sendData(): void {
      fetch('http://localhost:3001/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(getDatabase())
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }

export function receiveData(): void {
    fetch('http://localhost:3001/api/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(getDatabase())
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}