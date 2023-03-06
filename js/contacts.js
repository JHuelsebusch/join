let contacts = [];

function open_popup() {
  document.getElementById("cont_popup_id").classList.remove(`d-none`);
  loadOverlay();
}

function closePopup() {
  document.getElementById("cont_popup_id").classList.add(`d-none`);
}

function loadOverlay() {
  let element = document.getElementById("cont_popup_id");
  element.classList.remove("d-none");
  element.innerHTML = "";
  element.innerHTML = addContactHTML();
}

// Template

function addContactHTML() {
  return /*html*/ `
    <div id="contAddBg" class= "contAddBg" onclick="closePopup()">
        <div class="animation">
            <div class="contAddContainer">
                <div class="contAddContainerLeft">
                    <img src="/img/contacts_Logo.svg" alt="">
                    <h3>Add contact</h3>
                    <p>Task are better with a team</p>
                    <div class="contAddUnderline"></div>
                </div>

                <div class="contAddRight">
                    <div class= "contAddRightClose"> <img src="/img/contact_close.svg" alt=""></div>
                    <div class="contAddEdit">
                        <div class="contAddEditIcon"> <img src="/img/contacts_icon1.svg" alt=""></div>
                        <form onsubmit="addContact()">
                            <input required id = "inputName" type= "text" placeholder="Name Surname"></input>
                            <input required id = "inputMail" type= "email" placeholder="EMail"></input>
                            <input required id = "inputPhone" type= "tel" placeholder="Phone"></input>

                            <button>Cancel</button>
                            <button>Create contact</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
}

function addContact() {}
