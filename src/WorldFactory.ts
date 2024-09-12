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
    const frontYard = new Room('front yard', 'You are in the front yard. The grass is mostly dead and overgrown. The air is crisp and the sky is cloudy.', []);
    const mailBox = new Item('mailbox', "rather unassuming, but perhaps there's something inside?");
    const livingRoom = new Room('living room', 'You are in the living room.', []);
    const couch = new Item('couch', "chic, midcentury modern and brown of color; though it's not as comfortable as you'd like it to be.");
    const fireplace = new Item('fireplace', 'a standard brick fireplace. The fire is warm and inviting.');
    const plant = new Item('plant', 'large and green with fenstrated leaves. Someone has been caring for it for years.');
    const hallway1 = new Room('hallway', 'You are in a hallway.', []);
    const framedPicture = new Item('picture-frame', "hangs on the wall. Within the frame, a piece of poetry begins: \"Go placidly amidst the noise and haste, and remember what peace there may be in silence...\" The piece is titled \"Desiderata\" and is written by Max Ehrmann.");
    const hallway2 = new Room('hallway', 'You are in a hallway.', []);
    const hallCloset = new Item('closet', 'a large, dark closet looms at the end of the hall; the doors slightly ajar.');
    const hallway3 = new Room('hallway', 'You are in a hallway.', []);
    const musicRoom = new Room('music-room', 'You are in the music room.', []);
    const violin = new Item('violin', 'a well-loved and expensive instrument. You can almost hear Partita no 3 by Bach echo from within it.');
    const clarinet = new Item('clarinet', 'a Buffet R-13 with shimmering silver keys and a wooden body as black as the night. Looking at it fills you with fond memories of the past.');
    const kitchen = new Room('kitchen', 'You are in the kitchen.', []);
    const fridge = new Item('refrigerator', 'a large, stainless-steel fridge with french-doors. Are you snackish?');
    const driveway = new Room('driveway', 'You are in the driveway which runs along the side of the house.', []);
    const exerciseRoom = new Room('exercise room', 'You are in the exercise room.', []);
    const bedroom = new Room('bedroom', 'You are in the bedroom.', []);
    const bed = new Item('bed', 'a queen-sized, white bed with a large, white pillow on the headboard.');
    const bathroom = new Room('bathroom', 'You are in the bathroom.', []);
    const bathTub = new Item('bath-tub', 'a large, rectangular bath tub with a rusty metal faucet.');

    frontYard.addExit('east', livingRoom);
    frontYard.addObject(mailBox);

    livingRoom.addExit('north', hallway1);
    livingRoom.addExit('east', kitchen);
    livingRoom.addExit('west', frontYard);
    livingRoom.addObject(couch);
    livingRoom.addObject(fireplace);
    livingRoom.addObject(plant);

    hallway1.addExit('north', hallway2);
    hallway1.addExit('east', hallway3);
    hallway1.addExit('south', livingRoom);
    hallway1.addExit('west', musicRoom);
    hallway1.addObject(framedPicture);

    musicRoom.addExit('east', hallway1);
    musicRoom.addObject(violin);
    musicRoom.addObject(clarinet);

    hallway2.addExit('south', hallway1);
    hallway2.addExit('east', exerciseRoom);
    hallway2.addObject(hallCloset);

    exerciseRoom.addExit('west', hallway2);

    hallway3.addExit('north', bedroom);
    hallway3.addExit('east', bathroom);
    hallway3.addExit('west', hallway1);

    bedroom.addExit('south', hallway3);
    bedroom.addObject(bed);

    bathroom.addExit('west', hallway3);
    bathroom.addObject(bathTub);

    kitchen.addExit('south', driveway);
    kitchen.addExit('east', livingRoom);
    kitchen.addObject(fridge);

    driveway.addExit('north', kitchen);

    return new World(frontYard);
  }
}
