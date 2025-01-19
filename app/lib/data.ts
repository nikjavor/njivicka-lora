'use server'

import { Score } from "./definitions";

import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);

export async function getPlayers(
  p1: number,
  p2: number,
  p3: number,
  p4: number
) {
  try {
    const response =
      await sql`SELECT username FROM players WHERE id = ${p1} OR id = ${p2} OR id = ${p3} OR id = ${p4}`;
    return response;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getPlayerIdsFromGame(gameID: number) {
  try {
    const response =
      await sql`SELECT player1, player2, player3, player4 FROM games WHERE id = ${gameID}`;
    return Object.values(response[0]);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getPlayerUsername(playerID: number) {
  try {
    const response =
      await sql`SELECT username FROM players WHERE id = ${playerID}`;
    return response;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getPlayerUsernamesFromGame(gameID: number) {
  try {
    const usernames = [];
    const response =
      await sql`SELECT player1, player2, player3, player4 FROM games WHERE id = ${gameID}`;
    for (const playerID of Object.values(response[0])) {
      const usernameObject = await getPlayerUsername(Number(playerID));
      usernames.push(usernameObject[0].username);
    }
    return usernames; // Array with 4 username strings
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getGameTitle(gameID: number) {
  try {
    const response = await sql`SELECT title FROM games WHERE id = ${gameID}`;
    return response[0].title;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getGameInfo(gameID: number) {
  try {
    const response = await sql`SELECT * FROM games WHERE id = ${gameID}`;
    return response[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function isValidGameID(gameID: number) {
  try {
    const response = await sql`SELECT COUNT(*) FROM games WHERE id = ${gameID}`;
    return response[0].count == 1 ? true : false;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getRounds(gameID: number) {
  try {
    const response = await sql`SELECT * FROM rounds WHERE game_id = ${gameID}`;
    return response;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getRoundScores(roundID: number): Promise<Score[]> {
  try {
    const response =
      await sql`SELECT * FROM scores WHERE round_id = ${roundID}`;
    return response.map((row) => ({
      id: row.id,
      player_id: row.player_id,
      round_id: row.round_id,
      value: row.value,
    })) as Score[];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getLastRoundOfGame(gameID: number) {
  try {
    const response =
      await sql`SELECT id, round_number FROM rounds WHERE game_id = ${gameID} ORDER BY round_number DESC LIMIT 1`;
    if (response.length === 0) { return {round_number: 0}}
    return response[0]
  } catch (error) {

    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}


export async function addRound(gameID: number) {
  console.log('go')
  try {
    console.log('trying')
    const lastRound = await getLastRoundOfGame(gameID)
    if (lastRound.round_number != 28) {
      await sql`INSERT INTO rounds (game_id, round_number) VALUES (${gameID}, ${lastRound.round_number + 1})`
      console.log('round added')

      const newRoundId = await sql`SELECT MAX(id) FROM rounds WHERE game_id = ${gameID} AND round_number = ${lastRound.round_number + 1}`
      const players = await getPlayerIdsFromGame(gameID)
      players.map(async (player) => {
        await sql`INSERT INTO scores (round_id, player_id, value) VALUES (${newRoundId[0].max}, ${player}, NULL)`
      })
    } else {
      console.log("All rounds already added! (28)")
    }
  } catch (error) {
    console.log("addRound")
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

