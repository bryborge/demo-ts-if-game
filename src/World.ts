import { WorldInterface } from './common/interfaces';
import { Room } from './Room';

export class World implements WorldInterface {
  startingRoom: Room;

  /**
   * Initializes a new instance of World.
   *
   * @param startingRoom The starting room for the player.
   */
  constructor(startingRoom: Room) {
    this.startingRoom = startingRoom;
  }
}
