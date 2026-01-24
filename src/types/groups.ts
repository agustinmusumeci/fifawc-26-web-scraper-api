type TeamGroup = {
  position: number;
  team: string;
  shortTeamName: string;
  flag: string;
  player: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: Array<string>;
};

export type Group = {
  group: string;
  teams: Array<TeamGroup>;
};
