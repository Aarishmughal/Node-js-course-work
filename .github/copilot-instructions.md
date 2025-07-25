# Copilot Instructions for Node Farm Project

## Project Overview

-   This is a Node.js server-side project for serving dynamic HTML pages and a JSON API, based on the Node.js Bootcamp course.
-   The main entry point is `02 - Node Farm/index.js`.
-   Templates for HTML rendering are in `02 - Node Farm/templates/`.
-   Product data is loaded from `02 - Node Farm/dev-data/data.json`.
-   Utility functions (e.g., template replacement) are in `02 - Node Farm/modules/`.

## Key Architectural Patterns

-   **Synchronous file loading**: All templates and data are loaded synchronously at server startup (not per request) for performance and simplicity.
-   **Routing**: The server uses manual routing based on the request pathname (e.g., `/`, `/overview`, `/product`, `/api`).
-   **Template replacement**: The `replaceTemplates.js` module is used to inject product data into HTML templates using custom placeholders (e.g., `{%PRODUCT_CARDS%}`).
-   **No frameworks**: The project uses only built-in Node.js modules (`fs`, `http`, `url`).

## Developer Workflows

-   **Start the server**: Run `node index.js` from the `02 - Node Farm` directory. The server listens on `localhost:8000`.
-   **Edit templates**: Update HTML files in `templates/` to change the UI. Use `{%PLACEHOLDER%}` syntax for dynamic content.
-   **Add/modify data**: Edit `dev-data/data.json` for product data. The server must be restarted to pick up changes.
-   **Debugging**: Use `console.log` for debugging. No test or build scripts are present.

## Project-Specific Conventions

-   **File paths**: Always use `__dirname` for absolute paths when reading files (see `index.js`).
-   **Response types**: Set correct `Content-Type` headers for HTML and JSON responses.
-   **404 handling**: All unknown routes return a styled HTML error message.
-   **No hot reload**: Manual server restart is required after code or data changes.

## Key Files & Directories

-   `index.js`: Main server logic and routing
-   `modules/replaceTemplates.js`: Template string replacement logic
-   `templates/`: HTML templates with placeholders
-   `dev-data/data.json`: Product data (array of objects)
-   `txt/`: Used for file system exercises (not part of main app)

## Example: Adding a New Route

1. Add a new `else if (pathname === "/newroute")` block in `index.js`.
2. Set appropriate headers and response body.

---

For more details, see `Readme.md` for module usage and code snippets.
