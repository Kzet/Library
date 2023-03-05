import { Client } from "./client";
import { Genre } from "./genre";

export class Book {
  id: number;
  name: string;
  author: string;
  genre: Genre;
  genreId: number;
  client: Client;
  clientId: number;
  available: boolean;
}
