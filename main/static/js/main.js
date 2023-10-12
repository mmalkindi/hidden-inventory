/**
 * Requests all of the user's items from the server
 * @returns {JSON}
 */
async function getItems() {
    return fetch(url_get_items).then((res) => res.json())
}

/**
 * Requests an item with said ID from the server
 * @param {number} id 
 * @returns {JSON}
 */
async function getItem(id) {
    const get_url = url_get_an_item.replace(/12345/, id.toString());
    return fetch(get_url).then((res) => res.json())
}

/**
 * Renders item tags into separate HTML span elements
 * @param {string} tags 
 * @returns 
 */
function renderTags(tags) {
    let tagHTML = ``;
    const tagsArray = tags.split(';');
    tagsArray.forEach((tag) => {
        tagHTML += `<span class="badge rounded text-primary-emphasis bg-primary-subtle border border-primary-subtle m-1">${tag.trim()}</span>`;
    })
    return tagHTML;
}

/**
 * Refreshes the card's content  
 * Use this for editItem
 * @param {number} id 
 */
async function refreshCard(id) {
    const item = (await getItem(id))[0]

    let htmlString = `
    <h5 class="card-title text-center">${item.fields.name}</h5>
    <hr/>
    <p class="card-text mb-3">${item.fields.description.replace(/\r\n/g, "<br/>")}</p>
    <div class="container text-left">
        <div class="row g-2 mb-1">
            <div class="text-body-secondary col-4 p-0">Price</div>
            <div class="col-8 p-0">\$${item.fields.price}</div>
        </div>
        <div class="row g-2 mb-1">
            <div class="text-body-secondary col-4 p-0">Amount</div>
            <div class="col-8 p-0">${item.fields.amount}</div>
        </div>
        <div class="row g-2 mb-1">
            <div class="text-body-secondary col-4 p-0">Tags</div>
            <div class="col-8 p-0">${renderTags(item.fields.tags)}</div>
        </div>
        <div class="row g-2 mb-1">
            <div class="text-body-secondary col-4 p-0">Date Added</div>
            <div class="text-body-tertiary col-8 p-0"><samp>${item.fields.date_added}</samp></div>
        </div>
    </div>\n`

    document.querySelector("[data-item-id='" + id + "'] .card-body").innerHTML = htmlString
}

/**
 * Refreshes the entire item cards div
 */
async function refreshItems() {
    const items = await getItems()
    let htmlString = ``;
    var counter = 0;
    items.forEach((item) => {
        counter++;
        htmlString += 
        `<div class="col">
            <div class="card h-100 shadow-sm" data-item-id=${item.pk}>
                <div class="card-body">
                    <h5 class="card-title text-center">${item.fields.name}</h5>
                    <hr/>
                    <p class="card-text mb-3">${item.fields.description.replace(/\r\n/g, "<br/>")}</p>
                    <div class="container text-left">
                        <div class="row g-2 mb-1">
                            <div class="text-body-secondary col-4 p-0">Price</div>
                            <div class="col-8 p-0">\$${item.fields.price}</div>
                        </div>
                        <div class="row g-2 mb-1">
                            <div class="text-body-secondary col-4 p-0">Amount</div>
                            <div class="col-8 p-0">${item.fields.amount}</div>
                        </div>
                        <div class="row g-2 mb-1">
                            <div class="text-body-secondary col-4 p-0">Tags</div>
                            <div class="col-8 p-0">${renderTags(item.fields.tags)}</div>
                        </div>
                        <div class="row g-2 mb-1">
                            <div class="text-body-secondary col-4 p-0">Date Added</div>
                            <div class="text-body-tertiary col-8 p-0"><samp>${item.fields.date_added}</samp></div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="gap-2 d-flex justify-content-end">
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-outline-secondary increment-item-button p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mb-1" id="theme-icon" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-outline-secondary decrement-item-button p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mb-1" id="theme-icon" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                                </svg>
                            </button>
                        </div>
                        <button type="button" class="btn btn-outline-warning edit-item-button" data-bs-toggle="modal" data-bs-target="#editModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mb-1" id="theme-icon" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-outline-danger delete-item-button" data-bs-toggle="modal" data-bs-target="#deleteModal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mb-1" id="theme-icon" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>\n` 
    })
    document.getElementById("item_table").innerHTML = htmlString
    document.getElementById("items_amount").innerHTML = `Registered items: <strong>${counter.toString()}</strong>`

    // set event listeners for delete buttons
    const deleteButtons = document.getElementsByClassName("delete-item-button")
    for(var i = 0; i < deleteButtons.length; i++) {
        (function(index) {
            deleteButtons[index].addEventListener("click", function() {
                setDeleteModalId(deleteButtons[index]);
            })
        })(i);
    }

    // set event listeners for edit buttons
    const editButtons = document.getElementsByClassName("edit-item-button")
    for(var i = 0; i < editButtons.length; i++) {
        (function(index) {
            editButtons[index].addEventListener("click", function() {
                setEditModalId(editButtons[index]);
            })
        })(i);
    }

    // set event listeners for increment buttons
    const incrButtons = document.getElementsByClassName("increment-item-button")
    for(var i = 0; i < incrButtons.length; i++) {
        (function(index) {
            incrButtons[index].addEventListener("click", function() {
                incrementItem(this.closest("div.card").dataset.itemId);
            })
        })(i);
    }

    // set event listeners for decrement buttons
    const decrButtons = document.getElementsByClassName("decrement-item-button")
    for(var i = 0; i < decrButtons.length; i++) {
        (function(index) {
            decrButtons[index].addEventListener("click", function() {
                decrementItem(this.closest("div.card").dataset.itemId);
            })
        })(i);
    }
}
refreshItems()

