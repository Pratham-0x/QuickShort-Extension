document.addEventListener('DOMContentLoaded', () => {
    const longUrlInput = document.getElementById('longUrl');
    const aliasInput = document.getElementById('customAlias');
    const btn = document.getElementById('btnShorten');
    const resultDiv = document.getElementById('result');

    // 1. Auto-fill with current tab URL (User can delete this if they want)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0]) {
            longUrlInput.value = tabs[0].url;
            // Highlight the text so the user can easily overwrite it if they want
            longUrlInput.select();
        }
    });

    // 2. Button Logic
    btn.addEventListener('click', () => {
        // We grab whatever is inside the box (whether it's the tab URL or a pasted URL)
        const originalUrl = longUrlInput.value.trim();
        const customAlias = aliasInput.value.trim();

        if (!originalUrl) {
            showResult("Please enter a URL first!", false);
            return;
        }

        // UI Loading State
        btn.disabled = true;
        btn.textContent = "Processing...";
        resultDiv.style.display = 'none';

        // Build API URL
        let apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`;
        if (customAlias) {
            apiUrl += `&alias=${encodeURIComponent(customAlias)}`;
        }

        // Fetch
        fetch(apiUrl)
            .then(res => res.text())
            .then(text => {
                if (text.toLowerCase().includes("error")) {
                    showResult("Alias unavailable! Try another.", false);
                } else {
                    navigator.clipboard.writeText(text);
                    showResult(`Copied: ${text}`, true);
                }
            })
            .catch(() => showResult("Network Error", false))
            .finally(() => {
                btn.disabled = false;
                btn.textContent = "Shorten & Copy";
            });
    });

    function showResult(msg, isSuccess) {
        resultDiv.textContent = msg;
        resultDiv.className = isSuccess ? 'success' : 'error';
        resultDiv.style.display = 'block';
    }
});