import teamsRepository from "../repositories/teamsRepository.js";
import type { Team } from "../types/teams.js";

class TeamsController {
  async getTeams(teamsNames: Array<string>): Promise<Array<Team>> {
    const teams: Array<Team> = await teamsRepository.getTeams(teamsNames);

    return teams;
  }
}

export default new TeamsController();
