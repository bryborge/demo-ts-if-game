import { GameObject } from './GameObject';

export class Item extends GameObject {
  openable: boolean;
  takeable: boolean;
  isOpen: boolean;
  isTaken: boolean;
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
    takeable: boolean = false,
    isOpen: boolean = false,
    isTaken: boolean = false,
    contents: GameObject[] = []
  ) {
    super(name, description, true, contents);

    this.openable = openable;
    this.takeable = takeable;
    this.isOpen = isOpen;
    this.isTaken = isTaken;
    this.contents = contents;
  }

  /**
   * Opens the item and returns a message and the contents of the item, if any.
   *
   * If the item is openable and not already open, the message will describe the contents of the item.
   * If the item is openable and already open, the message will indicate that the item is already open.
   * If the item is not openable, the message will indicate that the item cannot be opened.
   *
   * @returns An object with a message and the contents of the item.
   */
  open(): { message: string, contents: GameObject[] } {
    if (this.openable) {
      if (!this.isOpen) {
        this.isOpen = true;
        const contentNames = this.contents.map(obj => obj.name).join(', ');
        const message = this.contents.length > 0
          ? `You open the ${this.name}. A ${contentNames} fell out.`
          : `You open the ${this.name}, but it's empty.`;
        return  { message, contents: this.contents };
      } else {
        return { message: `The ${this.name} is already open.`, contents: [] };
      }
    }

    return { message: `The ${this.name} cannot be opened.`, contents: [] };
  }

  close(): string {
    if (this.isOpen) {
      this.isOpen = false;
      return `You close the ${this.name}.`;
    } else {
      return `The ${this.name} is already closed.`;
    }
  }

  /**
   * Removes the given object from the item's contents.
   *
   * @param object The object to remove from the item's contents.
   */
  removeContent(object: GameObject): void {
    this.contents = this.contents.filter(obj => obj !== object);
  }
}
