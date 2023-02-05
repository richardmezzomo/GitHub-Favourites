export class GitHubUser {
  static search(username) {
    const endpoint = `https://api.github.com/users/${username}`

    return fetch(endpoint)
    .then(data => data.json())
    .then(({login, name, public_repos, followers}) => ({
      login,
      name,
      public_repos,
      followers
    }))
  }
}

// class that will contain the data logic
// how data will be structured
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.load()
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  delete(user) {
    // Higher-order functions (map, filter, find, reduce)
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

    this.entries = filteredEntries
    this.update()
  }
}

// class that will create the visualization and the events of the html
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)

    this.tbody = this.root.querySelector('table tbody')

    this.update()
  }

  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`
      row.querySelector('.user img').alt = `Image of ${user.name}`
      row.querySelector('.user p').textContent = user.name
      row.querySelector('.user span').textContent = user.login
      row.querySelector('.repositories').textContent = user.public_repos
      row.querySelector('.followers').textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Are you sure you want to delete this row?')

        if(isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  createRow() {
    const tr = document.createElement('tr')

    tr.innerHTML = `
  <tr>
    <td class="user">
      <img src="https://github.com/richardbmezzomo.png" alt="">
      <a href="https://github.com/richardbmezzomo">
        <p>Richard B Mezzomo</p>
        <span>richardbmezzomo</span>
      </a>
    </td>
    <td class="repositories">66</td>
    <td class="followers">666</td>
    <td>
      <button class="remove">&times;</button>
    </td>
  </tr>
  `
  return tr
  }

  removeAllTr() {
    this.tbody.querySelectorAll('tr')
      .forEach(() => {
        tr.remove()
      })
  }
}