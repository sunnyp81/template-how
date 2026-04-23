// Satori element-tree format (no JSX required — avoids runtime JSX issues in Node integration)

interface Props {
  title: string;
  category?: string;
}

type SatoriNode = {
  type: string;
  props: { style?: Record<string, unknown>; children?: SatoriNode | SatoriNode[] | string | null };
};

const div = (style: Record<string, unknown>, children: (SatoriNode | string | null)[]): SatoriNode => ({
  type: 'div',
  props: { style, children: children.filter(Boolean) as (SatoriNode | string)[] }
});

const span = (style: Record<string, unknown>, text: string): SatoriNode => ({
  type: 'span',
  props: { style, children: text }
});

export function buildOgTree({ title, category }: Props): SatoriNode {
  return div(
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#FAF7F2',
      padding: '80px',
      fontFamily: 'Inter',
      justifyContent: 'space-between'
    },
    [
      // Header: logo mark + wordmark
      div({ display: 'flex', alignItems: 'center', gap: '12px' }, [
        div(
          {
            width: '40px',
            height: '40px',
            backgroundColor: '#0F1B3D',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF7F2',
            fontSize: '24px',
            fontWeight: 700
          },
          ['T']
        ),
        div({ display: 'flex', alignItems: 'center', fontSize: '26px' }, [
          span({ color: '#0F1B3D', fontWeight: 700 }, 'Template'),
          span({ color: '#D97706' }, '.'),
          span({ color: '#9A9084' }, 'how')
        ])
      ]),
      // Main content block
      div({ display: 'flex', flexDirection: 'column', gap: '24px' }, [
        category
          ? span(
              {
                fontSize: '22px',
                color: '#9A9084',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              },
              category
            )
          : null,
        span(
          {
            fontSize: title.length > 40 ? '56px' : '68px',
            color: '#0F1B3D',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          },
          title
        )
      ]),
      // Footer tagline
      div({ display: 'flex', alignItems: 'center', fontSize: '20px', color: '#4B463E' }, [
        span({}, 'US + UK templates · cited sources · last-verified dates')
      ])
    ]
  );
}
