// wrap-latex.ts
import { API, FileInfo, JSXText } from 'jscodeshift';
import { NodePath } from 'ast-types/lib/node-path';   // 👈 nuovo import

export default function wrapLatex(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  root
    .find<JSXText>(j.JSXText)
    .forEach((path: NodePath<JSXText>) => {
      const raw = path.value.value;
      if (!/\$\$[^$]+\$\$/.test(raw)) return;

      const parts = raw
        .split(/(\$\$[^$]+\$\$)/g)
        .filter(Boolean) as string[];

      const nodes = parts.map((part: string) => {
        if (/^\$\$[^$]+\$\$$/.test(part)) {
          const formula = part.slice(2, -2).trim();
          return j.jsxElement(
            j.jsxOpeningElement(j.jsxIdentifier('MathBlock'), []),
            j.jsxClosingElement(j.jsxIdentifier('MathBlock')),
            [j.jsxExpressionContainer(j.stringLiteral(formula))]
          );
        }
        return j.jsxText(part);
      });

      // se più nodi, jscodeshift vuole un array
      j(path).replaceWith(nodes.length === 1 ? nodes[0] : (nodes as any));
    });

  return root.toSource({ quote: 'single' });
}
