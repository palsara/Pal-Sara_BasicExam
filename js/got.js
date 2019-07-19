const Characters = {
  characters: [],
  init() {
    this.findAll();
  },
  setUserData(userData) {
    this.characters = JSON.parse(userData); // átalakítja a JSON filet. Innentől van feltöltve adatokkal a data
    this.showAll();
  },
  findAll() {
    const request = new XMLHttpRequest();
    request.onload = () => { // onload eseményfigyelő
      this.setUserData(request.responseText);
    };
    request.onerror = () => { // ha nem tölt be, alertet dob-NEM HASZNÁLUNK ALERTET
      alert('Hiba a fájl betöltésekor');
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
        <div><img src="${this.characters[i].portrait}" alt="${this.characters[i].name}" data-name="${this.characters[i].name}" onclick="Characters.showMore();"></div>
        <div data-name="${this.characters[i].name}" onclick="Characters.showMore();">${this.characters[i].name}</div>
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
    divSearch.innerHTML = 'GAME OF THRONES';
    const divName = event.target;
    const divDataName = divName.getAttribute('data-name');
    for (let i = 0; i < this.characters.length; i += 1) {
      if (divDataName === this.characters[i].name) {
        divSearch.innerHTML += this.moreInfo(this.characters[i]);
      }
    }
  },
  moreInfo(character) {
    const moreInfo = `<div>
                        <img src="${character.picture}" alt="${character.name}">
                        <br>
                        <h3>${character.name}</h3>
                      ${this.hasHouse(character)}
                        <div>${character.bio}</div>
                      </div>`;
    return moreInfo;
  },
  hasHouse(character) {
    if (character.hasOwnProperty('house')) {
      return `<img src="/assets/houses/${character.house}.png">`;
    }
    return '';
  },

};
Characters.init();
