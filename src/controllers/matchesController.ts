import matchesRepository from "../repositories/matchesRepository.js";
import type { Match } from "../types/matches.js";

class MatchesControllers {
  async getMatches(matchesDates: Array<string>): Promise<Array<Match>> {
    const matches: Array<Match> = await matchesRepository.getMatches(matchesDates);

    return matches;
  }
}

export default new MatchesControllers();
