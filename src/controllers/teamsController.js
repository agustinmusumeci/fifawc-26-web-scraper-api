import teamsRepository from "../repositories/teamsRepository.js";

class TeamsController {
  async getTeams() {
    const teams = await teamsRepository.getTeams();

    return teams;
  }
}

export default new TeamsController();
