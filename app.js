const projects = [
  {
    "name": "Nifty Wozniak",
    "kind": "Kind X",
    "year": "2020",
    "image": "images/0.png",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eleifend purus nec commodo semper. Phasellus eget lacinia ex. Mauris ultrices dui eros, in auctor nunc venenatis tristique. Phasellus gravida diam nunc, vel lacinia magna ultricies sit amet. Sed lacus dui, egestas lacinia efficitur in, cursus vel libero. Suspendisse luctus, tellus sed consectetur dignissim, libero est tincidunt orci, id tristique tortor dui sit amet leo. Vivamus sed ante vel lorem congue euismod. Cras commodo et lacus eget finibus. Proin gravida ultricies malesuada. Nulla aliquam vehicula leo non pulvinar."
  },
  {
    "name": "Flamboyant Herschel",
    "kind": "Kind Y",
    "year": "2020",
    "image": "images/1.png",
    "description": "Quisque imperdiet purus id nunc congue varius. Suspendisse non arcu sapien. Cras vitae mauris vel quam volutpat eleifend. Vivamus ac est sed erat cursus interdum a vel nisi. Morbi sit amet pellentesque lectus. Fusce laoreet sapien vel bibendum tempor. Vivamus aliquam hendrerit metus, a vehicula lacus dignissim vel."
  },
  {
    "name": "Sleepy Visvesvaraya",
    "kind": "Kind Z",
    "year": "2020",
    "image": "images/2.png",
    "description": "Proin maximus lacus eros, et tincidunt ante scelerisque et. Cras a ornare magna. Nullam quis gravida turpis. Curabitur et tellus eu quam vulputate vulputate. Nunc scelerisque efficitur consequat. Pellentesque ac urna diam. Aenean vel mattis mauris, ut eleifend neque. In sit amet orci eu urna vulputate suscipit nec non ante. Curabitur malesuada tincidunt magna, ut pharetra lacus. Donec non aliquam dui. Sed a nibh sagittis, sollicitudin leo et, ullamcorper mi. Nunc volutpat metus nisi, in imperdiet massa volutpat non."
  },
  {
    "name": "Elastic McNulty",
    "kind": "Kind X",
    "year": "2021",
    "image": "images/3.png",
    "description": "Nullam mauris sem, venenatis ac dui eget, dignissim consequat justo. Pellentesque nec nisl efficitur, ornare ipsum at, pharetra mi. Aliquam a faucibus tortor, in condimentum quam. Suspendisse sit amet lorem egestas sapien pellentesque varius lobortis ac risus. Mauris ut efficitur nunc, in dignissim turpis. Fusce eget lorem in lacus dignissim aliquam at et nibh. In in ante suscipit leo tristique semper. Curabitur at augue congue, iaculis ante sed, tristique ex. Cras sollicitudin nibh a mauris venenatis facilisis. Duis a malesuada purus. In hac habitasse platea dictumst. Suspendisse bibendum mauris non quam accumsan, a finibus metus auctor. Quisque libero purus, imperdiet vel pretium a, sollicitudin at ligula."
  },
  {
    "name": "Awesome Villani",
    "kind": "Kind Y",
    "year": "2021",
    "image": "images/4.png",
    "description": "Morbi et elementum tellus, eu vehicula nulla. Duis congue, arcu et finibus condimentum, nisi ex facilisis lorem, eu tempus arcu dolor nec enim. Pellentesque dignissim sodales nibh mattis commodo. Curabitur blandit feugiat blandit. Aenean lobortis nulla felis, vitae blandit turpis facilisis vel. Vivamus ipsum augue, posuere id dapibus ut, iaculis at nulla. Mauris at aliquet ex. Aliquam vel sollicitudin velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eu lacinia dolor. Nam in venenatis nibh."
  },
  {
    "name": "Peaceful Black",
    "kind": "Kind Z",
    "year": "2021",
    "image": "images/5.png",
    "description": "Ut varius risus lectus, vel venenatis nulla facilisis non. Curabitur mollis libero quis lectus commodo tempus. Vestibulum elementum velit non mauris dictum, eget commodo eros iaculis. Phasellus ac purus quis nulla faucibus tincidunt quis eu sem. Etiam sed eros et velit posuere pharetra. Etiam non blandit urna. Cras risus mi, condimentum eu odio eu, elementum molestie ligula. Suspendisse magna neque, mollis vel fringilla eu, vehicula nec elit. Cras nec mauris vulputate, sodales tellus quis, venenatis purus. Curabitur nec metus velit."
  }
];

