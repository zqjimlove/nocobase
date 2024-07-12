/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { CollectionTemplate, ICollectionTemplate, getConfigurableProperties } from '@nocobase/client';

export class BasicCollectionTemplate extends CollectionTemplate {
  name = 'BasicCollection';
  title = '{{t("Basic template")}}';
  order = 2;
  color = 'orange';
  default = {
    createdBy: true,
    updatedBy: true,
    createdAt: true,
    updatedAt: true,
    sortable: true,
    autoGenId: true,
    fields: [
      {
        name: 'enable',
        type: 'boolean',
        primaryKey: false,
        allowNull: false,
        uiSchema: {
          type: 'boolean',
          'x-component': 'Checkbox',
          title: '是否启用',
        },
        defaultValue: true,
        interface: 'checkbox',
      },
      {
        name: 'env',
        type: 'array',
        uiSchema: {
          enum: [
            {
              value: 'stag',
              label: '测试',
              color: 'default',
            },
            { value: 'gray', label: '灰度', color: 'blue' },
            { value: 'prod', label: '生产', color: 'red' },
          ],
          type: 'string',
          'x-component': 'Checkbox.Group',
          title: '上线环境',
        },
        interface: 'checkboxGroup',
      },
    ],
  };
  availableFieldInterfaces = {
    include: [],
  };
  configurableProperties = getConfigurableProperties(
    'title',
    'name',
    'inherits',
    'category',
    'description',
    'presetFields',
    'sortable',
  );
}

export class BasicTreeCollectionTemplate extends CollectionTemplate {
  name = 'BasicTreeCollection';
  title = '{{t("Basic Tree template")}}';
  order = 2;
  color = 'orange';
  default = {
    tree: 'adjacencyList',
    createdBy: true,
    updatedBy: true,
    createdAt: true,
    updatedAt: true,
    sortable: true,
    autoGenId: true,
    fields: [
      {
        interface: 'integer',
        name: 'parentId',
        type: 'bigInt',
        isForeignKey: true,
        uiSchema: {
          type: 'number',
          title: '{{t("Parent ID")}}',
          'x-component': 'InputNumber',
          'x-read-pretty': true,
        },
      },
      {
        interface: 'm2o',
        type: 'belongsTo',
        name: 'parent',
        foreignKey: 'parentId',
        treeParent: true,
        onDelete: 'CASCADE',
        uiSchema: {
          title: '{{t("Parent")}}',
          'x-component': 'AssociationField',
          'x-component-props': {
            // mode: 'tags',
            multiple: false,
            fieldNames: {
              label: 'id',
              value: 'id',
            },
          },
        },
      },
      {
        interface: 'o2m',
        type: 'hasMany',
        name: 'children',
        foreignKey: 'parentId',
        treeChildren: true,
        onDelete: 'CASCADE',
        uiSchema: {
          title: '{{t("Children")}}',
          'x-component': 'AssociationField',
          'x-component-props': {
            // mode: 'tags',
            multiple: true,
            fieldNames: {
              label: 'id',
              value: 'id',
            },
          },
        },
      },
      {
        name: 'enable',
        type: 'boolean',
        primaryKey: false,
        allowNull: false,
        uiSchema: {
          type: 'boolean',
          'x-component': 'Checkbox',
          title: '是否启用',
        },
        defaultValue: true,
        interface: 'checkbox',
      },
      {
        name: 'env',
        type: 'array',
        uiSchema: {
          enum: [
            {
              value: 'stag',
              label: '测试',
              color: 'default',
            },
            { value: 'gray', label: '灰度', color: 'blue' },
            { value: 'prod', label: '生产', color: 'red' },
          ],
          type: 'string',
          'x-component': 'Checkbox.Group',
          title: '上线环境',
        },
        interface: 'checkboxGroup',
      },
    ],
  };
  availableFieldInterfaces = {
    include: [],
  };
  configurableProperties = getConfigurableProperties(
    'title',
    'name',
    'inherits',
    'category',
    'description',
    'presetFields',
    'sortable',
  );
  events = {
    beforeSubmit(values) {
      if (Array.isArray(values?.fields)) {
        values?.fields.map((f) => {
          f.target = values.name;
        });
      }
    },
  };
}
