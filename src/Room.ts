export class Room {
  name: string;
  description: string;
  exits: { [direction: string]: Room };

  /**
   * Initializes a new instance of Room.
   *
   * @param name The name of the room.
   * @param description A longer description of the room.
   */
  constructor(name: string, description: string) {
    this.name        = name;
    this.description = description;
    this.exits       = {};
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
   * Gets the room in the given direction from this room.
   *
   * @param direction The direction of the room to retrieve.
   * @returns The room in the given direction, or null if no room exists in that direction.
   */
  getRoomInDirection(direction: string): Room | null {
    return this.exits[direction] || null;
  }
}
