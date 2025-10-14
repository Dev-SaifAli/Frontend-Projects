function popupDisplay() {
  const myModal = document.createElement("div");
  myModal.className = "myModal";
  myModal.innerHTML = `<h2>New Note</h2>
            <textarea id="notesText" rows="5" cols="20" placeholder="Type Something..." required></textarea>
            <button id="createBtn" onclick="displayNotes();">Create</button>
            <button id="closeModalBtn" onclick="closeModal();" >Close</button>`;
  document.body.appendChild(myModal);
}
