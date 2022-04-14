const axios = require("axios");

axios.interceptors.response.use(res => {
  return res.data;
})

// 获取仓库列表
async function getRepoList() {
  return await axios.get("https://api.github.com/orgs/vben-cli/repos");
}

// 获取tag列表
async function getTagList(repo) {
  return axios.get(`https://api.github.com/repos/vben-cli/${repo}/tags`);
}

module.exports = {
  getRepoList,
  getTagList
}