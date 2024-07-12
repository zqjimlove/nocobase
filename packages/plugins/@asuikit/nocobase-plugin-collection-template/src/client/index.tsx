/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { getConfigurableProperties, ICollectionTemplate, Plugin } from '@nocobase/client';
import { BasicCollectionTemplate, BasicTreeCollectionTemplate } from './collection-templates/BasicCollectionTemplate';
import RemixIconPicker from './remix-icon/RemixIconPicker';
import { RemixIconPickerFieldProvider } from './remix-icon/provider';

export class NocobasePluginCollectionTemplate2Client extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    console.log(this.app);

    this.app.dataSourceManager.addCollectionTemplates([BasicCollectionTemplate, BasicTreeCollectionTemplate]);

    this.app.addComponents({
      RemixIconPicker,
    });
    // this.app.addScopes({})
    this.app.addProvider(RemixIconPickerFieldProvider);
    // this.app.addProviders()
    // this.app.router.add()

    // this.app.use();
  }
}

export default NocobasePluginCollectionTemplate2Client;
