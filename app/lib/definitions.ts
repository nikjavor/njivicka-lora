export type Player = {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar_url: string;
  date_joined: string;
};

export type Game = {
  id: number;
  title: string;
  created_by: number;
  creation_date: number;
  player1: number;
  player2: number;
  player3: number;
  player4: number;
  finished: boolean;
};

export type Score = {
  id: number;
  player_id: number;
  round_id: number;
  value: number;
}
