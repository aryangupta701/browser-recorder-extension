// Define an array to store the authentication steps
var authSteps = [];

// Listen for messages from the content script
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case "authStep":
      // Add the step to the authSteps array
      console.log(request.data)
      authSteps.push(request.data);
      break;
    case "getAuthSteps":
      // Return the authSteps array to the content script
      console.log(authSteps)
      sendResponse({ authSteps: authSteps });
      break;
  }
});