'use client';

import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

type Props = { children: string };

export default function MathBlock({ children }: Props) {
  // <BlockMath> renderizza in modalità display
  return <BlockMath math={children} errorColor="#cc0000" />;
}
