import { Command } from "lib/types";
import action from "./action";

const Caphras: Command = {
  name: "Caphras",
  triggers: ["c", "caphras"],
  description: "Calculate caphras needed to reach a certain level",
  example: ".c armor 1 5 | .caphras mainhand 1 10 | .caphras offhand 1 10",
  action,
};

export default Caphras;
