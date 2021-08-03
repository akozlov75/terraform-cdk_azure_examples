import dotenv from 'dotenv'
import path from 'path'
import mime from 'mime-types'
import { Construct } from 'constructs'
import {
  App,
  TerraformOutput,
  TerraformStack,
} from 'cdktf'
import md5file from 'md5-file'

import {
  AzurermProvider,
  ResourceGroup,
  StorageAccount,
  StorageBlob,
} from './.gen/providers/azurerm'

const readdir = require('@folder/readdir') // eslint-disable-line @typescript-eslint/no-var-requires

interface FileProps {
  name: string;
  depth: number;
  cwd: string;
  base: string;
  folder: string | null;
  dirname: string;
  path: string;
  relative: string;
}

dotenv.config({
  path: '../.env'
})

const subscriptionId = process.env.SUBSCRIPTION_ID || ''
const uiBasePath = path.resolve('../build')

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name)

    /** Provider to use */
    new AzurermProvider(
      this,
      'AzureProviderTest',
      {
        features: [{}],
        subscriptionId,
      }
    )

    /** Create resource group account */
    const resourceGroup = new ResourceGroup(
      this,
      'ResourceGroupTest',
      {
        location: 'westeurope',
        name: 'ResourceGroupTest',
      }
    )

    /** Create storage account */
    const storageAccount = new StorageAccount(
      this,
      'StorageAccountTest',
      {
        accountReplicationType: 'LRS',
        accountTier: 'Standard',
        dependsOn: [resourceGroup],
        location: resourceGroup.location,
        minTlsVersion: 'TLS1_2',
        name: 'StorageAccountTest'.toLowerCase(),
        resourceGroupName: resourceGroup.name,
        staticWebsite: [{
          error404Document: 'index.html',
          indexDocument: 'index.html',
        }],
      }
    )

    readdir
      .sync(uiBasePath, {
        absolute: true,
        dot: false,
        recursive: true,
        objects: true,
        nodir: true,
      })
      .forEach((file: FileProps) => {
        const {
          name,
          path,
          relative,
        } = file

        /** Create storage blob for each file */
        new StorageBlob(
          this,
          name,
          {
            contentType: mime.lookup(path) || 'text/plain',
            contentMd5: md5file.sync(path),
            dependsOn: [storageAccount],
            name: relative, // relative path with directory name
            source: path, // absolute path to file
            storageAccountName: storageAccount.name,
            storageContainerName: '$web',
            type: 'Block',
          }
        )
      })

    new TerraformOutput(
      this,
      'TerraformOutputTest',
      {
        value: {
          url: storageAccount.primaryWebEndpoint
        },
      }
    )
  }
}

const app = new App()
new MyStack(app, 'AzureStackTest')
app.synth()
