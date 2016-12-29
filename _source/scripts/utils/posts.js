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
