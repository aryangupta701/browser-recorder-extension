// Function to get the XPath of an element
function getXPath(element) {
  if (element.id !== "") {
    return '//*[@id="' + element.id + '"]';
  } else if (element === document.body) {
    return element.tagName;
  }

  var ix = 0;
  var siblings = element.parentNode.childNodes;
  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i];
    if (sibling === element) {
      return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}


var form = document.querySelector("form");
form.addEventListener("change", function(event) {
  // Send a message to the background script with the current step
  browser.runtime.sendMessage({
    type: "authStep",
    data: event.target.name + ": " + event.target.value
  });
});


// Listen for clicks on the page
document.addEventListener("click", function(event) {
  // Send a message to the background script with the current step
  browser.runtime.sendMessage({
    type: "authStep",
    data: "Click: " + getXPath(event.target)
  });
});


// Send a message to the background script to retrieve the authSteps array
browser.runtime.sendMessage({ type: "getAuthSteps" }, function(response) {
  console.log(response.authSteps);
});