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

export async function getPlayer(id: number) {
  try {
    const response = await sql`SELECT username FROM players WHERE id = ${id}`;
    return response;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
