export type Command = {
  action: string;
  target: string | null;
};

export class CommandParser {
  parse(command: string): Command {
    const words  = command.split(' ');
    const action = words[0];
    const target = words[1] || null;

    return { action, target };
  }
}
