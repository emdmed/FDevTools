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
export function findReactElementInCode(code, tagName, attributes, newTarget, filePath) {
    try {


        const ast = parse(code, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
        });

        let foundCode = null;
        let modified = false



        traverse(ast, {
            JSXElement(path) {
                const elementName = path.node.openingElement.name.name;

                if (elementName === tagName) {

                    let classNameAttr = path.node.openingElement.attributes.filter(attr => attr.name.name === "className")[0] || false

                    console.log("classNameAttr", classNameAttr, "attributes.class", attributes.class)

                    const attrMatches = classNameAttr.value.value === attributes.class

                    const idAttribute = path.node.openingElement.attributes.find(
                        (attr) => attr.name && attr.name.name === "id"
                      );

                    const idMatch = idAttribute?.value?.value === attributes.id

                    if (idMatch) {
                        console.log("found element", newTarget )
                        if(newTarget && newTarget.attributes.class){
                            console.log("modify class")
                            classNameAttr.value.value = newTarget.attributes.class
                        } else {
                            path.node.openingElement.attributes.push({
                                type: 'JSXAttribute',
                                name: { type: 'JSXIdentifier', name: 'className' },
                                value: { type: 'StringLiteral', value: newTarget.attributes.class },
                            });
                        }

                        foundCode = code.slice(
                            path.node.start,
                            path.node.end
                        );
                        modified = true;
                        path.stop(); // Stop traversal once we find a match
                    }
                }
            },
        });

        if (modified) {
            // Generate the updated code
            const updatedCode = generate(ast).code;
            fs.writeFileSync(filePath, updatedCode, "utf-8");
            return updatedCode;
        } else {
            console.log("No matching element found.");
            return code; // Return the original code if no modifications were made
        }
    } catch (err) {
        console.error('Error parsing code:', err);
        return null;
    }
}

