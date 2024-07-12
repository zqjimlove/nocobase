/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { useFormLayout } from '@formily/antd-v5';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { isValid } from '@formily/shared';
import { Button, Space } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as icons from '@remixicon/react';
import { StablePopover } from '@nocobase/client';

function IconField(props: any) {
  const layout = useFormLayout();
  const { value, onChange, disabled } = props;
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  const ValueIcon = icons[value];

  return (
    <div>
      <Space.Compact>
        <StablePopover
          placement={'bottom'}
          open={visible}
          onOpenChange={(val) => {
            if (disabled) {
              return;
            }
            setVisible(val);
          }}
          content={
            <div style={{ width: '26em', maxHeight: '20em', overflowY: 'auto' }}>
              {Object.keys(icons).map((key) => {
                const Icon = icons[key];
                return (
                  <span
                    data-key={key}
                    key={key}
                    style={{ fontSize: 18, marginRight: 10, cursor: 'pointer' }}
                    onClick={() => {
                      onChange(key);
                      setVisible(false);
                    }}
                  >
                    <Icon />
                  </span>
                );
              })}
            </div>
          }
          title={t('Icon')}
          trigger="click"
        >
          <Button size={layout.size as any} disabled={disabled}>
            {value ? <ValueIcon /> : t('Select icon')}
          </Button>
        </StablePopover>
        {value && !disabled && (
          <Button
            size={layout.size as any}
            icon={<CloseOutlined />}
            onClick={(e) => {
              onChange(null);
            }}
          ></Button>
        )}
      </Space.Compact>
    </div>
  );
}

export const IconPicker = connect(
  IconField,
  mapProps((props, field) => {
    return {
      ...props,
      suffix: <span>{field?.['loading'] || field?.['validating'] ? <LoadingOutlined /> : props.suffix}</span>,
    };
  }),
  mapReadPretty((props) => {
    const ValueIcon = icons[props.value];
    if (!isValid(props.value)) {
      return (
        <div>
          <ValueIcon />
        </div>
      );
    }
    return <i className={props.value} />;
  }),
);

export default IconPicker;

/* export function Provider() {
  return (
    <SchemaComponentProvider components={{ IconPicker }}>
      <SchemaComponent schema={schema} />
    </SchemaComponentProvider>
  );
}
 */
