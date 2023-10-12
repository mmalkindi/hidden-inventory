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
        tagHTML += `<span class="badge rounded text-bg-secondary m-1">${tag.trim()}</span>`;
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
        const link_add_item = url_increment_item.replace(/12345/, item.pk.toString());
        const link_reduce_item = url_decrement_item.replace(/12345/, item.pk.toString());

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
                        <button type="button" class="btn btn-outline-secondary increment-item-button">+</button>
                        <button type="button" class="btn btn-outline-secondary decrement-item-button">-</button>
                        <button type="button" class="btn btn-outline-warning edit-item-button" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                        <button type="button" class="btn btn-outline-danger delete-item-button" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                    </div>
                </div>
            </div>
        </div>\n` 
    })
    document.getElementById("item_table").innerHTML = htmlString
    document.getElementById("items_amount").innerText = `Registered items: ${counter}`

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