import teamsRepository from "../repositories/teamsRepository.js";

class MatchesControllers {
  async getMatches(params) {
    const matches = await teamsRepository.getTeams();

    return matches;
  }
}

export default new MatchesControllers();
