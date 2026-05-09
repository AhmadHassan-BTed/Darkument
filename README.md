# 🌙 Darkument

[![Microsoft Edge Addons](https://img.shields.io/badge/Edge-Addons-blue)](https://microsoftedge.microsoft.com/addons/detail/darkument/hbnldmiejhccilhonmbooncolpcfhjlp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Manifest V3](https://img.shields.io/badge/Manifest-V3-green.svg)](https://developer.chrome.com/docs/extensions/mv3/intro/)

**Darkument** is a production-grade browser extension engineered for high-fidelity color inversion on PDFs and web documents. It provides a seamless "Dark Mode" experience for local and web-hosted files, optimized for late-night productivity and eye strain reduction.

![Banner](assets/promo/Promotional%20Banner.png)

## 📋 Table of Contents
- [✨ Features](#-features)
- [⚙️ Technical Architecture](#️-technical-architecture)
- [⚡ How It Works](#-how-it-works)
- [🚀 Installation](#-installation)
- [🛠️ Development](#️-development)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

- **High-Fidelity Inversion**: Utilizes GPU-accelerated CSS blend modes for instant, smooth color shifting.
- **Native PDF Integration**: Works within the browser's PDF viewer, supporting both local (`file://`) and remote files.
- **Intelligent State Management**: Remembers toggle states per tab during the session.
- **Zero Privacy Footprint**: Operates entirely on the client-side; no data ever leaves your browser.
- **Onboarding UX**: Includes a built-in guide for enabling necessary local file permissions.

## ⚙️ Technical Architecture

Darkument is built on **Manifest V3**, ensuring long-term compatibility, security, and performance.

### Component Breakdown
- **Service Worker (`background.js`)**: Acts as the central orchestrator. It manages the extension's lifecycle, tracks tab states using a volatile `Map`, and handles permission polling for local file access.
- **Content Injection Engine**: Leverages the `chrome.scripting` API to dynamically inject non-invasive overlays into the target DOM.
- **Design System**: A minimalist UI that provides immediate feedback via the browser's action badge and dynamic icon switching.

For a deeper dive into the system design, see [ARCHITECTURE.md](ARCHITECTURE.md).

## ⚡ How It Works

### The "Difference" Strategy
Unlike traditional dark mode extensions that attempt to parse and modify thousands of CSS rules (which often leads to broken layouts and high CPU usage), Darkument uses a **Mathematical Overlay Strategy**.

When activated, the extension:
1. Injects a `fixed` position `div` that covers 100% of the viewport.
2. Applies `mix-blend-mode: difference` to this overlay.
3. Sets the background color to **Pure White**.

Mathematically, this performs a **Color Negation**:
`Pixel_Final = | 255 - Pixel_Original |`

This ensures that the logic is independent of the underlying website's CSS structure, making it 100% compatible with PDFs, complex web apps, and legacy sites.

## 🚀 Installation

### Microsoft Edge (Recommended)
Install directly from the [Microsoft Edge Addons Store](https://microsoftedge.microsoft.com/addons/detail/darkument/hbnldmiejhccilhonmbooncolpcfhjlp).

### Manual Installation (Developer Mode)
1. Download the [Latest Release](https://github.com/Ahmad-Hassan-0/Darkument/releases).
2. Open `edge://extensions` or `chrome://extensions`.
3. Enable **Developer Mode**.
4. Click **Load Unpacked** and select the `src/` directory from this repository.

## 🛠️ Development

### Project Structure
```text
├── src/                # Extension source (Manifest, JS, Pages)
├── assets/             # Brand assets (Icons, Promo, Screenshots)
├── build/              # Compiled .zip and .crx artifacts
├── docs/               # Technical notes and testing guides
└── .github/            # Issue templates and workflows
```

### Build Commands
The project includes a `package.json` for streamlined development tasks (Windows PowerShell optimized):
```bash
# Build production zip
npm run build

# Clean build artifacts
npm run clean
```

## 🤝 Contributing

Darkument is an open-source project. We value contributions that improve performance, expand compatibility, or refine the user experience.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

---

*Created by [Ahmad Hassan](https://github.com/Ahmad-Hassan-0) — Empowering late-night readers.*
