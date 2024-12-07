import fs from "fs"
import path from "path"

import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

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

    if (classNameAttr?.value && classNameAttr?.value?.value || classNameAttr?.value?.value === "") {
        classNameAttr.value.value = newTarget.attributes.class
    } else {
        path.node.openingElement.attributes.push({
            type: 'JSXAttribute',
            name: { type: 'JSXIdentifier', name: 'className' },
            value: { type: 'StringLiteral', value: newTarget.attributes.class },
        });
    }

    let modified = true;
    return { modified }
}

const writeModifedCode = ({ ast, filePath }) => {
    const updatedCode = generate(ast).code;
    fs.writeFileSync(filePath, updatedCode, "utf-8");
    return updatedCode;
}

const innerHtmlMatch = (babelElement, target) => {

    const children = babelElement.children
    const babelElementInnerHtml = children
        .filter((child) => child.type === "JSXText")
        .map((child) => child.value)
        .join("");

    if (babelElementInnerHtml.trim() === target.innerHTML.trim()) return true

    return false
}

const classMatch = (babelElement, target) => {
    let classNameAttr = babelElement.attributes.filter(attr => attr.name.name === "className")[0] || false

    if (!classNameAttr?.value?.value && !target?.attributes?.class) return { classNameMatch: true, classNameAttr }

    if (classNameAttr?.value?.value === target?.attributes?.class) return { classNameMatch: true, classNameAttr }

    return { classNameMatch: false, classNameAttr }
}

const idMatch = (babelElementId, target) => {
    if (!babelElementId && !target.attributes.id) return false
    if (babelElementId === target.attributes.id) return true
}

export function findReactElementInCode(code, target, newTarget, filePath) {

    try {
        let modifiedCodeSuccesfully = false
        const ast = parse(code, {
            sourceType: 'module',
            plugins: ['jsx', 'typescript'],
        });

        traverse(ast, {
            JSXElement(path) {
                const elementName = path.node.openingElement.name.name;

                if (elementName === target.tagName) {
                    const { classNameMatch, classNameAttr } = classMatch(path.node.openingElement, target)

                    const idAttribute = path.node.openingElement.attributes.find(
                        (attr) => attr.name && attr.name.name === "id"
                    );

                    const idMatched = idMatch(idAttribute, target)

                    const innerHTMLMatch = innerHtmlMatch(path.node, target)


                    if (idMatched) {
                        const { modified } = addOrModifyClass({ newTarget, classNameAttr, path, code })

                        if (modified) {
                            writeModifedCode({ ast, code, filePath })
                            modifiedCodeSuccesfully = true
                        } else {
                            modifiedCodeSuccesfully = true
                        }

                        path.stop();

                    } else if (innerHTMLMatch && classNameMatch) {
                        const { modified } = addOrModifyClass({ newTarget, classNameAttr, path, code })

                        if (modified) {
                            writeModifedCode({ ast, code, filePath })
                            modifiedCodeSuccesfully = true
                        } else {
                            modifiedCodeSuccesfully = true
                        }
                        path.stop();
                    } else if (innerHTMLMatch) {
                        const { modified } = addOrModifyClass({ newTarget, classNameAttr, path, code })

                        if (modified) {
                            writeModifedCode({ ast, code, filePath })
                            modifiedCodeSuccesfully = true
                        } else {
                            modifiedCodeSuccesfully = true
                        }
                        path.stop();
                    }


                }
            },
        });
        return modifiedCodeSuccesfully
    } catch (err) {
        console.error('Error parsing code:', err);
        return false;
    }
}

