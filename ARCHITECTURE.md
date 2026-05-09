# 🏗️ System Architecture - Darkument

This document provides a technical deep-dive into the internal workings of Darkument.

## 📐 High-Level Architecture

Darkument follows the **Chrome Extension Manifest V3** architecture, utilizing a decoupled Service Worker and Content Script injection model.

```mermaid
graph TD
    A[User Click] --> B[Service Worker (background.js)]
    B --> C{State Check}
    C -->|Update| D[Tab State Map]
    B --> E[Scripting API]
    E --> F[DOM Injection]
    F --> G[Overlay Implementation]
    G --> H[mix-blend-mode: difference]
```

## 🛠️ Core Components

### 1. Service Worker (`background.js`)
The "brain" of the extension. It manages:
- **State Persistence**: Uses an in-memory `Map` to track the toggle state of every individual tab.
- **Event Orchestration**: Listens for `chrome.action.onClicked`, `chrome.tabs.onUpdated`, and `chrome.tabs.onRemoved`.
- **UI Feedback**: Dynamically updates the browser badge (text and color) and the extension icon based on the active state.
- **Installation Lifecycle**: Handles the initial install event, opens the onboarding page, and polls for "File URL" permissions.

### 2. Rendering Engine (CSS Inversion)
Instead of modifying every individual element's CSS (which is computationally expensive and breaks on many sites), Darkument uses a **Global Overlay Strategy**:
- **Injection**: Injects a `div` as a direct child of `<body>`.
- **Visual Logic**:
  - `position: fixed`: Covers the entire viewport.
  - `mix-blend-mode: difference`: The core mathematical operator.
  - `background-color: white`: When combined with `difference`, it acts as a bitwise NOT operator for colors.
  - `pointer-events: none`: Ensures the overlay doesn't interfere with user clicks or scrolling.

### 3. Permission System
Darkument requires elevated permissions to handle local files:
- **`scripting`**: To inject the inversion logic into the tab.
- **`activeTab`**: To access the current page without requiring broad history access.
- **`host_permissions`**: Specifically handles `file:///*` to support local PDF reading.

## ⚡ Technical Working Mechanism

### The Inversion Formula
The extension leverages the GPU-accelerated `mix-blend-mode`.
The `difference` mode calculates the difference between the color of the element and the color of the layer below it.
```text
Result = |Source Color - Destination Color|
```
By placing a **Pure White** `(255, 255, 255)` layer with `difference` over the content:
- **Black** `(0,0,0)` becomes `|255 - 0| = 255` (**White**)
- **White** `(255,255,255)` becomes `|255 - 255| = 0` (**Black**)
- **Medium Gray** `(128,128,128)` stays roughly the same, preserving contrast.

### PDF Handling
Modern browsers render PDFs using an internal HTML5 viewer (like PDF.js). Since these are rendered as web content, Darkument can inject its overlay directly into the browser's PDF viewer DOM, providing a "Native Dark Mode" experience for local and remote documents.

## 📂 Project Structure

- `src/manifest.json`: Configuration and permission manifest.
- `src/background.js`: State manager and command dispatcher.
- `src/pages/thankyou.html`: Post-install onboarding and permission guide.
- `src/icons/`: High-resolution assets for the browser UI.
