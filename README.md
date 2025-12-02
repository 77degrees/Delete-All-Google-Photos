# 🗑️ Delete All Google Photos Chrome Extension

A powerful Chrome extension that automates bulk deletion of your Google Photos. Since Google doesn't provide a native way to delete all photos at once, this extension fills that gap with an easy-to-use interface.

## ✨ Features

- **🚀 Bulk Delete**: Automatically selects and deletes multiple photos at once
- **🗑️ Empty Trash**: One-click button to automatically empty your Google Photos trash
- **📊 Progress Tracking**: Real-time counter showing how many photos have been deleted
- **💾 Resume Support**: If interrupted, you can resume deletion from where you left off
- **🔒 Privacy First**: No data is collected or transmitted - everything runs locally in your browser
- **🎨 Modern UI**: Clean, intuitive interface with visual feedback

## 📥 Installation

### Manual Installation (Developer Mode)

1. **Download the extension**
   - Clone this repository or download the ZIP file
   - Extract the files if downloaded as ZIP

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/` in your Chrome browser
   - Or go to Menu → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the `extension` folder from this repository

## 🎯 Usage

### Starting the Deletion Process

1. **Open the Extension**
   - Click on the extension icon in your Chrome toolbar
   - You'll see the main popup with a "Delete all photos" button

2. **Start Deletion**
   - Click the "🗑️ Delete all photos" button
   - A new tab will open with Google Photos

3. **Confirm Deletion**
   - Review the confirmation dialog showing the account that will be affected
   - Click "Yes, delete" to proceed

4. **Monitor Progress**
   - The extension shows a real-time count of photos being deleted
   - A progress indicator keeps you informed of the deletion status

5. **Empty Trash**
   - After deletion completes, click the "🗑️ Empty Trash Now" button
   - The extension will automatically navigate to your trash and empty it
   - Alternatively, you can manually go to Google Photos Trash and click "Empty trash"

### Progress Tracking

The extension displays:
- **📊 Photos Deleted Counter**: Shows the total number of photos moved to trash
- **⏳ Status Indicator**: Visual feedback during the deletion process
- **✅ Success Screen**: Confirmation when deletion is complete with an "Empty Trash" button

## ⚠️ Important Notes

### Before You Start

- **📁 Backup First**: Make absolutely sure you have backed up any photos you want to keep
- **⏰ 60-Day Grace Period**: Deleted photos go to trash and are permanently removed after 60 days
- **🌐 Google Photos Only**: This extension only works with Google Photos (photos.google.com)
- **🖥️ Keep Tab Open**: Don't close the deletion tab while the process is running

### Privacy & Security

This extension:
- ✅ Does NOT collect any personal data
- ✅ Does NOT transmit any information externally
- ✅ Runs entirely in your browser
- ✅ Only automates clicks you would make manually

## 🔐 Permissions

This extension requires minimal permissions:

| Permission | Purpose |
|------------|---------|
| **Storage** | Save progress and settings locally |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the terms included in the LICENSE file.

## ❓ FAQ

**Q: Can I stop and resume the deletion process?**
A: Yes! If you close the tab or stop the process, you can resume later by clicking the extension icon again.

**Q: Will this permanently delete my photos?**
A: Photos are first moved to Google Photos trash. They will be permanently deleted after 60 days, or you can manually empty the trash.

**Q: Does this work with shared albums?**
A: The extension deletes photos from your personal library. Shared albums may have different behavior based on Google Photos' sharing settings.

**Q: How many photos can it delete?**
A: The extension can delete all photos in your Google Photos library, though very large libraries may take some time.
