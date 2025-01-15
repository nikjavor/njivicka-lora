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

export async function getGameTitle(gameID:number) {
  try {
    const response = await sql`SELECT title FROM games WHERE id = ${gameID}`
    return response[0].title
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function getGameInfo(gameID:number) {
  try {
    const response = await sql`SELECT * FROM games WHERE id = ${gameID}`
    return response[0]
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
