import { schema } from 'normalizr';

export const card = new schema.Entity('cards');

// Define posts schema
export const collection = new schema.Entity('collections', {
  Cards: [card]
});

export const arrayOfCards = new schema.Array(card);

export const arrayOfCollections = new schema.Array(collection);
