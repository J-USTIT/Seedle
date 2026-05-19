import { getPhilippinesMidnightDateString } from "./dateUtils.js"

const getKey = (gameRoundId, userId) => `seedle_session_${userId || 'guest'}_${gameRoundId}`;

export const startSession = (gameRoundId, userId) => {
    if (!userId) return;
    const existing = loadSession(gameRoundId, userId);
    if (existing) return;

    localStorage.setItem(getKey(gameRoundId, userId), JSON.stringify({
        startTime: Date.now(),
        date: getPhilippinesMidnightDateString(),
        guesses: []
    }))
}

export const loadSession = (gameRoundId, userId) => {
    const stored = localStorage.getItem(getKey(gameRoundId, userId));
    return stored ? JSON.parse(stored) : null;
}

export const saveGuess = (gameRoundId, userId, newGuess) => {
    const session = loadSession(gameRoundId, userId);
    if(!session) return;

    session.guesses.push(newGuess);
    localStorage.setItem(getKey(gameRoundId, userId), JSON.stringify(session));
}

export const saveResult = (gameRoundId, userId, result) => {
    const session = loadSession(gameRoundId, userId);
    if(!session) return;

    session.result = result;
    localStorage.setItem(getKey(gameRoundId, userId), JSON.stringify(session));
}

export const clearSession = (gameRoundId, userId) => {
  localStorage.removeItem(getKey(gameRoundId, userId));
};

export const getElapsedSeconds = (gameRoundId, userId) => {
  const session = loadSession(gameRoundId, userId);
  if (!session) return 0;
  return Math.floor((Date.now() - session.startTime) / 1000);
};

export const isSessionFromToday = (gameRoundId, userId) => {
  const session = loadSession(gameRoundId, userId);
  if (!session) return false;

  return session.date === getPhilippinesMidnightDateString(); 
};