import {
  siReact, siNextdotjs, siTypescript, siTailwindcss, siFramer, siFigma, siPhp, siNodedotjs, siPython,
  siMysql, siSupabase, siGoogle, siIeee, siGmail, siGithub, siWhatsapp, siPostgresql, siChartdotjs, siFlutter, siGit, siWordpress, siBrevo, siCplusplus, siFlask,
} from 'simple-icons';

type L = { p: string; c: string; inv?: boolean };
const f = (i: { path: string; hex: string }, inv = false): L => ({ p: i.path, c: '#' + i.hex, inv });

/** skill name (as in content.ts) -> brand mark. Names with no mark fall back to a glyph. */
export const LOGOS: Record<string, L> = {
  'React': f(siReact),
  'Next.js': f(siNextdotjs, true),
  'TypeScript': f(siTypescript),
  'Tailwind CSS': f(siTailwindcss),
  'Framer Motion': f(siFramer),
  'Figma': f(siFigma),
  'PHP': f(siPhp),
  'Node.js': f(siNodedotjs),
  'Python': f(siPython),
  'MySQL': f(siMysql),
  'Supabase': f(siSupabase),
  'PostgreSQL': f(siPostgresql),
  'Chart.js': f(siChartdotjs),
  'Flutter / Dart': f(siFlutter),
  'Git / GitHub': f(siGit),
  'WordPress': f(siWordpress),
  'Brevo API': f(siBrevo),
  'C++': f(siCplusplus),
  'Flask': f(siFlask, true),
};

/** certificate issuers (LinkedIn has no brand mark in the icon set; it uses the in-glyph tile) */
export const ISSUERS: Record<string, L> = { 'Google': f(siGoogle), 'IEEE': f(siIeee) };

/** contact brand marks (LinkedIn path is the standard 'in' mark) */
export const BRANDS: Record<string, { p: string; bg: string; fg: string }> = {
  mail: { p: siGmail.path, bg: '#ffffff', fg: '#EA4335' },
  linkedin: { p: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', bg: '#0A66C2', fg: '#ffffff' },
  github: { p: siGithub.path, bg: '#181717', fg: '#ffffff' },
  whatsapp: { p: siWhatsapp.path, bg: '#25D366', fg: '#ffffff' },
};
