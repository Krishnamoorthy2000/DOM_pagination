const PerPage = 10;
let CurPage = 1;
let details = []; // declare an empty array for the fetched data

async function fetchData() {
  const response = await fetch('pagination.json');
  const data = await response.json();
  return data;
}

// use .then() to wait for the Promise to resolve and set the details variable
fetchData().then(data => {
  details = data;
  displayData(details, CurPage, PerPage);
  createPaginationButtons(details, PerPage);
});

function displayData(data, currentPage, itemsPerPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const tableBody = document.querySelector('tbody');
  // clear existing rows before adding new ones
  tableBody.innerHTML = '';

  for (let i in currentData) {
    const tableRow = document.createElement('tr');
    const idData = document.createElement('td');
    idData.textContent = currentData[i].id;
    const nameData = document.createElement('td');
    nameData.textContent = currentData[i].name;
    const emailData = document.createElement('td');
    emailData.textContent = currentData[i].email;

    tableRow.appendChild(idData);
    tableRow.appendChild(nameData);
    tableRow.appendChild(emailData);

    tableBody.appendChild(tableRow);
  }
}

function createPaginationButtons(data, itemsPerPage) {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const pageNav = document.querySelector('.pagination');

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('li');
    button.classList.add('page-item');
    button.innerHTML = `<a class="page-link" for="${i}">${i}</a>`;
    button.addEventListener('click', () => {
      CurPage = i;
      displayData(details, CurPage, PerPage);
      highlightButton(CurPage);
    });

    pageNav.insertBefore(button, pageNav.children[pageNav.children.length -1]);
  }

  highlightButton(CurPage);

  const prevButton = document.querySelector('.Previous');
  prevButton.addEventListener('click', () => {
    if (CurPage > 1) {
      CurPage--;
      displayData(details, CurPage, PerPage);
      highlightButton(CurPage);
    }
  });

  const nextButton = document.querySelector('.Next');
  nextButton.addEventListener('click', () => {
    if (CurPage < totalPages) {
      CurPage++;
      displayData(details, CurPage, PerPage);
      highlightButton(CurPage);
    }
  });
}

function highlightButton(pageNum) {
  const buttons = document.querySelectorAll('.page-link');
  buttons.forEach((button) => {
    button.classList.remove('active');
    if (button.getAttribute('for') == pageNum) {
      button.classList.add('active');
    }
  });
}
