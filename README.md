# ⚡ QuickShort – URL Shortener Extension

![Manifest V3](https://img.shields.io/badge/Manifest-V3-success?style=for-the-badge&logo=google-chrome)
![TinyURL API](https://img.shields.io/badge/API-TinyURL-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-green?style=for-the-badge)

**QuickShort** is a robust, lightweight browser extension built on the modern **Manifest V3** architecture. It provides a seamless way to shorten URLs using the **TinyURL API**, featuring both instant background shortening and a custom alias interface.

---

## 🚀 Key Features

### 1. ⚡ Instant Context Menu Mode
*   **Right-click** anywhere on a page or on a specific link.
*   Select **"⚡ Quick Shorten & Copy"**.
*   A random short URL is generated and **automatically copied** to your clipboard.
*   *Zero typing required.*

### 2. 🎨 Custom Popup Mode
*   Click the extension icon in the toolbar.
*   **Auto-fill:** Automatically grabs the current tab's URL.
*   **Editable:** You can delete the URL and paste a different one (e.g., from WhatsApp).
*   **Custom Aliases:** Create branded links like `tinyurl.com/my-project-2024`.

---

## 🛠️ Installation Guide (Developer Mode)

Since this project is in development, you install it via "Load Unpacked".

1.  **Clone/Download** this repository.
2.  Open your browser's extension manager:
    *   **Chrome:** `chrome://extensions`
    *   **Edge:** `edge://extensions`
3.  Enable **Developer Mode** (Toggle switch in the top-right corner).
4.  Click **Load Unpacked**.
5.  Select the **QuickShort** folder.
6.  The extension is now active! 

---

## 📖 Usage Instructions

| Feature | Action | Result |
| :--- | :--- | :--- |
| **Random Link** | Right-click page > "Quick Shorten" | `tinyurl.com/xyz123` (Copied) |
| **Custom Link** | Click Icon > Type Alias > Click Button | `tinyurl.com/your-alias` (Copied) |

---

## 📂 Project Structure

```text
QuickShort/
│
├── manifest.json      # Configuration (Permissions, V3 definitions)
├── background.js      # Service Worker (Right-click logic)
├── popup.html         # User Interface (HTML)
├── popup.js           # Popup Logic (API calls & UI handling)
└── icons/
    └── icon-48.png    # App Icon
