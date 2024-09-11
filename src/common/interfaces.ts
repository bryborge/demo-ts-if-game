import { CommandParser } from "../CommandParser";
import { Player } from "../Player";
import { Room } from "../Room";
import { World } from "../World";

export interface Command {
  action: string;
  target: string | null;
};

export interface GameInterface {
  running: boolean;
  parser: CommandParser;
  player: Player;
  world: World;
}

export interface PlayerInterface {
  name: string;
  location: Room;
}

export interface RoomInterface {
  name: string;
  description: string;
  exits: { [direction: string]: Room };
}

export interface WorldInterface {
  startingRoom: Room;
}
