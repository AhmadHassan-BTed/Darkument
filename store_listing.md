# Google Chrome Web Store Listing Fields - Darkument

Use the fields below to fill out the Chrome Extension Store listing on the Google Chrome Web Store Developer Console.

---

## 📋 Product Details

### Title
```text
Darkument
```
*(From package.json, max 45 characters)*

### Summary
```text
Invert PDFs, Documents and Web-Pages. Study late-nights wish me well :) by Ahmad Hassan.
```
*(From manifest.json, max 132 characters)*

### Description
```text
Darkument transforms bright screens into a soothing dark mode, specially built to support PDFs in inverted colors for late-night reading comfort. It works seamlessly on documents, web pages, and most importantly, those eye-burning white PDFs.

I'm a student who studies and works long into the night, and I made it for others like me. Think of it as a small gift from one student to another. Stay focused, stay comfortable, and wishing you good luck :) by Ahmad Hassan.

---

Key Features:
🚀 Native PDF Inversion: Works seamlessly with Chrome's native PDF reader. Invert both local (file:///) and web-hosted PDF files with a single click.
⚡ High-Fidelity Rendering: Utilizes GPU-accelerated CSS blend modes for an instant, buttery-smooth color-shift without breaking elements or slowing down your computer.
🔒 Volatile State Management: Remembers your toggle preferences per tab. Toggle dark mode on for one document without affecting your other browsing tabs.
🛡️ Absolute Privacy: 100% local operation. No trackers, no external analytics, and no third-party APIs. Your data never leaves your browser.
⚙️ Frictionless Setup: Includes a built-in onboarding guide to help you configure offline local file permissions in seconds.

How to Use:
1. Pin Darkument to your toolbar.
2. Click the icon to activate/deactivate color inversion instantly.
3. The current state is shown on the action badge (ON/OFF) with a visual indicator.
```
*(Focuses on what the item does and why users should install it. Max 16,000 characters)*

### Category
```text
Make Chrome Yours > Accessibility
(OR: Productivity > Tools / Productivity)
```
*(Primary choice: Accessibility under the "Make Chrome Yours" section, as it adapts documents for night reading and eye protection. Alternate choice: Productivity or Tools under "Productivity" section)*

### Language
```text
English
```
*(Primary language of the extension listing)*

---

## 🎨 Graphic Assets

