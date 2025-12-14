// Create the Context Menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "quick-shorten",
    title: "⚡ Quick Shorten & Copy",
    contexts: ["page", "link"]
  });
});

// Handle the Click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const urlToShorten = info.linkUrl || tab.url;

  if (!urlToShorten) return;

  // 1. Fetch Random Short Link
  fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(urlToShorten)}`)
    .then(res => res.text())
    .then(async (shortUrl) => {
      
      // 2. Inject Copy Script
      const isRestricted = tab.url.startsWith('chrome://') || tab.url.startsWith('edge://');
      
      if (tab.id && !isRestricted) {
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: (text) => {
              // Create invisible text area to force copy
              const input = document.createElement("textarea");
              input.value = text;
              document.body.appendChild(input);
              input.select();
              document.execCommand('copy');
              document.body.removeChild(input);
            },
            args: [shortUrl]
          });
          showNotification(`Copied: ${shortUrl}`);
        } catch (e) {
          showNotification(`Created: ${shortUrl}`);
        }
      } else {
        showNotification(`Created: ${shortUrl}`);
      }
    })
    .catch(err => console.error(err));
});

function showNotification(msg) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon-48.png',
    title: 'QuickShort',
    message: msg,
    priority: 1
  });
}