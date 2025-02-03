// background.js

// Log when the background script loads
console.log('Background script loaded.');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received in background script:', request);

  if (request.action === 'getVoices') {
    // Fetch available voices
    chrome.tts.getVoices((voices) => {
      if (chrome.runtime.lastError) {
        console.error('Error fetching voices:', chrome.runtime.lastError.message);
        sendResponse({ voices: [] }); // Send an empty array if there's an error
      } else {
        console.log('Voices fetched:', voices);
        sendResponse({ voices: voices || [] }); // Ensure voices is always an array
      }
    });
    return true; // Required for async sendResponse
  }
});