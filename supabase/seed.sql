-- Seed the exercise catalog with the 5 exercises from the original prototype.
-- Mirrors src/lib/data.ts (initialExercisesData). Run after the 0001 migration.

insert into public.exercises (name, sets, rest, muscle, image_url, color, muscles, description, benefits)
values
  (
    'Press de Banca', '4 x 12', '90s', 'Pecho',
    'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&h=400&fit=crop',
    'from-emerald-500/20 to-cyan-500/20',
    array['Pectoral Mayor', 'Tríceps', 'Deltoides Anterior'],
    'Mantén la espalda recta y el core contraído. Baja la barra controladamente hasta tocar el pecho medio. Empuja explosivamente hacia arriba sin bloquear los codos.',
    'Desarrolla el grosor del pecho y mejora la fuerza de empuje para deportes de contacto. Aumenta la masa muscular del torso superior.'
  ),
  (
    'Aperturas con Mancuerna', '3 x 15', '60s', 'Pectoral',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop',
    'from-cyan-500/20 to-blue-500/20',
    array['Pectoral Mayor', 'Deltoides Anterior'],
    'Acuéstate en el banco con los pies firmes. Abre los brazos en arco manteniendo una ligera flexión en los codos. Siente el estiramiento en el pecho y contrae al subir.',
    'Aísla el pectoral mayor mejorando la definición y amplitud del pecho. Excelente ejercicio para la fase de hipertrofia y estética.'
  ),
  (
    'Press Inclinado', '4 x 10', '90s', 'Pecho Superior',
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop',
    'from-emerald-500/20 to-teal-500/20',
    array['Pectoral Superior', 'Deltoides Anterior', 'Tríceps'],
    'Ajusta el banco a 30-45 grados. Retrae las escápulas y mantén los codos a 45 grados del torso. Empuja hacia arriba enfocando la contracción en el pecho superior.',
    'Construye la parte superior del pecho para un físico equilibrado y poderoso. Mejora la postura y la fuerza en movimientos de empuje.'
  ),
  (
    'Fondos en Paralelas', '3 x 12', '75s', 'Tríceps',
    'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600&h=400&fit=crop',
    'from-violet-500/20 to-cyan-500/20',
    array['Tríceps', 'Pectoral Inferior', 'Deltoides Anterior'],
    'Inclínate ligeramente hacia adelante para activar el pecho. Baja hasta que los codos formen 90 grados. Empuja hacia arriba manteniendo el core tenso y sin balanceo.',
    'Ejercicio compuesto que desarrolla masa en pecho inferior y tríceps simultáneamente. Mejora la fuerza funcional del tren superior.'
  ),
  (
    'Extensión de Tríceps', '3 x 15', '60s', 'Tríceps',
    'https://images.unsplash.com/photo-1581009137042-c552e485697a?w=600&h=400&fit=crop',
    'from-emerald-500/20 to-lime-500/20',
    array['Tríceps (Cabeza Larga)', 'Tríceps (Lateral)'],
    'Mantén los codos fijos apuntando al techo. Extiende los brazos completamente contrayendo el tríceps. Baja controladamente sintiendo el estiramiento en la cabeza larga.',
    'Aísla la cabeza larga del tríceps para mayor volumen y definición. Fundamental para lograr brazos grandes y simétricos.'
  );
