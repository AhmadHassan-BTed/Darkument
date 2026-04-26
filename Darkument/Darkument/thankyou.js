// document.addEventListener('DOMContentLoaded', function() {
//     const scrollButton = document.getElementById('scrollButton');
//     const targetContainer = document.getElementById('below-container');

//     if (scrollButton && targetContainer) {
//         scrollButton.addEventListener('click', function() {
//             targetContainer.scrollIntoView({ 
//                 behavior: 'smooth' 
//             });
//         });
//     }

//     document.getElementById('otherProjectsLink').addEventListener('click', function(e) {
//     e.preventDefault();
//     chrome.tabs.create({ url: 'https://kodearrow.wuaze.com/?i=1' });
// });
// });

document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.getElementById('scrollButton');
    const targetContainer = document.getElementById('below-container');

    if (scrollButton && targetContainer) {
        scrollButton.addEventListener('click', function() {
            targetContainer.scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }

    // Handle other projects link
    document.getElementById('otherProjectsLink').addEventListener('click', function(e) {
        e.preventDefault();
        chrome.tabs.create({ url: 'https://kodearrow.wuaze.com/?i=1' });
    });

    // Handle step 1 click to open extensions page
    const step1 = document.querySelector('.step:first-child');
    if (step1) {
        step1.addEventListener('click', function() {
            // Detect browser type
            const isEdge = /Edg/.test(navigator.userAgent);
            const extensionsUrl = isEdge 
                ? `edge://extensions/?id=${chrome.runtime.id}`
                : `chrome://extensions/?id=${chrome.runtime.id}`;
            
            // Open extensions page in a new tab
            chrome.tabs.create({ 
                url: extensionsUrl,
                active: true  // Make the new tab active/focused
            });
        });
        
        // Add visual indication that step 1 is clickable
        step1.style.cursor = 'pointer';
        step1.title = 'Click to open extensions page';
        
        // Add hover effect
        step1.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            this.style.borderLeftColor = '#66BB6A';
        });
        
        step1.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
            this.style.borderLeftColor = '#4CAF50';
        });
    }
});