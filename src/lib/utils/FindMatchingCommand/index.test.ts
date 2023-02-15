import Commands from "commands";
import FindMatchingCommand from "./index";

const mockCommandOne = {
  name: "mockCommand",
  triggers: ["mc", "m"],
  example: "this is a mock command",
  description: "this is a mock command",
  action: jest.fn(),
};

const mockCommandTwo = {
  name: "anotherCoMMAND",
  triggers: ["ac", "a"],
  example: "this is another mock command",
  description: "this is another mock command",
  action: jest.fn(),
};

// necessary evil
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Commands = [mockCommandOne, mockCommandTwo];

describe("lib: FindMatchingCommand", () => {
  it("matches a command by its lowercase name", () => {
    const mockSearchTerm = "mockcommand";
    expect(FindMatchingCommand(mockSearchTerm)).toEqual(mockCommandOne);
  });

  it("matches a command by its trigger", () => {
    const mockSearchTerm = "ac";
    expect(FindMatchingCommand(mockSearchTerm)).toEqual(mockCommandTwo);
  });
});
