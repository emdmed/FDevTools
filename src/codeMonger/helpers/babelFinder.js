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

// Function to parse and traverse React code
export function findReactElementInCode(code, tagName, attributes, innerText) {
    try {
        const ast = parse(code, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
        });

        let foundCode = null;

        traverse(ast, {
            JSXElement(path) {
                const elementName = path.node.openingElement.name.name;

                if (elementName === tagName) {

                    const classNameAttr = path.node.openingElement.attributes.filter(attr => attr.name.name === "className")[0] || false

                    /*                     console.log("classNameAttr", classNameAttr.value.value)
                                        console.log("payload class", attributes.class) */

                    const attrMatches = classNameAttr.value.value === attributes.class

                    //console.log("path.node.openingElement", path.node.openingElement, "attributes", attributes)
                    const idAttribute = path.node.openingElement.attributes.find(
                        (attr) => attr.name && attr.name.name === "id"
                      );

                    const idMatch = idAttribute?.value?.value === attributes.id
                    console.log("idAttribute value", idAttribute?.value?.value, "idMatch", idMatch)


                    /*       const innerTextMatches = path.node.children.some(child => {
      
                              console.log("check inner text", child, innerText)
      
                              return (
                                  child.type === 'JSXText' &&
                                  child.value.trim() === innerText.trim()
                              );
                          }); */

                    //classname attr done, innertTextMatches missing

                    if (attrMatches && idMatch) {
                        foundCode = code.slice(
                            path.node.start,
                            path.node.end
                        );
                        path.stop(); // Stop traversal once we find a match
                    }
                }
            },
        });
        console.log("foundCode", foundCode)
        return foundCode;
    } catch (err) {
        console.error('Error parsing code:', err);
        return null;
    }
}

