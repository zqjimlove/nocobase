/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React, { FC } from 'react';

import { SchemaComponentOptions } from '@nocobase/client';
import RemixIconPicker from './RemixIconPicker';

export const RemixIconPickerFieldProvider: FC = (props) => {
  return (
    <SchemaComponentOptions
      components={{
        RemixIconPicker,
      }}
    >
      {props.children}
    </SchemaComponentOptions>
  );
};
