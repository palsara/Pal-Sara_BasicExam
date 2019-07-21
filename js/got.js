const Characters = {
  characters: [],
  init() {
    this.findAll();
  },
  setUserData(userData) {
    this.characters = JSON.parse(userData);
    this.showAll();
  },
  findAll() {
    const request = new XMLHttpRequest();
    request.onload = () => { // onload eseményfigyelő
      this.setUserData(request.responseText);
    };
    request.open('GET', '/json/got.json');
    request.send();
  },
  showAll() {
    this.sortByName();
    const divBig = document.querySelector('.div--big');
    divBig.innerHTML = '';
    for (let i = 0; i < this.characters.length; i += 1) {
      if (!this.characters[i].dead) {
        divBig.innerHTML += `<div class="div--characters" >
        <div><img class="img--portrait" src="${this.characters[i].portrait}" alt="${this.characters[i].name}" data-name="${this.characters[i].name}" onclick="Characters.showMore();"></div>
        <div class="div--characters" data-name="${this.characters[i].name}" onclick="Characters.showMore();">${this.characters[i].name}</div>
        </div>`;
      }
    }
  },
  sortByName() {
    this.characters.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // nagybetűk és kisbetűk elhagyása
      const nameB = b.name.toUpperCase(); // nagybetűk és kisbetűk elhagyása
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  },
  showMore() {
    const divSearch = document.querySelector('.div--search');
    divSearch.innerHTML = '<div class="div--got">GAME OF THRONES</div>';
    const divName = event.target;
    const divDataName = divName.getAttribute('data-name');
    for (let i = 0; i < this.characters.length; i += 1) {
      if (divDataName === this.characters[i].name) {
        divSearch.innerHTML += this.moreInfo(this.characters[i]);
      }
    }
    divSearch.innerHTML += '<input type="text" name="search" id="search" placeholder="Search a character" onchange="Characters.search();"></input>';
  },
  moreInfo(character) {
    const moreInfo = `<div>
                        <img class="img--picture" src="${character.picture}" alt="${character.name}">
                        <br>
                        <h3>${character.name}
                      ${this.hasHouse(character)}</h3>
                        <div>${character.bio}</div>
                      </div>`;
    return moreInfo;
  },
  hasHouse(character) {
    if (character.hasOwnProperty('house')) {
      return `<img class="img--house" src="/assets/houses/${character.house}.png">`;
    }
    return '';
  },
  search() {
    const divSearch = document.querySelector('.div--search');
    const searchInp = document.querySelector('#search');
    divSearch.innerHTML = `<div class="div--got">GAME OF THRONES</div>
    <input type="text" name="search" id="search" placeholder="Search a character" onchange="Characters.search();">`;
    for (let i = 0; i < this.characters.length; i += 1) {
      if (searchInp.value.toLowerCase() === this.characters[i].name.toLowerCase()) {
        divSearch.innerHTML += this.moreInfo(this.characters[i]);
        return;
      }
    }
    divSearch.innerHTML += '<h3>Character not found</h3>';
  },
};
Characters.init();
