import { Item } from "./GameObject/Item";
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
    const livingRoom = new Room('living room', 'You are in a living room.', []);
    const kitchen = new Room('kitchen', 'You are in a kitchen.', []);
    const garden = new Room('garden', 'You are in a garden.', []);

    const couch = new Item('couch', 'a modern chic and comfortable-looking sitting arrangement.');
    const fridge = new Item('refrigerator', 'a large, stainless-steel fridge with french-doors.');
    const plant = new Item('plant', 'a large, green plant with fenstrated leaves.');
    
    livingRoom.addExit('north', kitchen)
    livingRoom.addObject(couch);

    kitchen.addExit('south', livingRoom);
    kitchen.addExit('east', garden);
    kitchen.addObject(fridge);

    garden.addExit('west', kitchen);
    garden.addObject(plant);

    return new World(livingRoom);
  }
}
