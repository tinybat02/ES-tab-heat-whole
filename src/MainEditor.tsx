import React, { useState } from 'react';
//@ts-ignore
import { FormField, PanelOptionsGroup } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';

import { PanelOptions } from './types';

export const MainEditor: React.FC<PanelEditorProps<PanelOptions>> = ({ options, onOptionsChange }) => {
  const [timezone, setTimezone] = useState(options.timezone);
  const handleSubmit = () => {
    onOptionsChange({ timezone });
  };
  return (
    <PanelOptionsGroup>
      <div className="editor-row">
        <div className="section gf-form-group">
          <h5 className="section-heading">Timezone Settings</h5>
          <FormField
            label="Timezone"
            labelWidth={10}
            inputWidth={40}
            type="text"
            name="timezone"
            value={timezone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimezone(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-inverse" onClick={handleSubmit}>
        Submit
      </button>
    </PanelOptionsGroup>
  );
};
