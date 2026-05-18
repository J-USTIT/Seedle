import { getPhilippinesMidnightDateString } from "./dateUtils.js"

const getKey = (gameRoundId) => `seedle_session_${gameRoundId}`;

export const startSession = (gameRoundId, userId) => {
    const existing = loadSession(gameRoundId);
    if (existing) return;

    localStorage.setItem(getKey(gameRoundId), JSON.stringify({
        startTime: Date.now(),
        date: getPhilippinesMidnightDateString(),
        userId,
        guesses: []
    }))
}

export const loadSession = (gameRoundId) => {
    const stored = localStorage.getItem(getKey(gameRoundId));
    return stored ? JSON.parse(stored) : null;
}

export const saveGuess = (gameRoundId, newGuess) => {
    const session = loadSession(gameRoundId);
    if(!session) return;

    session.guesses.push(newGuess);
    localStorage.setItem(getKey(gameRoundId), JSON.stringify(session));
}

export const saveResult = (gameRoundId, result) => {
    const session = loadSession(gameRoundId);
    if(!session) return;

    session.result = result;
    localStorage.setItem(getKey(gameRoundId), JSON.stringify(session));
}

export const clearSession = (gameRoundId) => {
  localStorage.removeItem(getKey(gameRoundId));
};

export const getElapsedSeconds = (gameRoundId) => {
  const session = loadSession(gameRoundId);
  if (!session) return 0;
  return Math.floor((Date.now() - session.startTime) / 1000);
};

export const isSessionFromToday = (gameRoundId) => {
  const session = loadSession(gameRoundId);
  if (!session) return false;

  console.log(session.date)
  console.log(getPhilippinesMidnightDateString())
  return session.date === getPhilippinesMidnightDateString(); 
};