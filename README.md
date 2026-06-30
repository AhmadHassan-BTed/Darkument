<div align="center">


#  Darkument

**A production-grade browser extension engineered for high-fidelity color inversion on PDFs and web documents.**

[![Edge Addons](https://img.shields.io/badge/Edge_Addons-0078D7?style=flat-square&logo=microsoft-edge&logoColor=white)](https://microsoftedge.microsoft.com/addons/detail/darkument/hbnldmiejhccilhonmbooncolpcfhjlp)
[![Manifest V3](https://img.shields.io/badge/Manifest_V3-4CAF50?style=flat-square&logo=google-chrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-F7DF1E?style=flat-square&logoColor=black)](https://opensource.org/licenses/MIT)

> *Darkument provides a seamless "Dark Mode" experience for local and web-hosted files, meticulously optimized for late-night productivity and eye strain reduction.*

<img src="assets/promo/Promotional%20Banner.png" alt="Darkument Promotional Banner" width="100%" />

</div>

<br/>

##  Table of Contents
- [ Features](#-features)
- [ How It Works](#-how-it-works)
- [ Technical Architecture](#-technical-architecture)
- [ Installation](#-installation)
- [ Development](#-development)
- [ Contributing](#-contributing)

---

##  Features

* **High-Fidelity Inversion:** Utilizes GPU-accelerated CSS blend modes for instant, buttery-smooth color shifting without layout breaking.
* **Native PDF Integration:** Works flawlessly within the browser's native PDF viewer, supporting both local (`file://`) and remote files.
* **Intelligent State Management:** Remembers your toggle states on a per-tab basis throughout your browsing session.
* **Zero Privacy Footprint:** Operates 100% locally. No trackers, no analytics, and no data ever leaves your browser.
* **Frictionless Onboarding UX:** Includes a built-in, beautifully designed guide for enabling necessary local file permissions.

---

##  How It Works

### The "Difference" Strategy
Unlike traditional dark mode extensions that attempt to parse and modify thousands of CSS rules (which often leads to broken layouts and high CPU usage), Darkument uses a highly efficient **Mathematical Overlay Strategy**.

When activated, the extension:
1. Injects a `fixed` position `div` that covers `100%` of the viewport.
2. Applies `mix-blend-mode: difference` to this overlay.
3. Sets the background color to **Pure White**.

Mathematically, this performs a precise **Color Negation**:

> **`Pixel_Final = | 255 - Pixel_Original |`**

This ensures that the logic is completely independent of the underlying website's CSS structure, making it natively compatible with PDFs, complex Single Page Applications (SPAs), and legacy sites.

---

##  Technical Architecture

Darkument is built strictly on **Manifest V3** standards, ensuring long-term browser compatibility, strict security policies, and optimal performance.

* **Service Worker (`background.js`):** Acts as the central orchestrator. It manages the extension's lifecycle, tracks tab states using a volatile `Map`, and handles permission polling for local file access.
* **Content Injection Engine:** Leverages the `chrome.scripting` API to dynamically inject non-invasive overlays into the target DOM.
* **Design System:** A minimalist UI that provides immediate feedback via the browser's action badge and dynamic icon switching.

 *For a deeper dive into the system design, see [ARCHITECTURE.md](ARCHITECTURE.md).*

---

##  Installation

### Microsoft Edge (Recommended)
The easiest way to get started is to install directly from the official store:
 **[Download on Microsoft Edge Addons](https://microsoftedge.microsoft.com/addons/detail/darkument/hbnldmiejhccilhonmbooncolpcfhjlp)**

### Manual Installation (Developer Mode)
1. Download the [Latest Release](https://github.com/Ahmad-Hassan-0/Darkument/releases).
2. Open `edge://extensions` or `chrome://extensions` in your browser.
3. Toggle **Developer Mode** on (usually in the top right corner).
4. Click **Load Unpacked** and select the `src/` directory from this repository.

---

##  Development

### Project Structure
```text
 Darkument
├──  src/             # Extension source code (Manifest, JS, Pages)
├──  assets/          # Brand assets (Icons, Promo banners, Screenshots)
├──  build/           # Compiled .zip and .crx artifacts
├──  docs/            # Technical notes and testing guides
└──  .github/         # Issue templates and CI/CD workflows

```

### Build Commands

The project includes a `package.json` for streamlined development tasks (optimized for Windows PowerShell):

```bash
# Build the production-ready .zip file
npm run build

# Clean up build artifacts
npm run clean

```

---

##  Contributing

Darkument is an open-source project. We highly value contributions that improve rendering performance, expand browser compatibility, or refine the user experience!

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'feat: add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request
