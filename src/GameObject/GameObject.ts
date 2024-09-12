import { GameObjectInterface } from "../common/interfaces";

export  class GameObject implements GameObjectInterface {
   name: string;
   description: string;
   examinable: boolean;

  /**
   * Initializes a new instance of GameObject.
   *
   * @param name The name of the object.
   * @param description A longer description of the object.
   * @param examinable Whether the object can be examined.
   */
  constructor(name: string, description: string, examinable: boolean) {
    this.name = name;
    this.description = description;
    this.examinable = examinable;
  }

  /**
   * Returns a string describing the object.
   *
   * If the object is examinable, the description is "The [name] is [description]". If
   * not, the description is "There's nothing significant about the [name]".
   *
   * @returns A string describing the object.
   */
   describe(): string {
    if (this.examinable) {
      return `The ${this.name} is ${this.description}`;
    } else {
      return `There's nothing significant about the ${this.name}`
    }
  }

  /**
   * Implement this method in the concrete class if the object is openable.
   */
  open(): any {
    throw new Error('Method not implemented.');
  }
}
