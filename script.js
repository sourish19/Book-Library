const bookContainer = document.querySelector(".book-container");
const pagination = document.querySelectorAll(".pagination");
const gridListViewBttn = document.querySelector(".grid-list-view");

//FETCH DATA FROM API
const fetchData = async (element) => {
  if (!element) {
    element = 1;
  }
  const url = `https://api.freeapi.app/api/v1/public/books?page=${element}&limit=10`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    if (!json.success) {
      throw new Error("Cannot load api");
    }
    return json;
  } catch (error) {
    console.log(error);
  }
};

// ADD BOOKS DYNAMICALLY
const addBooks = (myData) => {
  bookContainer.innerHTML = "";
  myData.data.data.map((element) => {
    const bookTitle = element.volumeInfo.title;
    const bookAuthors = element.volumeInfo.authors;
    const bookPublisher = element.volumeInfo.publisher;
    const bookPublishedDate = element.volumeInfo.publishedDate;
    const bookThumbnail = element.volumeInfo.imageLinks.thumbnail;
    const infoLink = element.volumeInfo.infoLink;

    const book = document.createElement("div");
    book.classList.add("book");
    const content = `<img
            src=${bookThumbnail}
            alt=${bookTitle}
          />
          <div class="book-info">
            <div class="book-title">
              Title: <span>${bookTitle}</span>
            </div>
            <div class="author">Author: <span>${bookAuthors}</span></div>
            <div class="publisher">
              Publisher: <span>${bookPublisher} </span>
            </div>
            <div class="published-date">
              Published Date: <span>${bookPublishedDate} </span>
            </div>
            <a href="${infoLink}" target="_blank">
            <button class="bttn">More Info</button></a>
          </div>`;
    book.innerHTML = content;
    bookContainer.appendChild(book);
  });
};

// CALL API & ADD BOOKS WHEN PAGE LOADS
document.addEventListener("DOMContentLoaded", async () => {
  const myData = await fetchData();
  addBooks(myData);
});

// CLICK ON THE PAGE NUMBER TO GET DIFFERENT BOOKS
pagination.forEach((element) => {
  element.addEventListener("click", async () => {
    const myData = await fetchData(element.innerHTML);
    addBooks(myData);
  });
});

// TOGGLE BETWEEN GRID & LIST VIEW
gridListViewBttn.addEventListener("click", () => {
  //CHANGE TO GRID VIEW
  if (gridListViewBttn.innerHTML === "List View") {
    gridListViewBttn.innerHTML = "Grid View";
    bookContainer.style.display = "grid";
    bookContainer.style.gridTemplateColumns = "repeat(5, minmax(250px, 1fr))";
    const book = document.querySelectorAll(".book");
    book.forEach((element) => {
      book.style.flexDirection = "column";
    });
  }
  // CHANGE TO LIST VIEW
  else {
    gridListViewBttn.innerHTML = "Grid View";
    gridListViewBttn.innerHTML = "List View";
    bookContainer.style.display = "flex";
    bookContainer.style.flexDirection = "column";
    const book = document.querySelectorAll(".book");
    book.forEach((element) => {
      book.style.flexDirection = "row";
    });
  }
});