All graphic assets below have been prepared to meet the Chrome Web Store format requirements. They are saved in the [store_assets](file:///c:/Users/PMLS/Downloads/Darkument/store_assets) folder.

### Store Icon
- **Requirement**: 128x128 pixels (PNG/JPEG)
- **Path to upload**: [store_assets/store_icon.png](file:///c:/Users/PMLS/Downloads/Darkument/store_assets/store_icon.png)
- **Properties**: 128x128, 32-bit PNG (with transparency support)

### Global Promo Video
- **Requirement**: YouTube URL (Optional)
- **Value**: *None* (Leave empty)

### Screenshots
- **Requirement**: 1280x800 or 640x400 (JPEG or 24-bit PNG without alpha channel). Up to 5 screenshots. At least 1 is required.
- **Paths to upload**:
  1. [store_assets/screenshots/screenshot1.png](file:///c:/Users/PMLS/Downloads/Darkument/store_assets/screenshots/screenshot1.png) (1280x800, 24-bit RGB PNG)
  2. [store_assets/screenshots/screenshot2.png](file:///c:/Users/PMLS/Downloads/Darkument/store_assets/screenshots/screenshot2.png) (1280x800, 24-bit RGB PNG)
  3. [store_assets/screenshots/screenshot3.png](file:///c:/Users/PMLS/Downloads/Darkument/store_assets/screenshots/screenshot3.png) (1280x800, 24-bit RGB PNG)

### Small Promo Tile
- **Requirement**: 440x280 Canvas (JPEG or 24-bit PNG without alpha channel)
- **Path to upload**: [store_assets/small_promo_tile.png](file:///c:/Users/PMLS/Downloads/Darkument/store_assets/small_promo_tile.png)
- **Properties**: 440x280, 24-bit RGB PNG

### Marquee Promo Tile
- **Requirement**: 1400x560 Canvas (JPEG or 24-bit PNG without alpha channel)
- **Path to upload**: [store_assets/marquee_promo_tile.png](file:///c:/Users/PMLS/Downloads/Darkument/store_assets/marquee_promo_tile.png)
- **Properties**: 1400x560, 24-bit RGB PNG

---

## ⚙️ Additional Fields

### Official URL
- **Value**: *None* (Leave empty unless associated with a verified website in your Google Search Console)

### Homepage URL
- **Value**: `https://github.com/AhmadHassan-BTed/Darkument`
- **Link**: [GitHub Repository](https://github.com/AhmadHassan-BTed/Darkument)

### Support URL
- **Value**: `https://github.com/AhmadHassan-BTed/Darkument/issues`
- **Link**: [Issues Tracker](https://github.com/AhmadHassan-BTed/Darkument/issues)

### Mature Content
- **Value**: `No`
*(Does not contain mature, violent, or suggestive content)*

### Item Support
- **Value**: `Turn On`
*(Allows users to ask questions and report bugs directly on your store listing)*

---

## 🔒 Privacy Practices & Permissions Justifications

Go to the **Privacy practices** tab in the Chrome Web Store Developer Console to fill in these fields:

### 1. Single Purpose Description
```text
The single purpose of Darkument is to provide high-fidelity color inversion on PDFs and web documents to reduce eye strain during late-night reading and study sessions.
```

### 2. Permission Justifications
Provide these reasons in the text boxes next to each declared permission:

- **`activeTab`**:
  ```text
  Required to temporarily grant the extension access to the active document viewport only when the user explicitly clicks the toolbar icon to toggle color inversion.
  ```
- **`host_permissions` / `<all_urls>` and `file:///*`**:
  ```text
  Required to apply color inversion overlays across all web domains and offline local file URLs (such as local PDFs) when activated by the user.
  ```
- **`notifications`**:
  ```text
  Used to display quick alerts to the user (e.g., instructing them on how to enable local file access settings, or confirming that the file access was successfully granted).
  ```
- **`scripting`**:
  ```text
  Required to dynamically inject the color inversion overlay and stylesheet rules into the document viewport when toggled by the user.
  ```
- **`tabs`**:
  ```text
  Required to listen to tab updates (such as page reloads) to synchronize the active/inactive toolbar icon and ON/OFF badge status correctly.
  ```

### 3. Remote Code Use Justification
- **Question**: "Are you using remote code?"
- **Answer**: Select **No, I am not using Remote code**.
- **Justification / Explanation** *(if prompted)*:
  ```text
  The extension runs 100% locally. All scripts, stylesheets, and assets are packaged within the extension, and no external code is loaded at runtime.
  ```

### 4. Data Usage Disclosures
- **Question**: "What user data do you plan to collect from users now or in the future?"
- **Answer**: **DO NOT check any boxes**. Leave all categories (Personally identifiable information, Health, Financial, etc.) completely **UNCHECKED**, as the extension operates strictly locally and does not collect or transmit user data.

- **Data Compliance Certifications**:
  Check **all three** boxes at the bottom:
  1. `[x]` *I do not sell or transfer user data to third parties, outside of the approved use cases*
  2. `[x]` *I do not use or transfer user data for purposes that are unrelated to my item's single purpose*
  3. `[x]` *I do not use or transfer user data to determine creditworthiness or for lending purposes*

### 5. Privacy Policy URL
- **Field**: `Privacy policy URL*`
- **Value**:
  ```text
  https://github.com/AhmadHassan-BTed/Darkument/blob/main/PRIVACY.md
  ```
  *(Note: Replace `AhmadHassan-BTed` and `main` with your actual GitHub username and default branch if they differ after you push your code, so Google's reviewers can access the policy page).*

---

## ✉️ Settings Page Setup

Go to the **Settings** tab in the developer console (left navigation bar) and complete the following steps to resolve contact email errors:
1. Under **Developer communication**, find the **Publisher email** text box.
2. Enter your public publisher/contact email address.
3. Click **Save** at the top right.
4. Go to your email inbox, find the verification email sent by Google Chrome Web Store Developer Support, and click the confirmation link.