/**
 * Submits the form data to create a new item in the server
 * @returns 
 */
function addItem() {
    fetch(url_create_item, {
        method: "POST",
        body: new FormData(document.querySelector('#add-item-form'))
    }).then(refreshItems)

    document.getElementById("add-item-form").reset()
    return false
}
document.getElementById("button_add").onclick = addItem

/**
 * Request to delete item with id from modalElement for deletion
 * @param {Element} modalElement 
 * @returns 
 */
function deleteItem(modalElement) {
    const id = modalElement.dataset.itemId
    const delete_url = url_delete_item.replace(/12345/, id);
    fetch(delete_url, {
        method: "POST",
        body: new FormData(document.querySelector('#delete-item-form'))
    }).then(refreshItems)

    modalElement.dataset.itemId = null;
    return false
}
document.getElementById("button_delete").onclick = function() {deleteItem(document.getElementById("deleteModal"))}

// submits the latest edit for an item to the server
function editItem(modalElement) {
    const id = modalElement.dataset.itemId
    const edit_url = url_edit_item.replace(/12345/, id);
    fetch(edit_url, {
        method: "POST",
        body: new FormData(document.querySelector('#edit-item-form'))
    }).then((response) => { refreshCard(id) })

    document.getElementById("edit-item-form").reset();
    modalElement.dataset.itemId = null;
    return false
}
document.getElementById("button_edit").onclick = function() {editItem(document.getElementById("editModal"))}

// add one quanity to the item
function incrementItem(id) {
    const increment_url = url_increment_item.replace(/12345/, id);
    fetch(increment_url, {
        method: "POST",
    }).then((response) => { refreshCard(id) })

    return false
}

// reduce one quanity from the item
function decrementItem(id) {
    const decrement_url = url_decrement_item.replace(/12345/, id);
    fetch(decrement_url, {
        method: "POST",
    }).then((response) => { refreshCard(id) })

    return false
}

// setting the delete modal id to get item
async function setDeleteModalId(button) {
    const itemDeleteId = button.closest("div.card").dataset.itemId;
    const itemData = (await getItem(itemDeleteId))[0];
    document.getElementById("deleteModal").dataset.itemId = itemDeleteId;
    document.getElementById("deleteConfirmationText").innerHTML = `${itemData.fields.name}`;
}

// setting the edit modal id to get item
async function setEditModalId(button) {
    const itemEditId = button.closest("div.card").dataset.itemId;
    const itemData = (await getItem(itemEditId))[0];
    document.getElementById("editModal").dataset.itemId = itemEditId;

    const form = document.querySelector('#edit-item-form')            
    Array.from(form.elements).forEach((field) => {
        if (field.name in itemData.fields) {
            field.value = itemData.fields[field.name]
        }
    });
}

// TOASTS
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}