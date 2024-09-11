import { GameObject } from './GameObject';

export class Item extends GameObject {
  /**
   * Initializes a new instance of Item.
   *
   * @param name The name of the item.
   * @param description A longer description of the item.
   */
  constructor(name: string, description: string) {
    super(name, description, true);
  }
}
