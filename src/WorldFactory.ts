import { Room } from "./Room";
import { World } from "./World";

export class WorldFactory {
  /**
   * Creates a default world with rooms. The player starts in the living room.
   *
   * @returns A World object with the described rooms.
   */
  static createDefaultWorld(): World {
    // TODO: Read "map" data from file
    const livingRoom = new Room('living room', 'You are in a living room. There is a couch and a tv.');
    const kitchen = new Room('kitchen', 'You are in a kitchen. There is a table and a fridge.');
    const garden = new Room('garden', 'You are in a garden. There is a plant and some flowers.');
    
    livingRoom.addExit('north', kitchen);
    kitchen.addExit('south', livingRoom);
    kitchen.addExit('east', garden);
    garden.addExit('west', kitchen);

    return new World(livingRoom);
  }
}
