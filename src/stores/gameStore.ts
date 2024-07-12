import { defineStore } from "pinia";
import { ref } from "vue";

interface Meteor {
  id: number;
  isBig: boolean;
  x: number;
  y: number;
  hasParachute: boolean;
  clickCount: number;
  speed: number;
  opacity: number;
}

export const useGameStore = defineStore("gameStore", () => {
  const playerName = ref<string>("");
  const score = ref<number>(0);
  const lives = ref<number>(5);
  const meteors = ref<Meteor[]>([]);
  let meteorId = 0;

  const setPlayerName = (name: string) => {
    playerName.value = name;
  };

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
        speed: 1 + Math.random() * 1,
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

  const gameStep = () => {
    if (lives.value > 0) {
      spawnMeteor();
      moveMeteors();
    }
  };

  const resetGame = () => {
    score.value = 0;
    lives.value = 5;
    meteors.value = [];
    meteorId = 0;
  };

  return {
    playerName,
    score,
    lives,
    meteors,
    setPlayerName,
    resetGame,
    spawnMeteor,
    gameStep,
    increaseCountForParachute,
  };
});
