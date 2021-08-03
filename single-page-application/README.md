# SINGLE PAGE APPLICATION EXAMPLE

## WHAT WE TRY TO ACHIEVE

We will deploy the ReactJS application to the Azure storage account and we will serve it to the browser from the storage account's container data storage. For more information please read [Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static) documentation.

## STACK

* [ReactJS](https://create-react-app.dev/docs/getting-started)
* [Terraform CLI](https://learn.hashicorp.com/tutorials/terraform/infrastructure-as-code)
* [Terraform CDK](https://github.com/hashicorp/terraform-cdk)

## HOW TO START

* [Install terraform cli](https://learn.hashicorp.com/tutorials/terraform/install-cli)
* Install node modules `npm install`
* Create `.env` file based on `.env.example`
* Get provider's libraries `npm run cdk:get`

## LOCAL DEVELOPMENT (UI)

* Run command `npm run start` in terminal

## DEPLOYMENT TO AZURE

* Build UI `npm run build`
* Build CDK stack `npm run cdk:build`
* Deploy changes `npm run cdk:deploy`
