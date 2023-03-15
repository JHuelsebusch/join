let contacts = [];

async function initContacts() {
  await downloadFromServer();
  contacts = JSON.parse(backend.getItem("contacts")) || [];
  tasks = JSON.parse(backend.getItem("tasks")) || [];

  loadContactList();
}

// Open Popup
function open_popup() {
  document.getElementById("cont_popup_id").innerHTML = "";
  loadOverlay();
}

// Close Popup

function closePopup() {
  document.getElementById("animationId").classList.add("animationSlideOut");
  document.getElementById("animationId").classList.remove("animationSlideIn");
  setTimeout(timeOut, 1050);
}

function timeOut() {
  document.getElementById("cont_popup_id").classList.add(`d-none`);
}

function stopClosing(event) {
  event.stopPropagation();
}

/**
 * This function is used to load the overlay
 */

function loadOverlay() {
  let element = document.getElementById("cont_popup_id");
  element.classList.remove(`d-none`);
  element.innerHTML = "";
  element.innerHTML = addContactHTML();
}

/**
 * This function is used to generate a HTML-Template
 */

function addContactHTML() {
  return /*html*/ `
    <div id="contAddBg" class= "contAddBg" onclick="closePopup()">
        <div id="animationId" onclick= "stopClosing(event)" class="animationSlideIn">
            <div class="contAddContainer">
                <div class="contAddContainerLeft">
                    <img src="/img/contacts_Logo.svg" alt="">
                    <h3>Add contact</h3>
                    <p>Task are better with a team</p>
                    <div class="contAddUnderline"></div>
                </div>

                <div class="contAddRight">
                    <div onclick="closePopup()" class= "contAddRightClose"> <img src="/img/contact_close.svg" alt=""></div>
                    <div class="contAddEdit">
                        <div class="contAddEditIcon"> <img src="/img/Vector.svg" alt=""></div>

                        <form  onsubmit="addContact(); return false" class="contAddForm">
                            <div><input required id = "inputName" type ="text" placeholder="Name Surname" class="contInputEdit"><img class="contFormImg" src="./img/contact_icon_min.svg"></div>
                            <div><input required id = "inputMail" type= "email" placeholder="EMail"class="contInputEdit"><img class="contFormImg" src="./img/contact_input_mail_mini.svg"></div>
                            <div><input required id = "inputPhone" type= "tel" placeholder="Phone"class="contInputEdit"><img class="contFormImg" src="./img/contact_inputIcon_phone.svg"></div>
                            <div style= display:flex;>
                              <button onclick="closePopup()" onmouseover="changeColor()" class="contCancelBtn" type="reset">Cancel <img  id="clear-x" src="./img/contacts_closeIcon_mini.svg" alt=""></button>
                              <button class="contCreateBtn">Create contact <img src="./img/contacts_submitIcon_mini.svg"></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
}

/**
 * This function is used to add a new contact
 */

async function addContact() {
  let name = greatLetter(document.getElementById("inputName").value);
  let firstname = name.split(" ")[0];
  let surname = greatLetterSurname(
    name.slice(name.indexOf(" ") + 1, name.length)
  );
  let mail = document.getElementById("inputMail").value;
  let phone = document.getElementById("inputPhone").value;
  let seachId = contacts.length;
  let id = checkId(seachId).toString();

  let data = {
    id: id,
    name: firstname,
    surname: surname,
    email: mail,
    phone: phone,
  };

  // push
  contacts.push(data);
  saveContact();
  loadContactList();
  console.log(contacts);
  // delay
  document.getElementById(`inputName`).value = ``;
  document.getElementById(`inputMail`).value = ``;
  document.getElementById(`inputPhone`).value = ``;
  closePopup();
}
/**
 *
 * @param {string} name - This is
 * @returns
 */
// Fkt first letter of name great
function greatLetter(name) {
  let surname = name.slice(name.indexOf(" ") + 1, name.length);
  let greatName =
    name.charAt(0).toUpperCase() +
    name.slice(1, name.indexOf(" ")) +
    " " +
    surname.charAt(0).toUpperCase() +
    surname.slice(1, surname.length);
  return greatName;
}

// FKT first letter of surname great
function greatLetterSurname(surname) {
  let greateSurname =
    surname.charAt(0).toUpperCase() + surname.slice(1, surname.length);
  return greateSurname;
}

// Load Contacts list !!! HTML TEMPLATE  AUSLAGERN!!!

function loadContactList() {
  let contactList = document.getElementById(`contactsList`);
  contactList.innerHTML = ``;

  for (let index = 0; index < contacts.length; index++) {
    const element = contacts[index];
    let contact = contacts[index];
    let initials = fktName(contact) + fktSurname(contact);
    let firstIni = initials.slice(1, initials.length);
    contactList.innerHTML += /*html*/ `

        <div class= "contactListContainer colmn" id="contactListContainer">
            <div>
                <h4>${firstIni}</h4>
                <div class="sepLine">
            </div>
        </div>
        <div class="contactContainer" onclick="loadContactDetail('${index}','${initials}')">
            <div class="contactInitial profileColor-${
              element[`id`]
            }">${initials}</div>
            <div class="contactNameMail">
                <div class="contName">${element["name"]}&nbsp${
      element["surname"]
    }</div>
                <div class="contMail">${element["email"]}</div>
            </div>
        </div>`;
  }
}

/**
 * This function is used to generate the first letters
 */

function fktName(contact) {
  iniName = contact.name.toLowerCase().split(" ");
  iniName = iniName.map((word) => word.charAt(0).toUpperCase());
  iniName = iniName.join("");
  return iniName;
}
function fktSurname(contact) {
  iniSurname = contact.surname.toLowerCase().split(" ");
  iniSurname = iniSurname.map((word) => word.charAt(0).toUpperCase());
  iniSurname = iniSurname.join("");
  return iniSurname;
}
/**
 *
 * @param {string} contacts -
 */
// Fkt load detail
function loadContactDetail(index, initials) {
  let contactDetail = document.getElementById("contDisplay");
  contactDetail.innerHTML = "";
  contactDetail.innerHTML += contactDetailHTML(index, initials);
}

/**
 * This function is used to load the HTML-Template
 */

function contactDetailHTML(index, initials) {
  let contact = contacts[index];

  return /*html*/ `

    <div class= "contDetailBg animationSlideIn" id="contDetail">

      <div class="contDetailTop">
        <div class="contDetailLetter profileColor-${
          contact[`id`]
        }"><p>${initials}</p></div>
        <div class="contName"><h2>${contact.name}&nbsp${
    contact.surname
  }</h2><br><a href ="add_task.html">+ Add Task</a></div>
      </div>

    <div class="contDetailMid"> 
      <div class="contDetailMidLeft"><p>Contact&nbspInformation</p></div>
      <div class="contDetailMidRight" onclick="openEditDisplay('${initials}','${index}')">
        <img src="/img/contacts_icon_pen.svg"><p>Edit&nbspContact</p></div>
    </div>

    <div class= "contDetailBottom">
        
        <div ><p><b>Email &nbsp</b></p><a class="contMail" href="mailto:${
          contact[`email`]
        }">${contact[`email`]}</a>
        </p></div>
        <div><p><b>Phone</b></p><a class="contPhone" href= "tel:+49${
          contact[`phone`]
        }">${contact[`phone`]}</a>
        </div>
        <div class="contBasket" onclick= "deleteContact('${
          contact[`email`]
        }')"><img src="/img/contacts_icon_basket.png"></div>
      </div>
  `;
}

/**
 * This function is used to save the new contact in the backend
 */
async function saveContact() {
  await backend.setItem("contacts", JSON.stringify(contacts));
}

async function deleteContact(email) {
  let display = document.getElementById(`contDisplay`);
  let detail = document.getElementById(`contDetail`);
  let index = getContactIndexForEmail(email);
  await deleteContInArray(index);
  display.innerHTML = "";
  detail.innerHTML = "";
  initContacts();
}

function getContactIndexForEmail(email) {
  let contactIndex = -1;
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i]["email"].toLowerCase() == email.toLowerCase()) {
      contactIndex = i;
    }
  }
  return contactIndex;
}
/**
 * This function is used to delete an object in the array
 *
 *
 */
async function deleteContInArray(index) {
  if (index !== parseInt(index, 10)) {
  }

  if (index >= contacts.length || index < 0) {
  } //Zu hoch oder zu gering
  else if (index == 0 && contacts.length == 1) {
    deleteAllUsers();
  } //Löscht gesamten Array
  else {
    contacts.splice(index, 1);
    await backend.setItem("contacts", JSON.stringify(contacts));
  }
}
/**
 * This function checks the assigned ID in the array
 *
 *
 */
function checkId(searchId) {
  if (contacts.find((elem) => elem.id == searchId)) {
    searchId++;
    newSearchId = checkId(searchId);
    return newSearchId;
  } else {
    return searchId;
  }
}
/**
 * This function is used to open the diplay for editing
 *
 */

function openEditDisplay(initials, index) {
  let element = document.getElementById("cont_popup_id");
  element.classList.remove("d-none");
  element.innerHTML = "";
  element.innerHTML = editContactHTML(initials, index);
}

function editContactHTML(initials, index) {
  let contact = contacts[index];
  return /*html*/ `
    <div id="contAddBg" class= "contAddBg" onclick="closePopup()">
        <div id="animationId" onclick= "stopClosing(event)" class="animationSlideIn">
        <div class="contAddContainer">
                <div class="contAddContainerLeft">
                    <img src="/img/contacts_Logo.svg" alt="">
                    <h3>Edit contact</h3>
                    <div class="contAddUnderline"></div>
                </div>
                <div class="contAddRight">
                    <div onclick="closePopup()" class= "contAddRightClose"> <img src="/img/contact_close.svg" alt="close"></div>
                    <div class="contAddEdit">
                        <div class="contAddEditIcon profileColor-${
                          contact[`id`]
                        }"><p>${initials}</p></div>

                        <form  onsubmit="contactEdit('${index}'); return false" class="contAddForm">
                            <div><input required id = "editName" value ="${
                              contact[`name`]
                            } ${
    contact[`surname`]
  }" type= "text" placeholder="${
    contact[`name`]
  }" class="contInputEdit"><img class="contFormImg" src="./img/contact_icon_min.svg"></div>
                            <div><input required id = "editMail" value = "${
                              contact[`email`]
                            }" type= "email" placeholder="${
    contact[`email`]
  }"class="contInputEdit"><img class="contFormImg" src="./img/contact_input_mail_mini.svg"></div>
                            <div><input required id = "editPhone" value = ${
                              contact[`phone`]
                            }  type= "tel" placeholder="${
    contact[`phone`]
  }"class="contInputEdit"><img class="contFormImg" src="./img/contact_inputIcon_phone.svg"></div>
                            <div style= display:flex;>
                              <button class="contEditBtn">Save <img src="./img/contacts_submitIcon_mini.svg"></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
}

async function contactEdit(index) {
  let name = greatLetter(document.getElementById("editName").value);
  let firstname = name.split(" ")[0];
  let surname = greatLetterSurname(
    name.slice(name.indexOf(" ") + 1, name.length)
  );
  let mail = document.getElementById("editMail").value;
  let phone = document.getElementById("editPhone").value;
    let id = contacts[index][`id`];

  let changedData = {
    id: id,
    name: firstname,
    surname: surname,
    email: mail,
    phone: phone,
  };

  document.getElementById("cont_popup_id").innerHTML = "";
  document.getElementById("contDisplay").innerHTML = "";
  contacts.splice(index,1, changedData)
  
  saveContact();
  await loadContactList();
  await initContacts();
}
