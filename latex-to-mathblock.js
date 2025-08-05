/**
 * Trasforma i blocchi $$…$$ in <MathBlock>{'…'}</MathBlock>.
 * 1. Tenta il parse AST. Se fallisce, rimodella la sorgente via regex.
 * 2. Aggiunge l'import di MathBlock se assente.
 *
 * Uso:
 *   npx jscodeshift -t latex-to-mathblock.js src/components \
 *       --parser=tsx --extensions=tsx,ts
 */

const PATH_IMPORT = 'components/ui/MathBlock';

function addImportIfMissing(src) {
  return src.includes(PATH_IMPORT)
    ? src
    : `import MathBlock from '${PATH_IMPORT}';\n` + src;
}

function textReplace(source) {
  // sostituisci tutti i blocchi $$…$$ con il componente
  const replaced = source.replace(/\$\$\s*([\s\S]*?)\s*\$\$/g, (_m, formula) => {
    const escaped = formula.replace(/\\/g, '\\\\').trim();
    return `<MathBlock>{'${escaped}'}</MathBlock>`;
  });
  return addImportIfMissing(replaced);
}

module.exports = function (fileInfo, api) {
  const j = api.jscodeshift.withParser('tsx');
  try {
    // 1️⃣ prova il parse AST normale
    const root = j(fileInfo.source);

    // 2️⃣ se riesce, usa la versione AST già vista…
    let modified = false;

    root.find(j.JSXText).forEach(path => {
      const txt = path.value.value;
      const m = txt.match(/^\s*\$\$\s*([\s\S]*?)\s*\$\$\s*$/);
      if (!m) return;

      const formula = m[1];
      const escaped = formula.replace(/\\/g, '\\\\');
      const mathNode = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('MathBlock'), [], false),
        j.jsxClosingElement(j.jsxIdentifier('MathBlock')),
        [j.jsxExpressionContainer(j.stringLiteral(escaped))]
      );
      j(path).replaceWith(mathNode);
      modified = true;
    });

    if (!modified) return null; // nessuna modifica

    const output = root.toSource({ quote: 'single' });
    return addImportIfMissing(output);
  } catch (e) {
    // ❗ Fallback regex: il parser è saltato per i backslash
    return textReplace(fileInfo.source);
  }
};
