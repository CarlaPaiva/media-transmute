# MediaTransmute

MediaTransmute is an open-source, client-side media converter that runs entirely in your browser.
It allows converting video files to multiple formats (MP4, GIF, AVI, WMV, MP3) without uploading files to a server.
All processing happens locally on the user’s device.

## Motivation
Many online media converters impose limitations such as:

* Daily conversion limits
* File count restrictions
* Watermarks
* Paid subscriptions

MediaTransmute was created as an experiment to explore whether a modern browser, combined with WebAssembly and FFmpeg, could handle common media conversions privately and without artificial limits.
It is also a learning-focused project and an open space for collaboration.

## How it works

* Uses FFmpeg (WASM) to process media files
* All conversions happen client-side
* No files are uploaded, stored, or sent to any backend
* No accounts, no tracking beyond basic anonymous analytics

## Supported conversions

Currently supported:

* Video → MP4
* Video → GIF
* Video → AVI
* Video → WMV
* Video → MP3

More formats and conversion paths are planned.

## Roadmap

This project is intentionally evolving. Planned ideas include:

* Audio → audio conversions
* Additional output formats
* Improved format detection
* Better error handling and progress feedback
* Internal refactoring of the conversion pipeline

Suggestions and contributions are welcome.

## Tech stack

* Vite (React)
* ffmpeg core
* AntDesign

## Running the project locally
To be able to run this project you must have an environment with Node and NPM installed. Then, follow those steps:


1. Clone the project

`git clone https://github.com/CarlaPaiva/media-transmute.git`

3. Go to the project dir
   
`cd media-transmute`

5. Install dependencies
   
`npm install`

7. Run the project
   
`npm run dev`

## Contributing
MediaTransmute is an open-source project and contributions are welcome.

- Bug fixes and improvements are encouraged
- Feature ideas should be discussed via GitHub Issues before opening a PR
- Beginner-friendly contributions are welcome

Support and maintenance are provided on a best-effort basis, when time allows.

## License
This project is licensed under the terms of the MIT license.
