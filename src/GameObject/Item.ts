import { GameObject } from './GameObject';

export class Item extends GameObject {
  openable: boolean;
  isOpen: boolean;
  contents: GameObject[];

  /**
   * Initializes a new instance of Item.
   *
   * @param name The name of the item.
   * @param description A longer description of the item.
   * @param openable Whether the item can be opened.
   * @param contents The contents of the item.
   */
  constructor(
    name: string,
    description: string,
    openable: boolean = false,
    contents: GameObject[] = []
  ) {
    super(name, description, true);

    this.openable = openable;
    this.isOpen = false;
    this.contents = contents;
  }

  /**
   * Opens the item, if it is openable and has not been opened before.
   */
  open(): { message: string, contents: GameObject[] } {
    if (this.openable) {
      if (!this.isOpen) {
        this.isOpen = true;
        const contentNames = this.contents.map(obj => obj.name).join(', ');
        const message = this.contents.length > 0 ? `You open the ${this.name}. Inside, you find: ${contentNames}.` : `You open the ${this.name}.`;
        return  { message, contents: this.contents };
      } else {
        return { message: `The ${this.name} is already open.`, contents: [] };
      }
    }

    return { message: `The ${this.name} cannot be opened.`, contents: [] };
  }
}
