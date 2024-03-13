const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

// Mine

// Book
// Search
function searchBooks() {
  var input = document.getElementById("searchInput");
  var filter = input.value.toUpperCase();
  var tbody = document.querySelector(".table-data table tbody");
  var rows = tbody.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    var shouldShow = false;
    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];
      if (cell) {
        var textValue = cell.textContent || cell.innerText;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
          shouldShow = true;
          break;
        }
      }
    }
    rows[i].style.display = shouldShow ? "" : "none";
  }
}

function toggleAddBookForm() {
  document.getElementById("addBookFormContainer").style.display = "block";
  var bgblack = document.getElementById("bgblack");
  bgblack.style.display = "block";
}

function closeAddBookForm() {
  document.getElementById("addBookFormContainer").style.display = "none";
  var bgblack = document.getElementById("bgblack");
  bgblack.style.display = "none";
}

function addBook() {
  console.log("in");
  var bookid = document.getElementById("id").value;
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var rating = document.getElementById("rating").value;
  var description = document.getElementById("description").value;
  var status = document.getElementById("isissued").value;
  var issuedfor = document.getElementById("issued_for").value;
  var tag = document.getElementById("tag").value;
  var timesissued = document.getElementById("issued_times").value;
  var date = document.getElementById("date").value;

  if (
    bookid.trim() == "" ||
    title.trim() == "" ||
    author.trim() == "" ||
    rating.trim() == "" ||
    description.trim() == "" ||
    status.trim() == "" ||
    issuedfor.trim() == "" ||
    tag.trim() == "" ||
    timesissued.trim() == "" ||
    date.trim() == ""
  ) {
    alert("Enter valid details");
    return;
  }
  var newRow = document.createElement("tr");
  var selectElement = document.getElementById("isissued");
  var selectedOption = selectElement.options[selectElement.selectedIndex];
  var selectedValue = selectedOption.value;
  newRow.innerHTML = `
		<td>${bookid}</td>
		<td>${title}</td>
		<td>${author}</td>
		<td>${rating}</td>
		<td>${description}</td>
		<td>${status}</td>
		<td>${issuedfor}</td>
    <td>${tag}</td>
		<td>${timesissued}</td>
		<td>${date}</td>
    <td>
		<button id="returnIssueButton"  onclick="openReturnIssueForm()">Return Book</button>
		</td>
	`;
  var bgblack = document.getElementById("bgblack");
  bgblack.style.display = "none";
  var tbody = document.querySelector(".table-data table tbody");
  tbody.appendChild(newRow);
  document.getElementById("addBookForm").reset();
  document.getElementById("addBookFormContainer").style.display = "none";
}
// Add Book

// Return
function openReturnForm() {
  document.getElementById("return-Book").style.display = "block";
}

function closeReturnForm() {
  document.getElementById("return-Book").style.display = "none";
  var bgblack = document.getElementById("bgblack");
  bgblack.style.display = "none";
}

function openReturnIssueForm() {
  var bgblack = document.getElementById("bgblack");
  bgblack.style.display = "block";
  var returnIssue = document.getElementById("return-Book");
  returnIssue.style.display =
    returnIssue.style.display === "none" ? "block" : "none";
  var bookNumber = document.querySelector(
    ".table-data table tbody tr td:nth-child(2)"
  ).textContent;
  document.getElementById("bookNumberIssue").value = bookNumber;
}

//Book

//History show button

function navigateToPage(page) {
  window.location.href = page;
}

//Mine
