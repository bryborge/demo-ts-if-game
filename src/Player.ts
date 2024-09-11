import { PlayerInterface } from './common/interfaces';
import { Room } from './Room';

export class Player implements PlayerInterface {
  name: string;
  location: Room;

  /**
   * Initializes a new instance of Player.
   *
   * @param name The name of the player.
   * @param startingRoom The room the player starts in.
   */
  constructor(name: string, startingRoom: Room) {
    this.name = name;
    this.location = startingRoom;
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
   * Interacts with the given item in the current room.
   *
   * @param target The item to interact with.
   * @returns A message indicating success or failure of the interaction.
   */
  interact(target: string): string {
    const item = this.location.getItemInRoom(target);

    if (item) {
      // TODO: Build out item interactions
      return `You interact with ${target}.`;
    } else {
      return `There is no ${target} here.`;
    }
  }

  /**
   * Returns a string describing the room the player is currently in.
   */
  describeCurrentLocation(): string {
    return this.location.description;
  }
}
