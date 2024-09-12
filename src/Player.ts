import { PlayerInterface } from './common/interfaces';
import { GameObject } from './GameObject/GameObject';
import { Room } from './Room';

export class Player implements PlayerInterface {
  name: string;
  location: Room;
  inventory: GameObject[];

  /**
   * Initializes a new instance of Player.
   *
   * @param name The name of the player.
   * @param startingRoom The room the player starts in.
   */
  constructor(name: string, startingRoom: Room) {
    this.name = name;
    this.location = startingRoom;
    this.inventory = [];
  }

  /**
   * Move in the given direction.
   *
   * @param direction The direction to move (e.g. 'north', 'south', 'up', etc.)
   * @returns A message indicating success or failure of the move.
   */
  move(direction: string): string {
    const nextRoom = this.location.getRoomInDirection(direction);

    if (nextRoom) {
      this.location = nextRoom;
      return `You move ${direction}.`;
    } else {
      return `You can't go ${direction} from here.`;
    }
  }

  /**
   * Examine the given object in the current room.
   *
   * @param object The object to examine.
   * @returns A string describing the object.
   */
  examineObject(object: GameObject): string  {
    return this.location.describeObject(object);
  }

  /**
   * Take the given object from the current room.
   *
   * @param object The object to take.
   * @returns A string indicating success or failure of the take.
   */
  takeObject(object: GameObject): string {
    if (object.takeable && !object.isTaken) {
      object.isTaken = true;
      this.inventory.push(object);
      return `You take the ${object.name}.`; 
    } else {
      return `You can't take the ${object.name}.`;
    }
  }

  /**
   * Drop the given object from your inventory.
   *
   * @param object The object to drop.
   * @returns A string indicating success or failure of the drop.
   */
  dropObject(object: GameObject): string {
    if (this.inventory.includes(object)) {
      object.isTaken = false;
      this.inventory = this.inventory.filter(o => o !== object);
      return `You drop the ${object.name}.`;
    } else {
      return `You don't have the ${object.name}.`;
    }
  }

  /**
   * Returns a string describing the player's current inventory.
   *
   * If the inventory is not empty, the string will be:
   *   Inventory: object1, object2, ...
   * If the inventory is empty, the string will be:
   *   Inventory: <empty>
   */
  listInventory(): string {
    if (this.inventory.length > 0) {
      return `\tInventory: ${this.inventory.map(o => o.name).join(', ')}`;
    } else {
      return "\tInventory: <empty>";
    }
  }

  /**
   * Returns an object in the player's inventory by name.
   *
   * @param target The name of the object to find.
   * @returns The object with the given name, or undefined if no object with that name is in the player's inventory.
   */
  getItemFromInventory(target: string): GameObject | undefined {
    return this.inventory.find(o => o.name === target);
  }

  /**
   * Returns a string describing the room the player is currently in.
   */
  describeCurrentLocation(): string {
    return this.location.describe();
  }
}
