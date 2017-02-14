class Repo {
  query (v) {
    if (v === 1) { return Promise.resolve(['a', 'b', 'c']) }
    return Promise.resolve(['d', 'e', 'f'])
  }

  getMain (options) {
    return Promise.all([this.query(1), options])
  }

  getDetails (data, options) {
    // console.log(data, options)
    return Promise.all([data, this.query(2)])
  }

  get (options) {
    return this.getMain(options).then(result => this.getDetails(result))
  }
}

var repo = new Repo()

// repo.query().then((data) => console.log(data))

repo.get({relations: ['g', 'h']}).then((data) => console.log(data))