const render = () => {
  var container = document.getElementById("root");

  const categories = {
    kind: new Set(projects.map(p => p.kind)),
    year: new Set(projects.map(p => p.year)),
  };
  const filters = { kind: new Set(), year: new Set() };

  const buttonID = (key, value) => [key, value].join(" ").replaceAll(" ", "-");
  const projectID = i => `project-${i}`;

  function addButton(key, value, row) {
    const button = document.createElement("button");

    button.id = buttonID(key, value);
    button.classList.add( "btn", "btn-secondary");
    button.innerHTML = value;
    button.onclick = () => toggleButton(key, value);

    row.appendChild(button);
  }

  function addAllButton() {
    const row = document.createElement("div");
    row.id = "button-row-all";
    row.setAttribute("class", "button-row");
    const button = document.createElement("button");

    button.id = "all-values";
    button.classList.add("btn", "btn-primary");
    button.innerHTML = "All";
    button.onclick = () => toggleAllButton(true);

    row.appendChild(button);

    return row;
  }

  function toggleButton(key, value) {
    const id = buttonID(key, value);
    const button = document.getElementById(id);
    const turnOff = filters[key].has(value);

    turnOff ? filters[key].delete(value) : filters[key].add(value);
    button.classList.remove( turnOff ? "btn-primary" : "btn-secondary" );
    button.classList.add( turnOff ? "btn-secondary" : "btn-primary" );

    toggleAllButton(false);
    showOrHideProjects();
  }

  function toggleAllButton(clicked) {
    const button = document.getElementById("all-values");

    if (clicked) {
      filters.kind.forEach( value => toggleButton("kind", value) );
      filters.year.forEach( value => toggleButton("year", value) );
      filters.kind.clear();
      filters.year.clear();
    }

    button.classList.add( clicked ? "btn-primary" : "btn-secondary" );
    button.classList.remove( clicked ? "btn-secondary" : "btn-primary" );

    showOrHideProjects();
  }

  function showOrHideProjects() {
    projCards = document.getElementById("project-cards")
    //projCards.innerHTML = '';

    projects.forEach( (project, i) => {
      const visible = (
        (filters.kind.size === 0 || filters.kind.has(project.kind)) &&
        (filters.year.size === 0 || filters.year.has(project.year))
      );
      const card = document.getElementById(projectID(i));

      if (visible) {
        card.classList.remove("d-none")
      } else {
        card.classList.add("d-none")
      }
    })
  }

  function renderButtons() {
    // container.appendChild( addAllButton() );
    buttonRows = document.getElementById("buttons").appendChild( addAllButton());

    Object.entries(categories).map( ([category, values]) => {
      const row = document.createElement("div");
      row.id = `button-row-${category}`;
      row.setAttribute("class", "button-row");
      values.forEach( value => addButton(category, value, row) );

      buttonRows.appendChild(row);
    });
  }

  function makeCardImage(project) {

    const image = document.createElement("img");
    image.setAttribute("class", "card-img-top ")
    image.src = project.image;
    image.alt = project.name;
    return image;
  }

  function makeCardBody(project) {
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    function addCardElement(kind, content) {
      const element = document.createElement(kind);
      element.innerHTML = content;
      cardBody.appendChild(element);
    }

    addCardElement("h3", project.name);
    addCardElement("h4", project.kind);
    addCardElement("h4", project.year);
    const p = document.createElement("p")
    p.setAttribute("class", "card-text")
    p.innerHTML = project.description
    cardBody.appendChild(p)
    return cardBody;
  }

  function addCard(project, i) {
    var project = projects[i];
    var col = document.createElement("col")
    var card = document.createElement("div");
    col.setAttribute("id", projectID(i));
    col.classList.add("fade", "show")

    card.setAttribute("class", "card", "shadow-sm");

    card.appendChild( makeCardImage(project) );
    card.appendChild( makeCardBody(project) );
    cardPlace = document.getElementById("project-cards")
    col.appendChild(card)
    cardPlace.appendChild(col);
  }

  function renderProjects() {
    projects.forEach( (project, i) => addCard(project, i) );
    showOrHideProjects();
  }

  renderButtons();
  renderProjects();
};
