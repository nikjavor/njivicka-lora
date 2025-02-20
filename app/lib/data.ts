"use server";

import { UnusedMinigames } from "@/app/lib/definitions";

import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);

export async function getPlayerIdsFromGame(gameID: number) {
  try {
    const response =
      await sql`SELECT player1, player2, player3, player4 FROM games WHERE id = ${gameID}`;
    return Object.values(response[0]);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player ids.");
  }
}

export async function getPlayerUsername(playerID: number) {
  try {
    const response =
      await sql`SELECT username FROM players WHERE id = ${playerID}`;
    return response;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player username.");
  }
}

export async function getPlayerUsernamesFromGame(gameID: number) {
  try {
    const usernames = [];
    const response = await getPlayerIdsFromGame(gameID);
    for (const playerID of response) {
      const usernameObject = await getPlayerUsername(Number(playerID));
      usernames.push(usernameObject[0].username);
    }
    return usernames; // Array with 4 username strings
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player usernames.");
  }
}

export async function getGameInfo(gameID: number) {
  try {
    const response = await sql`SELECT * FROM games WHERE id = ${gameID}`;
    return response[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch game info.");
  }
}

export async function isValidGameID(gameID: number) {
  try {
    const response = await sql`SELECT COUNT(*) FROM games WHERE id = ${gameID}`;
    return response[0].count == 1 ? true : false;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to check game id for validity.");
  }
}

export async function getValidRounds(
  gameID: number
): Promise<{ id: number }[]> {
  try {
    const response = await sql`
    SELECT DISTINCT r.id 
    FROM rounds r 
    INNER JOIN minigame_selections ms 
    ON r.id = ms.round_id 
    WHERE r.game_id = ${gameID}`;

    return response.map((row) => ({ id: Number(row.id) })); // Ensure id is a number
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch valid rounds.");
  }
}

export async function getRoundInfo(roundID: number) {
  try {
    const response = await sql`
  SELECT 
    r.round_number AS round,
    (SELECT value FROM scores WHERE round_id = r.id AND player_id = g.player1) AS p1,
    (SELECT value FROM scores WHERE round_id = r.id AND player_id = g.player2) AS p2,
    (SELECT value FROM scores WHERE round_id = r.id AND player_id = g.player3) AS p3,
    (SELECT value FROM scores WHERE round_id = r.id AND player_id = g.player4) AS p4,
    m.short AS mgame,
    CASE 
        WHEN r.round_master = g.player1 THEN 0
        WHEN r.round_master = g.player2 THEN 1
        WHEN r.round_master = g.player3 THEN 2
        WHEN r.round_master = g.player4 THEN 3
    END AS master
  FROM 
    rounds r
  JOIN 
    games g ON r.game_id = g.id
  LEFT JOIN 
    minigame_selections ms ON r.id = ms.round_id
  LEFT JOIN 
    minigames m ON ms.minigame_id = m.id
  WHERE 
    r.id = ${roundID}`;
    return response[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch round info.");
  }
}

export async function getUnusedMinigames(gameID: number, playerID: string): Promise<UnusedMinigames[]> {
  try {
    const response = await sql`
      SELECT m.id, m.minigame, m.short
      FROM minigames m
      WHERE m.id NOT IN (
        SELECT ms.minigame_id
        FROM minigame_selections ms
        JOIN rounds r ON ms.round_id = r.id
        WHERE r.game_id = ${gameID} AND r.round_master = ${playerID}
      )`;
      return response.map(row => ({
        id: row.id,
        minigame: row.minigame,
        short: row.short
      }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch unused minigames.");
  }
}

export async function getRoundInfos(gameID: number) {
  try {
    const response = await sql`
      SELECT 
        r.id AS id,
        g.id AS game_id, 
        g.title AS game_name, 
        r.round_number, 
        r.round_master AS round_master,
        MAX(CASE WHEN s.player_id = g.player1 THEN s.value END) AS p1,
        MAX(CASE WHEN s.player_id = g.player2 THEN s.value END) AS p2,
        MAX(CASE WHEN s.player_id = g.player3 THEN s.value END) AS p3,
        MAX(CASE WHEN s.player_id = g.player4 THEN s.value END) AS p4,
        m.minigame AS minigame
      FROM 
        games g
      JOIN 
        rounds r ON g.id = r.game_id
      LEFT JOIN 
        scores s ON r.id = s.round_id
      LEFT JOIN 
        minigame_selections ms ON r.id = ms.round_id
      LEFT JOIN 
        minigames m ON ms.minigame_id = m.id
      WHERE game_id = ${gameID}
      GROUP BY 
        g.id, g.title, r.id, r.round_number, m.minigame, r.round_master
      ORDER BY 
        g.id, r.round_number`;
    return response;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch rounds.");
  }
}

export async function addRoundScoresAndMinigame(
  gameID: number,
  roundID: number,
  playerScores: { [playerId: number]: number | null },
  selectedMinigame: string
) {
  try {
    // Get player IDs from the game
    const playerIds = await getPlayerIdsFromGame(gameID);

    // Update scores for each player
    for (const [index, playerId] of playerIds.entries()) {
      const value = playerScores[index + 1]; // Player indices start at 1
      await sql`
        UPDATE scores
        SET value = ${value}
        WHERE round_id = ${roundID} AND player_id = ${playerId}
      `;
    }

    // Get the minigame ID based on the short name
    const minigameResponse = await sql`
      SELECT id FROM minigames WHERE short = ${selectedMinigame}
    `;
    const minigameID = minigameResponse[0]?.id;

    if (!minigameID) {
      throw new Error("Invalid minigame selected");
    }

    // Insert the selected minigame into the minigame_selections table
    await sql`
      INSERT INTO minigame_selections (round_id, minigame_id)
      VALUES (${roundID}, ${minigameID})
    `;

    console.log("Scores and minigame added successfully");
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to add scores and minigame.");
  }
}

export async function getPlayersGames(playerID: string) {
  try {
    const response = await sql`
      SELECT g.id, g.title, g.creation_date
      FROM games g
      WHERE g.created_by = ${playerID}
      ORDER BY g.creation_date DESC`;
    return response;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player games.");
  }
}

export async function getPlayersGameIds(playerID: string | null) {
  try {
    if (typeof playerID !== "string") {
      throw new Error("Invalid player ID");
    }
    const response = await sql`
      SELECT g.id
      FROM games g
      WHERE g.created_by = ${playerID}
      ORDER BY g.creation_date DESC`;
    return response.map((row) => row.id);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch player game IDs.");
  }
}

export async function getUserIdFromUsername(username: string) {
  try {
    console.log("Username:", username);
    const response = await sql`SELECT user_id FROM players WHERE username = ${username}`;
    return response[0].user_id;
  }
  catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user ID from username.");
  }
}

export async function createGame(creatorID: string, gameTitle: string, players: string[]) {
  const playerIDs = [];
  for (const player of players) {
    const playerID = await getUserIdFromUsername(player);
    if (!playerID) {
      throw new Error(`Failed to find player ID for username: ${player}`);
    }
    playerIDs.push(playerID);
  }

  async function createGameRow(creatorID: string, gameTitle: string, playerIDs: string[]){
    try {
      const response = await sql`
        INSERT INTO games (title, created_by, player1, player2, player3, player4)
        VALUES (${gameTitle}, ${creatorID}, ${playerIDs[0]}, ${playerIDs[1]}, ${playerIDs[2]}, ${playerIDs[3]})
        RETURNING id`;
      return response[0].id;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to create game row.");
    }
  }

  async function createScoresForRound(roundID: number, playerIDs: string[]) {
    try {
      for (const playerID of playerIDs) {
        await sql`
          INSERT INTO scores (round_id, player_id)
          VALUES (${roundID}, ${playerID})
        `;
      }
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to create scores for round.");
    }
  }

  async function createRound(gameID: number, roundNumber: number, roundMaster: string) {
    try {
      const response = await sql`
        INSERT INTO rounds (game_id, round_number, round_master)
        VALUES (${gameID}, ${roundNumber}, ${roundMaster})
        RETURNING id
      `;
      return response[0].id;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to create round.");
    }
  }

  try {
    const gameID = await createGameRow(creatorID, gameTitle, playerIDs);

    for (let i = 1; i <= 28; i++) {
      const roundMaster = playerIDs[(i - 1) % 4];
      const roundID = await createRound(gameID, i, roundMaster);
      await createScoresForRound(roundID, playerIDs);
    }
    return gameID;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create game.");
  }
}

export async function getUserUsername(userID: string) {
  try {
    const response = await sql`SELECT username FROM players WHERE user_id = ${userID}`;
    return response[0].username;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user username.");
  }
}

export async function doesUserExist(userID: string): Promise<boolean> {
  try {
    const response = await sql`SELECT COUNT(*) FROM players WHERE user_id = ${userID}`;
    console.log("Response:", response);
    return response[0] == 1 ? true : false;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to check if Supabase user exists.");
  }
}

export async function doesUsernameExist(userID: string): Promise<boolean> {
  try {
    const response = await sql`SELECT COUNT(*) FROM players WHERE user_id = ${userID}`;
    console.log("Response:", response);
    return response[0] == 1 ? true : false;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to check if Supabase user exists.");
  }
}