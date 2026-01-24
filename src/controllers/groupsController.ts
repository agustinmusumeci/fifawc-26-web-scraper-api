import groupsRepository from "../repositories/groupsRepository.js";
import type { Group } from "../types/groups.js";

class GroupsController {
  async getGroups(groupsNames: Array<string>): Promise<Array<Group>> {
    const groups: Array<Group> = await groupsRepository.getGroups(groupsNames);

    return groups;
  }
}

export default new GroupsController();
