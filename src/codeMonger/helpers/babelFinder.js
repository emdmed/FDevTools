import fs from "fs"
import path from "path"
// Babel utilities
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
// Utility to recursively find .jsx and .tsx files
export function findReactFiles(dir) {
    const files = fs.readdirSync(dir);
    let reactFiles = [];

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            reactFiles = reactFiles.concat(findReactFiles(fullPath));
        } else if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
            reactFiles.push(fullPath);
        }
    }

    return reactFiles;
}


const addOrModifyClass = ({ newTarget, classNameAttr, path }) => {
    if (newTarget && newTarget.attributes.class) {
        console.log("modify class")
        classNameAttr.value.value = newTarget.attributes.class
    } else {
        path.node.openingElement.attributes.push({
            type: 'JSXAttribute',
            name: { type: 'JSXIdentifier', name: 'className' },
            value: { type: 'StringLiteral', value: newTarget.attributes.class },
        });
    }

    let modified = true;
    path.stop();
    return { modified }
}

const writeModifedCode = ({ ast, filePath }) => {
    const updatedCode = generate(ast).code;
    fs.writeFileSync(filePath, updatedCode, "utf-8");
    return updatedCode;
}

// Function to parse and traverse React code
export function findReactElementInCode(code, target, newTarget, filePath) {
    try {

        const ast = parse(code, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
        });

        traverse(ast, {
            JSXElement(path) {
                const elementName = path.node.openingElement.name.name;

                if (elementName === target.tagName) {

                    let classNameAttr = path.node.openingElement.attributes.filter(attr => attr.name.name === "className")[0] || false

                    console.log("classNameAttr", classNameAttr, "attributes.class", target.attributes.class)

                    const classNameMatch = classNameAttr.value.value === target.attributes.class

                    const idAttribute = path.node.openingElement.attributes.find(
                        (attr) => attr.name && attr.name.name === "id"
                    );

                    const idMatch = idAttribute?.value?.value === target.attributes.id

                    const innerHTMLMatch = path.node.openingElement.innerHtml === target.innerHtml

                    if (idMatch) {
                        const { modified } = addOrModifyClass({ newTarget, classNameAttr, path, code })

                        if (modified) {
                            console.log("Found and modified code")
                            writeModifedCode({ ast, code, filePath })
                        } else {
                            console.log("No matching element found.");
                            return code
                        }
                    }

                    if (innerHTMLMatch && classNameMatch) {
                        const { modified } = addOrModifyClass({ newTarget, classNameAttr, path, code })

                        if (modified) {
                            console.log("Found and modified code")
                            writeModifedCode({ ast, code, filePath })
                        } else {
                            console.log("No matching element found.");
                            return code
                        }
                    }

                }
            },
        });

    } catch (err) {
        console.error('Error parsing code:', err);
        return null;
    }
}

