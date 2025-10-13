const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const myModal = document.getElementById("myModal");

openModalBtn.addEventListener("click", () => {
  //   myModal.showModal();

  myModal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  //   myModal.close(); // Closes the modal
  myModal.style.display = "none"; // Opens the modal in a modal state
});

function showNotes() {
  // Create notes cards
  const noteSection = document.querySelector("#noteSection");
  const notesText = document.querySelector("#notesText").value;

  const notesCard = document.createElement("div");
  notesCard.className = "notesCard";

  const editBtn = document.createElement("button");
  editBtn.className = "editBtn";
  editBtn.innerHTML = '<i class="ri-pencil-line"></i>';
  notesCard.appendChild(editBtn);
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "deleteBtn";
  deleteBtn.innerHTML = '<i class="ri-delete-bin-fill"></i>';
  notesCard.appendChild(deleteBtn);
  if (!notesText) {
    alert("Please type something...☺️");
    return;
  }

  notesCard.innerHTML += `<h3>Notes</h3> <textarea rows="5" cols="20" autofocus>${notesText}</textarea>`;

  noteSection.appendChild(notesCard);

  let deletesBtn = document.querySelector(".deleteBtn");
  deletesBtn.addEventListener("click", () => {
    notesCard.remove();
  });
}
const createBtn = document.querySelector("#createBtn");
createBtn.addEventListener("click", function () {
  showNotes();
  myModal.style.display = "none";
});


