import { defineStore } from "pinia";
import { computed, ref } from "vue";

interface IMeteor {
  id: number;
  isBig: boolean;
  x: number;
  y: number;
  hasParachute: boolean;
  clickCount: number;
  speed: number;
  opacity: number;
}

interface IFirstAidKit {
  x: number;
  y: number;
}

interface IGameResult {
  id: number;
  playerName: string;
  score: number;
}

export const useGameStore = defineStore("gameStore", () => {
  // Игровые состояния
  const playerName = ref<string>("");
  const score = ref<number>(0);
  const lives = ref<number>(5);
  const meteors = ref<IMeteor[]>([]);
  const firstAidKit = ref<IFirstAidKit | null>(null);
  const nextFirstAidKitTime = ref<number | null>(null);
  let meteorId = 0;
  const gameStartTime = ref(Date.now());
  const speedGame = ref(1);

  // Результаты игры
  const gameResults = ref<IGameResult[]>([]);

  // Вычисляемые свойства
  const isGameOver = computed(() => lives.value <= 0);

  // Методы для работы с метеорами
  const spawnMeteor = () => {
    if (meteors.value.length < 10 && Math.random() < 0.02) {
      const isBig = Math.random() > 0.7;
      const meteorSize = isBig ? 80 : 50;
      const x = Math.random() * (window.innerWidth - meteorSize);
      meteors.value.push({
        id: meteorId++,
        isBig,
        x,
        y: -meteorSize,
        hasParachute: false,
        clickCount: 0,
        speed: (1 + Math.random() * 1) * speedGame.value,
        opacity: 1,
      });
    }
  };

  const moveMeteors = () => {
    meteors.value = meteors.value.filter((meteor) => {
      meteor.y += meteor.speed;
      if (meteor.hasParachute) {
        meteor.opacity -= 0.002;
        if (meteor.opacity <= 0) {
          return false;
        }
      } else if (meteor.y > window.innerHeight) {
        lives.value -= meteor.isBig ? 2 : 1;
        return false;
      }
      return true;
    });
  };

  const increaseCountForParachute = (id: number) => {
    const meteor = meteors.value.find((m) => m.id === id);
    if (meteor && !meteor.hasParachute) {
      meteor.clickCount++;
      if (
        (meteor.isBig && meteor.clickCount >= 2) ||
        (!meteor.isBig && meteor.clickCount >= 1)
      ) {
        meteor.hasParachute = true;
        meteor.speed /= 2;
        score.value += meteor.isBig ? 15 : 5;
      }
    }
  };

  // Методы для работы с аптечкой
  const updateFirstAidKitTimer = () => {
    if (lives.value < 3 && !firstAidKit.value && !nextFirstAidKitTime.value) {
      nextFirstAidKitTime.value =
        Date.now() + 15000 + Math.floor(Math.random() * 30001); // дата + 15 сек + рандомно до 30 сек включительно = от 15 до 45 сек включительно
    }
  };

  const spawnFirstAidKit = () => {
    if (
      lives.value < 3 &&
      !firstAidKit.value &&
      nextFirstAidKitTime.value &&
      Date.now() >= nextFirstAidKitTime.value
    ) {
      firstAidKit.value = {
        x: Math.random() * (window.innerWidth - 50), // 50px - высота аптечки
        y: -50,
      };
      nextFirstAidKitTime.value = null;
    }
  };

  const moveFirstAidKit = () => {
    if (firstAidKit.value) {
      firstAidKit.value.y += 1; // допустим 1 стандартная скорость аптечки
      if (firstAidKit.value.y > window.innerHeight) {
        firstAidKit.value = null;
        updateFirstAidKitTimer();
      }
    }
  };

  const boostHealthPoints = () => {
    if (firstAidKit.value) {
      const countHealthPoints = Math.floor(Math.random() * 3) + 1;
      lives.value = Math.min(lives.value + countHealthPoints, 5);
      firstAidKit.value = null;
      updateFirstAidKitTimer();
    }
  };

  // Методы для управления игрой
  const setPlayerName = (name: string) => {
    playerName.value = name;
  };

  const gameStep = () => {
    if (lives.value > 0) {
      spawnMeteor();
      moveMeteors();
      updateFirstAidKitTimer();
      spawnFirstAidKit();
      moveFirstAidKit();
      updateSpeedGame();
    }
  };

  const updateSpeedGame = () => {
    const elapsedMinutes = Math.floor(
      (Date.now() - gameStartTime.value) / 60000
    );
    speedGame.value = 1 + elapsedMinutes * 0.15; // каждую минуту скорость увеличивается на 15%
  };

  const resetGame = () => {
    score.value = 0;
    lives.value = 5;
    meteors.value = [];
    meteorId = 0;
    gameStartTime.value = Date.now();
    speedGame.value = 1;
    loadResults();
  };

  // Методы для работы с результатами
  const loadResults = () => {
    const savedResults = localStorage.getItem("gameResults");
    if (savedResults) {
      gameResults.value = JSON.parse(savedResults);
    }
  };

  const saveResult = () => {
    const newResult: IGameResult = {
      id: Date.now(),
      playerName: playerName.value,
      score: score.value,
    };
    gameResults.value.push(newResult);
    gameResults.value.sort((a, b) => b.score - a.score);
    gameResults.value = gameResults.value.slice(0, 10);
    localStorage.setItem("gameResults", JSON.stringify(gameResults.value));
  };

  return {
    playerName,
    score,
    lives,
    meteors,
    firstAidKit,
    gameResults,
    isGameOver,
    setPlayerName,
    resetGame,
    spawnMeteor,
    gameStep,
    increaseCountForParachute,
    spawnFirstAidKit,
    moveFirstAidKit,
    boostHealthPoints,
    updateSpeedGame,
    loadResults,
    saveResult,
  };
});
