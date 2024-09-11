import { CommandParser } from "../CommandParser";
import { GameObject } from "../GameObject/GameObject";
import { Player } from "../Player";
import { Room } from "../Room";
import { World } from "../World";

export interface Command {
  action: string;
  target: string;
};

export interface GameInterface {
  running: boolean;
  parser: CommandParser;
  player: Player;
  world: World;
}

export interface GameObjectInterface {
  name: string;
  description: string;
  examinable: boolean;
}

export interface PlayerInterface {
  name: string;
  location: Room;
}

export interface RoomInterface {
  name: string;
  description: string;
  exits: { [direction: string]: Room };
  objects: GameObject[];
}

export interface WorldInterface {
  startingRoom: Room;
}
