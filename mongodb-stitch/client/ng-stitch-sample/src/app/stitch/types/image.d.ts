import { BSON } from "mongodb-stitch-core-sdk";

export interface Image {
  _id?: BSON.ObjectId;
  image_url?: string;
  computer_vision?: Object;
}
