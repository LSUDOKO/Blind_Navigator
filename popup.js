// popup.js

// Log when the popup script loads
console.log('Popup script loaded.');

// Load saved settings
document.addEventListener('DOMContentLoaded', () => {
  console.log('Popup DOM loaded.');

  chrome.storage.sync.get(['voice', 'speed', 'highlight'], (data) => {
    console.log('Settings loaded:', data);
    document.getElementById('voice-select').value = data.voice || 'default';
    document.getElementById('speed-range').value = data.speed || 1;
    document.getElementById('speed-value').textContent = data.speed || 1;
    document.getElementById('highlight-toggle').checked = data.highlight || false;
  });

  // Request voices from the background script
  console.log('Sending message to background script...');
  chrome.runtime.sendMessage({ action: 'getVoices' }, (response) => {
    if (chrome.runtime.lastError) {
      console.error('Error in sendMessage:', chrome.runtime.lastError.message);
      return;
    }

    if (!response || !response.voices) {
      console.error('Invalid response:', response);
      return;
    }

    console.log('Voices received:', response.voices);
    const voices = response.voices;
    const voiceSelect = document.getElementById('voice-select');

    // Clear existing options
    voiceSelect.innerHTML = '';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = 'default';
    defaultOption.textContent = 'Default';
    voiceSelect.appendChild(defaultOption);

    // Populate voice options
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.value = voice.voiceName;
      option.textContent = voice.voiceName;
      voiceSelect.appendChild(option);
    });
  });

  // Update speed value display
  document.getElementById('speed-range').addEventListener('input', (e) => {
    document.getElementById('speed-value').textContent = e.target.value;
  });
});

// Save settings
document.getElementById('save-button').addEventListener('click', () => {
  const voice = document.getElementById('voice-select').value;
  const speed = parseFloat(document.getElementById('speed-range').value);
  const highlight = document.getElementById('highlight-toggle').checked;

  chrome.storage.sync.set({ voice, speed, highlight }, () => {
    console.log('Settings saved:', { voice, speed, highlight });
    alert('Settings saved!');
  });
});