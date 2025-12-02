// Empty Trash Content Script
// This script automates emptying the Google Photos trash

// Constants
const PAGE_LOAD_DELAY = 2000;
const CONFIRMATION_DIALOG_TIMEOUT = 10;
const ACTION_COMPLETION_DELAY = 3000;
const ELEMENT_POLL_INTERVAL = 50;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForElement(selector, timeout) {
  const startTime = new Date();
  while (!document.querySelector(selector)) {
    if (new Date() - startTime >= timeout * 1000) return null;
    await sleep(ELEMENT_POLL_INTERVAL);
  }
  return document.querySelector(selector);
}

function createOverlay(content) {
  // Remove any existing overlay
  const existing = document.querySelector('.empty-trash-overlay');
  if (existing) existing.remove();
  const existingBackdrop = document.querySelector('.empty-trash-backdrop');
  if (existingBackdrop) existingBackdrop.remove();
  
  const backdrop = document.createElement('div');
  backdrop.className = 'empty-trash-backdrop';
  backdrop.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100vh;background-color:rgba(0,0,0,0.6);pointer-events:none;z-index:1000;backdrop-filter:blur(4px);';
  
  const overlay = document.createElement('div');
  overlay.className = 'empty-trash-overlay';
  overlay.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background-color:#fff;border:none;border-radius:16px;padding:2rem 2.5rem;z-index:1001;color:#1f1f1f;box-shadow:0 8px 32px rgba(0,0,0,0.25);max-width:500px;width:90%;text-align:center;';
  overlay.innerHTML = content;
  
  document.body.appendChild(backdrop);
  document.body.appendChild(overlay);
  
  return { backdrop, overlay };
}

function showStatus(icon, title, message) {
  return createOverlay(`
    <div style="font-size:3rem;margin-bottom:1rem;">${icon}</div>
    <h1 style="font-size:1.5rem;color:#1a73e8;margin-bottom:1rem;font-weight:600;">${title}</h1>
    <p style="font-size:.95rem;margin-top:1.5rem;color:#5f6368;line-height:1.6;">${message}</p>
  `);
}

function showSuccess() {
  const { backdrop, overlay } = createOverlay(`
    <div style="font-size:3rem;margin-bottom:1rem;">✅</div>
    <h1 style="font-size:1.5rem;color:#1a73e8;margin-bottom:1rem;font-weight:600;">Trash Emptied!</h1>
    <p style="font-size:.95rem;margin-top:1.5rem;color:#5f6368;line-height:1.6;">All photos have been permanently deleted from your Google Photos trash.</p>
    <button id="close-overlay-btn" style="background:linear-gradient(135deg,#1a73e8 0%,#1557b0 100%);color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:15px;box-shadow:0 4px 12px rgba(26,115,232,0.35);">Close</button>
  `);
  
  document.getElementById('close-overlay-btn').addEventListener('click', function() {
    backdrop.remove();
    overlay.remove();
    // Navigate away from the empty_trash URL
    window.location.href = window.location.href.split('?')[0];
  });
  
  localStorage.removeItem("num_deleted");
  document.title = "✅ Trash Emptied! " + document.title;
}

function showError(message) {
  const { backdrop, overlay } = createOverlay(`
    <div style="font-size:3rem;margin-bottom:1rem;">❌</div>
    <h1 style="font-size:1.5rem;color:#ea4335;margin-bottom:1rem;font-weight:600;">Error</h1>
    <p style="font-size:.95rem;margin-top:1.5rem;color:#5f6368;line-height:1.6;">${message}</p>
    <button id="retry-btn" style="background:linear-gradient(135deg,#1a73e8 0%,#1557b0 100%);color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:15px;box-shadow:0 4px 12px rgba(26,115,232,0.35);">Retry</button>
    <button id="close-error-btn" style="background:#fff;color:#5f6368;border:2px solid #dadce0;padding:12px 24px;border-radius:8px;font-size:1rem;font-weight:600;cursor:pointer;margin-top:15px;margin-left:10px;">Close</button>
  `);
  
  document.getElementById('retry-btn').addEventListener('click', function() {
    backdrop.remove();
    overlay.remove();
    emptyTrash();
  });
  
  document.getElementById('close-error-btn').addEventListener('click', function() {
    backdrop.remove();
    overlay.remove();
    window.location.href = window.location.href.split('?')[0];
  });
}

async function emptyTrash() {
  showStatus('⏳', 'Emptying Trash...', 'Please wait while we permanently delete all photos from your trash. Do not close this tab.');
  
  await sleep(PAGE_LOAD_DELAY); // Wait for the page to fully load
  
  // Look for the "Empty trash" button
  // Google Photos has a button with aria-label containing "Empty trash" or similar text
  let emptyTrashBtn = null;
  
  // Try different selectors for the empty trash button
  const selectors = [
    'button[aria-label*="Empty trash"]',
    'button[aria-label*="empty trash"]',
    'button[data-tooltip*="Empty trash"]',
    'div[role="button"][aria-label*="Empty trash"]',
    'div[role="button"][aria-label*="empty trash"]'
  ];
  
  for (const selector of selectors) {
    emptyTrashBtn = document.querySelector(selector);
    if (emptyTrashBtn) break;
  }
  
  // If not found by aria-label, try to find by text content
  if (!emptyTrashBtn) {
    const buttons = document.querySelectorAll('button, div[role="button"]');
    for (const btn of buttons) {
      if (btn.textContent && btn.textContent.toLowerCase().includes('empty trash')) {
        emptyTrashBtn = btn;
        break;
      }
    }
  }
  
  if (!emptyTrashBtn) {
    // Check if trash is already empty
    const emptyMessage = document.body.textContent.toLowerCase();
    if (emptyMessage.includes('no items') || emptyMessage.includes('trash is empty') || emptyMessage.includes('nothing in trash')) {
      showSuccess();
      return;
    }
    
    showError('Could not find the "Empty trash" button. The trash might be empty, or Google Photos may have changed its layout. Try manually emptying the trash.');
    return;
  }
  
  console.log('Found empty trash button, clicking...');
  emptyTrashBtn.click();
  
  await sleep(1000);
  
  // Wait for and click the confirmation button in the dialog
  // Google Photos usually shows a confirmation dialog
  const confirmBtn = await waitForElement('button[data-mdc-dialog-button-default], button[autofocus], div[role="dialog"] button:last-child', CONFIRMATION_DIALOG_TIMEOUT);
  
  if (confirmBtn) {
    console.log('Found confirmation button, clicking...');
    confirmBtn.click();
    
    // Wait for the action to complete
    await sleep(ACTION_COMPLETION_DELAY);
    
    showSuccess();
  } else {
    // Maybe there was no confirmation dialog and it worked directly
    await sleep(PAGE_LOAD_DELAY);
    showSuccess();
  }
}

// Export the onExecute function for the loader
export function onExecute(options) {
  // options contains { perf: { injectTime, loadTime } } from the loader
  // Check if we're on the trash page with empty_trash parameter
  if (window.location.href.includes('?empty_trash') || window.location.href.includes('&empty_trash')) {
    // Wait for page to load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(emptyTrash, 1500);
      });
    } else {
      setTimeout(emptyTrash, 1500);
    }
  }
}

