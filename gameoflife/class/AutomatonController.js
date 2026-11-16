export default class AutomatonController {

  constructor({automatonRenderer, mainLoop}) {
    this.automatonRenderer = automatonRenderer;
    this.mainLoop = mainLoop;
    this.speed = Math.round(1000 / this.mainLoop.getSimulationTimestep());

    const cellSizeInput = document.querySelector("#cell-size");
    cellSizeInput.value = this.automatonRenderer.cellSize;
    cellSizeInput.addEventListener("input", () => this.automatonRenderer.setCellSize(cellSizeInput.valueAsNumber));

    const speedInput = document.querySelector("#speed");
    speedInput.value = this.speed;
    speedInput.addEventListener("input", () => this.setSpeed(speedInput.valueAsNumber));

    const aliveProbabilityInput = document.querySelector("#alive-probability");
    aliveProbabilityInput.value = this.automatonRenderer.automaton.aliveProbability;
    aliveProbabilityInput.addEventListener("input", () => this.automatonRenderer.setAliveProbability(aliveProbabilityInput.valueAsNumber));

    const rulesInput = document.querySelector("#rules");
    rulesInput.value = this.automatonRenderer.automaton.getRules();
    rulesInput.addEventListener("change", () => this.setRules(rulesInput));

    const resetButton = document.querySelector("#reset");
    resetButton.addEventListener("click", () => this.automatonRenderer.reset());
  }

  setSpeed(speed) {
    this.speed = speed;
    this.mainLoop.resetFrameDelta();
    if (speed === 0) {
      this.mainLoop.stop();
      return;
    }
    this.mainLoop.setSimulationTimestep(1000 / speed);
    this.mainLoop.start();
  }

  setRules(rulesInput) {
    this.automatonRenderer.automaton.setRules(rulesInput.value);
  }

}
