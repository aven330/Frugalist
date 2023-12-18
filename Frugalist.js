const itemList = document.querySelector('.item-list');
const completedList = document.querySelector('.completed-list');

// Declare a JavaScript variable for the initial price
var initialPrice = 0;

function createInitialItem() {
    var initialItem = document.createElement('li');
    initialItem.classList.add('item');

    var initialInput = document.createElement('input');
    initialInput.type = 'checkbox';
    initialInput.id = 'item1';
    initialInput.addEventListener('change', handleCompletion);

    var initialLabel = document.createElement('label');

    var initialTextInput = document.createElement('input');
    initialTextInput.type = 'text';
    initialTextInput.placeholder = 'Enter an item';

    var initialPriceSpan = document.createElement('span');
    initialPriceSpan.className = 'price';

    // Set the initial price dynamically
    initialPriceSpan.innerHTML = 'Price: <br> $' + initialPrice.toFixed(2);

    initialLabel.appendChild(initialInput);
    initialLabel.appendChild(initialTextInput);
    initialLabel.appendChild(initialPriceSpan);

    initialItem.appendChild(initialLabel);
    itemList.appendChild(initialItem);
    initialTextInput.focus();

    // Trigger the input event for the initial item
    updatePrice(initialTextInput, initialPriceSpan);

    // Add event listener for text input to update price on input change
    initialTextInput.addEventListener('input', function () {
        updatePrice(initialTextInput, initialPriceSpan);
    });

    // Add event listener for the initial text input to create a new item when Enter is pressed
    initialTextInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            createNewItem();
            initialTextInput.blur(); // Remove focus from the initial text input
        }
    });
}

function createNewItem() {
    var newItem = document.createElement('li');
    newItem.classList.add('item');

    var newInput = document.createElement('input');
    newInput.type = 'checkbox';
    newInput.addEventListener('change', handleCompletion);

    var newLabel = document.createElement('label');

    var textInput = document.createElement('input');
    textInput.type = 'text';
    textInput.placeholder = 'Enter an item';

    var priceSpan = document.createElement('span');
    priceSpan.className = 'price';

    newLabel.appendChild(newInput);
    newLabel.appendChild(textInput);
    newLabel.appendChild(priceSpan);

    newItem.appendChild(newLabel);
    itemList.appendChild(newItem);
    textInput.focus();

    // Trigger the input event for the new item
    updatePrice(textInput, priceSpan);

    // Add event listener for text input to update price on input change
    textInput.addEventListener('input', function () {
        updatePrice(textInput, priceSpan);
    });
}

// Function to delete an item
function deleteItem(inputElement) {
    var listItem = inputElement.closest('li');
    if (listItem && listItem !== itemList.firstElementChild && itemList.childElementCount > 1) {
        var previousItem = listItem.previousElementSibling;
        listItem.remove();
        if (previousItem) {
            var input = previousItem.querySelector('input[type="text"]');
            if (input) {
                input.focus();
            }
        }
    }
}

function updatePrice(input, priceSpan) {
    var price = 0;
    var store = '';
//Here is an example of the values it would get if it used an API which I was not able to create
    switch (input.value.toLowerCase()) {
        case 'apple':
            price = 3.86;
            store = 'Walmart';
            break;
        case 'banana':
            price = 2.99;
            store = 'Target';
            break;
        case 'orange':
            price = 1.99;
            store = 'Amazon';
            break;
        default:
            price = 0;
            store = 'Unknown';
    }

    // Check if the item is completed, and if so, remove the line break
    var completedItem = input.closest('.completed-item');
    if (completedItem) {
        priceSpan.style.whiteSpace = 'normal'; // Remove line break for completed items
    } else {
        priceSpan.style.whiteSpace = 'nowrap'; // Preserve line break for non-completed items
    }

    // Update the price without the line break, and include the store information
    priceSpan.innerHTML = 'Price: $' + price.toFixed(2) + '   Store: ' + store;
}



// Function to handle completion of an item
function handleCompletion(event) {
    var listItem = event.target.closest('li');
    if (event.target.checked) {
        listItem.classList.add('completed-item');
        completedList.appendChild(listItem);
        var textInput = listItem.querySelector('input[type="text"]');
        textInput.setAttribute('disabled', 'disabled');
    } else {
        listItem.classList.remove('completed-item');
        completedList.removeChild(listItem);
        var textInput = listItem.querySelector('input[type="text"]');
        textInput.removeAttribute('disabled');
        itemList.appendChild(listItem);
    }
}

// Call the function to create the initial item
createInitialItem();

// Add event listeners for the initial checkbox and text input for deletion
document.getElementById('item1').addEventListener('change', handleCompletion);

itemList.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        if (event.target.tagName === "INPUT" && event.target.type === "text") {
            createNewItem();
            event.target.blur(); // Remove focus from the text input
        }
    } else if (event.key === "Backspace") {
        if (event.target.tagName === "INPUT" && event.target.type === "text" && event.target.value === '') {
            deleteItem(event.target);
        }
    }
});
