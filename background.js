chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "selectText",
    title: "Select Text",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "selectText") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getSelectedText,
    });
  }
});

function getSelectedText() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    alert(`You selected: ${selectedText}`);
  }
}

function getSelectedTextFromUrl() {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    // Call the API with the selected text
    fetch("https://your-api-endpoint.com/submit-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: selectedText }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(`API Response: ${JSON.stringify(data)}`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error while calling the API");
      });
  } else {
    alert("No text selected");
  }
}
