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

    console.log("reactFiles", reactFiles)
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
                console.log("elementName", elementName)
                if (elementName === tagName) {
                    const attrMatches = path.node.openingElement.attributes.every(attr => {
                        const key = attr.name.name;
                        const value = attr.value.value || '';
                        return attributes[key] === value;
                    });

                    const innerTextMatches = path.node.children.some(child => {
                        return (
                            child.type === 'JSXText' &&
                            child.value.trim() === innerText.trim()
                        );
                    });

                    if (attrMatches && innerTextMatches) {
                        foundCode = code.slice(
                            path.node.start,
                            path.node.end
                        );
                        path.stop(); // Stop traversal once we find a match
                    }
                }
            },
        });

        return foundCode;
    } catch (err) {
        console.error('Error parsing code:', err);
        return null;
    }
}

