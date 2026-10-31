import { describe, expect, it } from "vitest";
import { Vector } from "../math-engine/linalg/Vector/Vector";
import { ConstantBlock } from "../standard-block-libraries/sources/Constant-Block/Constant-Block";
import { GainBlock } from "../standard-block-libraries/math";
import { GraphCompiler } from "./GraphCompiler/GraphCompiler";
import { RungeKutta4Solver } from "../math-engine/solvers/Runge-Kutta4/Runge-Kutta4";
import { SimulationRunner } from "../math-engine/solvers/Simulation-Runner/Simulation-Runner";

describe("MatrixSim End-to-End Integration", () => {
  it("runs a time-stepped simulation combining graph blocks and RK4 solver", () => {
    // 1. Создаем элементы схемы:
    // Источник выдает базовый сигнал (например, задающее воздействие = 2.0)
    const setpointSource = new ConstantBlock("src1", "Setpoint", 2.0);

    // Блок усиления умножает его на коэффициент (например, K = 3.0)
    const amplifier = new GainBlock("amp1", "ControllerGain", 3.0);

    // 2. Компилируем граф связей (Setpoint -> Amplifier)
    const stepFunction = GraphCompiler.compile({
      blocks: [amplifier, setpointSource],
      connections: [
        {
          fromBlockId: "src1",
          fromPort: 0,
          toBlockId: "amp1",
          toPort: 0,
        },
      ],
    });

    // 3. Настраиваем математический решатель и раннер симуляции
    const solver = new RungeKutta4Solver();
    const runner = new SimulationRunner(solver);

    // Начальное состояние системы (например, вектор состояния из 1 переменной)
    const initialState = new Vector(1, [0.0]);

    // Функция правой части ОДУ:
    // На каждом шаге симуляции мы можем вызывать нашу скомпилированную схему блоков!
    const tMax = 1.0;
    const dt = 0.2;

    const derivativeFn = (t: number, _state: Vector) => {
      // Прогоняем блоки через компилятор для текущего момента времени t
      const blockOutputs = stepFunction(t);

      // Берем выход усилителя (должно быть 2.0 * 3.0 = 6.0)
      const amplifiedSignal = blockOutputs.get("amp1")![0];

      // Пусть скорость изменения состояния стремится к сигналу схемы: dx/dt = amplifiedSignal - x
      // (простейшая апериодическая модель)
      const currentX = _state.data[0];
      const dx = amplifiedSignal - currentX;

      return new Vector(1, [dx]);
    };

    // 4. Запускаем симуляцию!
    const result = runner.run(initialState, tMax, dt, derivativeFn);

    // Проверяем результаты
    expect(result.times.length).toBeGreaterThan(0);
    expect(result.states.length).toBe(result.times.length);

    const finalState = result.states[result.states.length - 1];
    expect(finalState.data[0]).toBeCloseTo(3.79, 1);

    // Выведем лог в консоль для наглядности (можно запустить через pnpm test)
    console.log("\n--- MATRIX-SIM LIVE SIMULATION LOG ---");
    result.times.forEach((t, index) => {
      const stateVal = result.states[index].data[0].toFixed(4);
      console.log(`t = ${t.toFixed(1)}s | State x = ${stateVal}`);
    });
    console.log("---------------------------------------\n");
  });
});
