export function filterByCategory(posts, category) {
  return posts.filter((post) => {
    return post.categories.indexOf(category) !== -1
  })
}

export function filterBySearch(posts, query) {
  return posts.filter((post) => {
    return post.title.toLowerCase().indexOf(query) !== -1
  })
}

export function idByPath(posts, path) {
  const url = `/${path}/`
  const match = posts.filter((post) => {
    return post.url === url
  })

  if (match.length) {
    return match[0].id
  } else {
    return path
  }
}
