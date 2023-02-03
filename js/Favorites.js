// class that will contain the data logic
// how data will be structured
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
  }
}

// class that will create the visualization and the events of the html
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root)
  }

  update() {
    this.removeAllTr()
  }

  removeAllTr() {
    const tbody = this.root.querySelector('table tbody')

    tbody.querySelectorAll('tr')
      .forEach(() => {
        tr.remove()
      })
  }
}