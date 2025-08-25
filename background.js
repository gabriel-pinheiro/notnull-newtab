chrome.action.onClicked.addListener(async () => {
  try {
    const url = chrome.runtime.getURL('index.html');
    await chrome.tabs.create({ url });
  } catch (err) {
    console.error('Failed to open NotNull New Tab:', err);
  }
});
