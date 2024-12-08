
# FDevTools

Mini dev-tools in a context menu within your React UI


## Installation

Install my-project with npm

```bash
  npm i fdevtools
```
Import fdevtools and styles

```bash
  import FDevTools from "fdevtools";
  import "fdevtools/dist/styles.css"
```
If you want the code modifying feature add this to your "start dev server" script

Vite
```json
"dev": "node node_modules/fdevtools/dist/codeMonger/index.cjs & vite",
```
NextJS
```json
"dev": "node node_modules/fdevtools/dist/codeMonger/index.cjs & next dev",
```
This will start a local node server that will modify the code in your project when requested

If you don't want the code modifying feature set the disableCodemonger prop to true

```javascript
    <FDevTools disableCodemonger={true}>
      <App />
    </FDevTools>
```


Add FDevTools to you React or NextJS project

```javascript
  createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FDevTools>
      <App />
    </FDevTools>
  </StrictMode>
);

```

The context menu should open when "control + right clicking" on any element 
## Tailwind

Tailwind won't load all classes when your dev server is started. To fix this you will need to update your tailwind.config.js file and add

```javascript
  safelist: [
    { pattern: /.*/ }, // Include all tailwind classes
  ],
```

Making this modification will make your dev server first load slower since it has to load all existing Tailwind classes.
## Screenshots

Hold ctrl key to highlight elements

![App Screenshot](https://i.imgur.com/Rp2ypHJ.png)

Ctrl + right click will open the context menu

Press the paper and pen icon next to "Classes" to edit them

![App Screenshot](https://i.imgur.com/UBAbe80.png)

Adding classes into the input separated by space and pressing enter will add them to the selected element in the DOM. Existing or added classes can be deleted by just clicking on them.

Out of editing mode clicking on a class will copy it to the clipboard

![App Screenshot](https://i.imgur.com/T91Yz1n.png)
