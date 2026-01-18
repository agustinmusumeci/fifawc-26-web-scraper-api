import groupsRepository from "../repositories/groupsRepository.js";

class GroupsController {
  async getGroups() {
    const groups = await groupsRepository.getGroups();

    return groups;
  }
}

export default new GroupsController();
