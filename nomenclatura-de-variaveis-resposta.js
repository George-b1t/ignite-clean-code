// Nomenclatura de variáveis

const userCategories = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

async function getUserCategory(req, res) {
  const username = String(req.query.username)

  if (!username) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const userInfoGithubResponse = await fetch(`https://api.github.com/users/${username}`);

  if (userInfoGithubResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${username}" not found`
    })
  }

  const userInfoGithub = await userInfoGithubResponse.json()

  const userCategoriesDescendingByFolloers = userCategories.sort((a, b) =>  b.followers - a.followers); 

  const userCategory = userCategoriesDescendingByFolloers.find(i => userInfoGithub.followers > i.followers)

  const userWithCategory = {
    username,
    userCategory: userCategory.title
  }

  return userWithCategory
}

(async () => {
  const userWithCategory = await getUserCategory({ query: {
    username: 'George-b1t'
  }}, {})
  
  console.log(userWithCategory)
})()
