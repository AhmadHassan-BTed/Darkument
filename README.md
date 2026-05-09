# 🌙 Darkument

[![Microsoft Edge Addons](https://img.shields.io/badge/Edge-Addons-blue)](https://microsoftedge.microsoft.com/addons/detail/darkument/hbnldmiejhccilhonmbooncolpcfhjlp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Darkument** is a lightweight, high-performance browser extension designed to protect your eyes by inverting colors on PDFs, documents, and web pages. Perfect for late-night study sessions and deep work.

![Banner](assets/promo/Promotional%20Banner.png)

## ✨ Features

- **Smart Inversion**: Uses advanced CSS blend modes to invert colors without losing detail.
- **PDF Support**: Works seamlessly with browser-native PDF viewers.
- **One-Click Toggle**: Quickly switch between dark and light modes from the toolbar.
- **Lightweight**: Zero bloat, minimal memory footprint.
- **Privacy First**: No data collection, works entirely locally.

## 🚀 Installation

### Microsoft Edge
Get it from the [Official Edge Addons Store](https://microsoftedge.microsoft.com/addons/detail/darkument/hbnldmiejhccilhonmbooncolpcfhjlp).

### Chrome / Brave / Opera (Manual Installation)
1. Download the latest release from the [GitHub Releases](https://github.com/Ahmad-Hassan-0/Darkument/releases) page.
2. Unzip the file.
3. Open your browser's extensions page (`chrome://extensions`).
4. Enable **Developer Mode**.
5. Click **Load unpacked** and select the `src` folder.

## ⚙️ Setup for Local PDFs

To use Darkument with PDF files stored on your computer:
1. Right-click the Darkument icon in your toolbar.
2. Select **Manage Extension**.
3. Toggle on **"Allow access to file URLs"**.

## 🛠️ Development

### Prerequisites
- Node.js (for task management)

### Project Structure
- `src/`: Core extension source code.
- `assets/`: Branding and promotional materials.
- `docs/`: Documentation and tester notes.
- `build/`: Production-ready packages.

### Building from Source
```bash
# Clone the repository
git clone https://github.com/Ahmad-Hassan-0/Darkument.git

# Navigate to directory
cd Darkument

# Build the extension (requires zip utility)
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Created with ❤️ by [Ahmad Hassan](https://github.com/Ahmad-Hassan-0)
