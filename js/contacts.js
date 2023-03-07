let JSONcontacts = [];

// Open Popup

function open_popup() {
  
  
  document.getElementById("cont_popup_id").innerHTML= "";
  loadOverlay();
}

// Close Popup

function closePopup() {
  document.getElementById("animationId").classList.add("animationSlideOut");
  document.getElementById("animationId").classList.remove("animationSlideIn");
  setTimeout(
  timeOut,1050);
}

function timeOut() {
  document.getElementById("cont_popup_id").classList.add(`d-none`)
}
function stopClosing(event) {
    event.stopPropagation();
}

// Load

function loadOverlay() {
  let element = document.getElementById("cont_popup_id");
  element.classList.remove(`d-none`);
  element.innerHTML = "";
  element.innerHTML = addContactHTML();
}

// Template HTML

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

                        <form onsubmit="addContact()" class="contAddForm">
                            <div><input pattern="^(&#92w&#92w+)&#92s(&#92w+)$" required id = "inputName" type= "text" placeholder="Name Surname" class="contInputEdit"><img class="contFormImg" src="./img/contact_icon_min.svg"></div>
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

// Fkt Add Contact - def array structure

function addContact() {
  let name = greatLetter(document.getElementById("inputName").value);
  let surname = greatLetterSurname(name.slice(name.indexOf(" ") + 1, name.length));
  let mail = document.getElementById(`inputMail`);
  let phone = document.getElementById(`inputPhone`);
  let randomColor = color ;

  let data = {
    name: name,
    surname: surname,
    email: mail,
    phone: phone,
    pic: randomColor,
    password: "0000"
  }
// push
 JSONcontacts.push(data);
 console.log(JSONcontacts);
// delay
  name.value =``;
  mail.value =``;
  phone.value =``;

}

// Fkt first letter of name great
function greatLetter (name) {
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
	let greateSurname = surname.charAt(0).toUpperCase() + surname.slice(1, surname.length);
	return greateSurname;
}