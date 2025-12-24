# Tech-Scraper

## What is Tech-Scraper?

Tech-Scraper is a Chrome extension that helps you identify the technologies used to build websites. It analyzes the current webpage and detects frameworks, libraries, CMS systems, analytics tools, and more.

## How it Works

The extension injects a content script into web pages that scans for common technology fingerprints, including:

- JavaScript libraries and frameworks (React, Vue, Angular, etc.)
- CSS frameworks (Bootstrap, Tailwind, etc.)
- Analytics tools (Google Analytics, Matomo, etc.)
- Content Management Systems (WordPress, Shopify, etc.)
- Build tools and other development technologies

It uses DOM analysis, script detection, and meta tag inspection to provide a comprehensive list of detected technologies with confidence levels.

## Installation

1. Download the latest release ZIP file (`dist.zip`) from the [Releases](https://github.com/yourusername/tech-scraper/releases) page.
2. Unzip the downloaded file to a folder on your computer.
3. Open Chrome and go to `chrome://extensions/`.
4. Enable "Developer mode" in the top right corner.
5. Click "Load unpacked" and select the folder containing the unzipped extension files.
6. The Tech-Scraper extension should now be installed and ready to use.

To use the extension, click the extension icon in your browser toolbar while on any HTTPS website, then click "Scan for Technologies".
