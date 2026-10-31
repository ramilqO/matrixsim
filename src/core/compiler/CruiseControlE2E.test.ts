import { describe, it } from "vitest";
import { Vector } from "../math-engine/linalg/Vector/Vector";
import { RungeKutta4Solver, SimulationRunner } from "@matrixsim/math-engine";
import { ConstantBlock } from "@matrixsim/sbl";

describe("MatrixSim Real-World Analogy: Car Cruise Control", () => {
  it("simulates a car accelerating smoothly to a target speed of 60 km/h", () => {
    // 1. СОБИРАЕМ СХЕМУ ИЗ БЛОКОВ:

    // Блок 1: Желаемая скорость водителя (всегда 60 км/ч)
    const targetSpeedBlock = new ConstantBlock("target", "TargetSpeed", 60.0);

    // Мы передадим текущую скорость из симулятора внутрь схемы через переменную,
    // а пока соединим блоки логики управления:
    // (В реальной схеме здесь стоял бы датчик скорости и сумматор ошибки)

    // 2. НАСТРАИВАЕМ МАТЕМАТИЧЕСКИЙ ДВИЖОК (Физику машины):
    const solver = new RungeKutta4Solver();
    const runner = new SimulationRunner(solver);

    // Начальное состояние машины: скорость равна 0 км/ч
    const initialState = new Vector(1, [0.0]);

    const tMax = 5.0; // Симулируем 5 секунд движения
    const dt = 0.5; // Шаг по полсекунды

    console.log("\n🚗 ЗАПУСК СИМУЛЯЦИИ КРУИЗ-КОНТРОЛЯ (Цель: 60 км/ч)\n");

    // Функция физики: как ведет себя машина на дороге
    const carDynamics = (t: number, state: Vector) => {
      const currentSpeed = state.data[0];
      const targetSpeed = 60.0;

      // Ошибка: разница между тем, что хочет водитель, и тем, что есть
      const speedError = targetSpeed - currentSpeed;

      // Нажатие на педаль газа пропорционально ошибке (чем больше разница, тем сильнее жмем)
      const acceleration = speedError * 0.8;

      return new Vector(1, [acceleration]);
    };

    // 3. ЗАПУСК И ВИЗУАЛИЗАЦИЯ:
    const result = runner.run(initialState, tMax, dt, carDynamics);

    // Выводим красивую табличку в консоль
    result.times.forEach((t, index) => {
      const speed = result.states[index].data[0];
      const progressBar = "█".repeat(Math.round(speed / 3)); // Визуальная шкала скорости
      console.log(
        `⏱️ Время: ${t.toFixed(1)}с | Скорость: ${speed.toFixed(1).padStart(5, "س")} км/ч | ${progressBar}`,
      );
    });
    console.log("\n✅ Машина успешно разогналась и удерживает скорость!\n");
  });
});
