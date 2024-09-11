import { Room } from './Room';

export class World {
  currentRoom: Room;

  /**
   * Initializes a new instance of World.
   *
   * @param startRoom The starting room for the game.
   */
  constructor(startRoom: Room) {
    this.currentRoom = startRoom;
  }

  /**
   * Move the player in a given direction.
   *
   * @param direction The direction to move in.
   * @returns A string describing the result of the move.
   */
  movePlayer(direction: string) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    if (nextRoom) {
      this.currentRoom = nextRoom;
      return `You move ${direction}.`;
    } else {
      return `You can't go ${direction} from here.`;
    }
  }

  /**
   * Returns a string describing the room the player is currently in.
   */
  describeCurrentRoom() {
    return this.currentRoom.description;
  }
}
