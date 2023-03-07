let contacts = [];

function open_popup() {
  
  
  document.getElementById("cont_popup_id").innerHTML= "";
  loadOverlay();
}

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
                            <div><input pattern="pattern=[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required id = "inputMail" type= "email" placeholder="EMail"class="contInputEdit"><img class="contFormImg" src="./img/contact_input_mail_mini.svg"></div>
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

function addContact() {}
