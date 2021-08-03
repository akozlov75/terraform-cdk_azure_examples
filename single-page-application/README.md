# SINGLE PAGE APPLICATION EXAMPLE

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
