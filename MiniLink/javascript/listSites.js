async function fetchSites(page) {
  const response = await fetch("../websites.json");
  // replace this with the database
  await console.log("fetch successful");
  const json = await response.json();
  await console.log("conversion successful");
  console.log(json);

  switch (page) {
    case "all":
      listSites(json);
      break;
    case "index":
      listLatest(json[json.length - 1]);
      break;
    case "search":
      listSearch(json);
      break;
    default:
      console.log("Not a valid page.");
      break;
  }
}

function listSearch(webList) {}

function listSites(webList) {
  const websiteContainer = document.getElementById("websiteList");

  for (let e in webList) {
    // section box
    let list = document.createElement("ul");
    list.className = "sectionBox";
    list.id = `website${e}`;
    console.log(`Created box`);
    websiteContainer.append(list);

    // website name
    let websiteName = document.createElement("li");
    websiteName.innerHTML = `${webList[e].title}`;
    console.log(`Created title ${webList[e].title}`);
    list.append(websiteName);

    // created date
    let websiteAdded = document.createElement("li");
    websiteAdded.innerHTML = `<img src=./img/calendar.png alt="Date Added">${webList[e].created}`;
    console.log(`Created date ${webList[e].created}`);
    list.append(websiteAdded);

    let linkText = splitLink(webList[e].weblink);
    // splits link to make a name (eg. https://www.test.com/main -> test.com/main)

    // link
    let websiteLink = document.createElement("li");
    websiteLink.innerHTML = `<img src=./img/link.png alt="Link"><a href="${webList[e].weblink}" target="_blank">${linkText}</a>`;
    console.log(`Created link ${webList[e].weblink}`);
    list.append(websiteLink);

    // delete button
    let websiteDelete = document.createElement("li");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", () => deleteSite(webList[e]));
    websiteDelete.append(deleteBtn);
    list.append(websiteDelete);
  }

  // if there's no entries
  if (websiteContainer.innerHTML == "") {
    let errorText = document.createElement("p");
    errorText.className = "sectionTitle";
    errorText.innerHTML = "No entries yet!";
    websiteContainer.append(errorText);
  }
}

function listLatest(website) {
  const entry = document.getElementById("latestSite");
  entry.href = website.weblink;
  entry.innerHTML = splitLink(website.weblink);
}

function deleteSite(website) {
  alert(
    `The website ${website.weblink} would get deleted from the database now. `
  );

  // deleteOne with mongodb
}

function splitLink(link) {
  return link.split(".")[1] + "." + link.split(".")[2];
}
