import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore('gameStore', () => {
    const playerName = ref<string>('')
    const score = ref<number>(0)
    const lives = ref<number>(5)

    const setPlayerName = (name: string) => {
        playerName.value = name
    }

    const resetGame = () => {
        score.value = 0
        lives.value = 5
    }

    return {
        playerName,
        score,
        lives,
        setPlayerName,
        resetGame
    }
})