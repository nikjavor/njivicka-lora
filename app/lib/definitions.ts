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
};

export type UnusedMinigames = {
  id: number;
  minigame: string;
  short: string;
};

export type Round = {
  id: number;
  game_id: number;
  game_name: string;
  round_number: number;
  round_master: number;
  p1: number | null;
  p2: number | null;
  p3: number | null;
  p4: number | null;
  selected_minigame: string | null;
};

export type simplifiedUserList = {
  id: string;
  username: string | null;
}[];