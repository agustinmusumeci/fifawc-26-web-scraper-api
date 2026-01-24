type MatchTeam = {
  team: string;
};

export type Match = {
  date: string;
  teams: Array<MatchTeam>;
  time: string;
  stage: string;
  stadium: string;
  link: string;
};
