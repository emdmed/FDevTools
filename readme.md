
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
## Screenshots

![App Screenshot](https://i.imgur.com/gNVUN3i.png)

