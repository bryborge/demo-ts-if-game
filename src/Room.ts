import { RoomInterface } from "./common/interfaces";
import { GameObject } from "./GameObject/GameObject";

export class Room implements RoomInterface {
  name: string;
  description: string;
  exits: { [direction: string]: Room };
  objects: GameObject[];

  /**
   * Initializes a new instance of Room.
   *
   * @param name The name of the room.
   * @param description A longer description of the room.
   */
  constructor(name: string, description: string, objects: GameObject[]) {
    this.name        = name;
    this.description = description;
    this.exits       = {};
    this.objects     = objects;
  }

  describe(): string {
    let fullDescription = `${this.description}\n\tObjects: `;

    if (this.objects.length > 0) {
      fullDescription += this.objects.map(o => o.name).join(', ');
    } else {
      fullDescription += "There appears to be nothing here.";
    }

    fullDescription += `\n\tExits: ${Object.keys(this.exits).join(', ')}`

    return fullDescription;
  }

  /**
   * Adds an exit from this room in the given direction.
   *
   * @param direction The direction of the exit (e.g. 'north', 'south', 'up', etc.)
   * @param room The room to transition to when going in the given direction.
   */
  addExit(direction: string, room: Room) {
    this.exits[direction] = room;
  }

  /**
   * Adds the given object to the room.
   *
   * @param object The object to add.
   */
  addObject(object: GameObject) {
    this.objects.push(object);
  }

  /**
   * Removes the given object from the room.
   *
   * @param object The object to remove.
   */
  removeObject(object: GameObject) {
    this.objects = this.objects.filter(o => o !== object);
  }

  /**
   * Returns a string describing the given object.
   *
   * @param object The object to describe.
   * @returns A string describing the object.
   */
  describeObject(object: GameObject): string {
    return object.describe();
  }

  /**
   * Gets an object from the room by name.
   *
   * @param name The name of the object to retrieve.
   * @returns The object with the given name, or undefined if no object with that
   * name exists in the room.
   */
  getObject(name: string): GameObject | undefined {
    const object = this.objects.find(o => o.name === name);

    return object;
  }

  /**
   * Gets the room in the given direction from this room.
   *
   * @param direction The direction of the room to retrieve.
   * @returns The room in the given direction, or null if no room exists in that direction.
   */
  getRoomInDirection(direction: string): Room | null {
    return this.exits[direction] || null;
  }
}
