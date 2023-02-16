async function registerUserOnDatabase(userData) {
  const { email, name, avatar } = userData;

  if (!avatar) return { error: 'avatar is required' }

  if(!name) return { error: 'name is required' }

  const userMailAlreadyExists = getUserByEmail(email)

  if (userMailAlreadyExists) {
    return { error: 'email already used' }
  }

  // Essa função realiza a conversão das imagens para JPG a fim de evitar erros de incompatibilidade.
  // Mais informações na issue https://github.com/rocketseat-education/example-repository/issues/1
  const avatar2 = convertImageToJPG(avatar)

  const user = await createUser({ email, name, avatar: avatar2 })

  return { user }
}