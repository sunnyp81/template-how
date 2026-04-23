import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TemplateBuilder } from '../../../src/components/builders/TemplateBuilder';
import type { BuilderSchema } from '../../../src/lib/builder/schema';

const schema: BuilderSchema = {
  slug: 'demo',
  title: 'Demo Doc',
  renderer: 'legal-document',
  sections: [
    {
      id: 's1',
      heading: 'Section 1',
      fields: [
        { id: 'name', label: 'Name', type: 'text', required: true }
      ]
    }
  ]
};

describe('TemplateBuilder', () => {
  beforeEach(() => window.localStorage.clear());

  it('renders form, preview, and export bar', () => {
    render(<TemplateBuilder schema={schema} />);
    // 'Section 1' renders in both the form legend and the preview h2
    expect(screen.getAllByText('Section 1').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Demo Doc')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download PDF/i })).toBeInTheDocument();
  });

  it('reflects field input in the preview live', () => {
    render(<TemplateBuilder schema={schema} />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Sunny' } });
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });
});
