function updateUserRoute({ body, params }) {
  updateUserController({ data, params })
}

function updateUserController({ data, params }) {
  const { id, name, email, password } = data;

  userRepository.update({
    data: {
      id,
      name,
      email,
      password,
    },
    params
  })
}

const userRepository = {
  update: ({ data, params }) => {},
}