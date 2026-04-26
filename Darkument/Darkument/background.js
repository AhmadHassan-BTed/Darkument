// Enhanced background script for Darkument extension
// Keep track of toggled state per tab
const tabStates = new Map();

// Toggle overlay on click
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  const isActive = tabStates.get(tab.id) || false;

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (active) => {
        const overlayId = "darkument-overlay";
        let overlay = document.getElementById(overlayId);

        if (active) {
          // Remove overlay with smooth transition
          if (overlay) {
            overlay.style.opacity = "0";
            overlay.addEventListener("transitionend", () => {
              overlay.remove();
              document.body.style.backgroundColor = "";
              console.log("✅ Darkument: Overlay removed. Background color control restored.");
            }, { once: true });
          }
        } else {
          // Add overlay with smooth transition
          if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = overlayId;
            
            // Enhanced overlay styles
            Object.assign(overlay.style, {
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              pointerEvents: "none",
              backgroundColor: "white",
              mixBlendMode: "difference",
              zIndex: "2147483647", // Maximum z-index
              opacity: "0",
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              backdropFilter: "none",
              userSelect: "none"
            });

            document.body.appendChild(overlay);
            
            // Force reflow for smooth animation
            void overlay.offsetWidth;
            
            overlay.style.opacity = "1";
            document.body.style.backgroundColor = "#ffffff";
            
            console.log("✅ Darkument: Dark mode activated. PDF view is now inverted.");
          }
        }
      },
      args: [isActive]
    });

    // Update state and icon
    const newState = !isActive;
    tabStates.set(tab.id, newState);

    // Set appropriate icon based on state
    await chrome.action.setIcon({
      tabId: tab.id,
      path: newState
        ? {
            "16": "icon1.png",
            "32": "icon1.png",
            "48": "icon1.png",
            "128": "icon1.png",
          }
        : {
            "16": "icon2.png",
            "32": "icon2.png",
            "48": "icon2.png",
            "128": "icon2.png",
          }
    });

    // Update badge to show current state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: newState ? "ON" : ""
    });

    await chrome.action.setBadgeBackgroundColor({
      tabId: tab.id,
      color: newState ? "#4CAF50" : "#666666"
    });

  } catch (error) {
    console.error("❌ Darkument Error:", error);
    
    // Show error notification
    try {
      await chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon1.png',
        title: 'Darkument Error',
        message: 'Unable to toggle dark mode on this page.',
        priority: 1
      });
    } catch (notificationError) {
      console.error("❌ Failed to show notification:", notificationError);
    }
  }
});

// Clean up state when tab closes
chrome.tabs.onRemoved.addListener((tabId) => {
  tabStates.delete(tabId);
});

// Handle tab updates to maintain state
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tabStates.has(tabId)) {
    const isActive = tabStates.get(tabId);
    
    try {
      // Update badge and icon for the current state
      await chrome.action.setBadgeText({
        tabId: tabId,
        text: isActive ? "ON" : ""
      });
      
      await chrome.action.setIcon({
        tabId: tabId,
        path: isActive
          ? {
              "16": "icon1.png",
              "32": "icon1.png",
              "48": "icon1.png",
              "128": "icon1.png",
            }
          : {
              "16": "icon2.png",
              "32": "icon2.png",
              "48": "icon2.png",
              "128": "icon2.png",
            }
      });
    } catch (error) {
      console.error("❌ Error updating tab state:", error);
    }
  }
});

// Helper function to check file URL permissions
async function checkFileUrlPermission() {
  try {
    // Modern way to check permissions
    const hasPermission = await chrome.permissions.contains({
      origins: ["file:///*"]
    });
    return hasPermission;
  } catch (error) {
    // Fallback for older extension versions
    try {
      // This is deprecated but kept as fallback
      return await chrome.extension.isAllowedFileSchemeAccess();
    } catch (fallbackError) {
      console.warn("Cannot check file URL this is my thing :", fallbackError);
      return false;
    }
  }
}

// Enhanced installation handler
chrome.runtime.onInstalled.addListener(async (details) =>{
  // Only show setup for new installations
  if (details.reason === 'install') {
    try {
      // Create welcome page
      const welcomeTab = await chrome.tabs.create({
        url: chrome.runtime.getURL("thankyou.html")
      });

      // Show enhanced notification
      setTimeout(async () => {
        try {
          const notificationId = await chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon1.png',
            title: '🌙 Darkument Setup Required',
            message: 'Please enable "Allow access to file URLs" in extension settings to use Darkument with local PDF files.',
            priority: 2,
            buttons: [
              { title: 'Show Instructions' }
            ]
          });

          // Handle notification click
          const handleNotificationClick = (clickedNotificationId, buttonIndex) => {
            if (clickedNotificationId === notificationId && buttonIndex === 0) {
              chrome.tabs.create({
                url: chrome.runtime.getURL("welcome.html")
              });
              chrome.notifications.onButtonClicked.removeListener(handleNotificationClick);
            }
          };

          chrome.notifications.onButtonClicked.addListener(handleNotificationClick);
        } catch (notificationError) {
          console.error("❌ Failed to create notification:", notificationError);
        }
      }, 1500);

      // Enhanced permission polling
      const pollPermissions = async () => {
        try {
          const isAllowed = await checkFileUrlPermission();
          
          if (isAllowed) {
            // Show success notification
            try {
              await chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon1.png',
                title: '🎉 Darkument Ready!',
                message: 'File access enabled! You can now use Darkument with local PDF files.',
                priority: 2
              });
            } catch (successNotificationError) {
              console.error("❌ Failed to show success notification:", successNotificationError);
            }

            // Update welcome page to show success
            try {
              await chrome.tabs.sendMessage(welcomeTab.id, {
                action: 'permissionGranted'
              });
            } catch (messageError) {
              // Welcome tab might be closed
              console.log("Welcome tab unavailable for message");
            }
            
            clearInterval(intervalId);
          }
        } catch (permissionError) {
          console.error("❌ Error checking permissions:", permissionError);
          clearInterval(intervalId);
        }
      };

      const intervalId = setInterval(pollPermissions, 2000);
      
      // Stop polling after 5 minutes
      setTimeout(() => {
        clearInterval(intervalId);
      }, 300000);

    } catch (error) {
      console.error("❌ Failed to create welcome tab:", error);
    }
  }
});