# WSO2 B2B Organization Samples

## ⚠️ Read this first

1. The root of the sample-is repository  will be referred to `<SAMPLE_IS_HOME>` throughout this document.
2. Required versions
 ```
 Node version >= v16.16.0
 ```
 ```
 NPM version >= 8.11.0
 ```

## 1. Story

## Guardio Insurance

**Guardio** is an auto insurance service company that has many employees who use different credentials to sign in to
different internal organizational applications.

**Guardio-Business-App** and **Guardio-Admin-App** are two such applicaitons.

### Guardio-Business-App

**Guardio-Business-App** is the application that provides insurance and claims settlement capabilities for other
businesses, so that those businesses can use the software for internal requirements.

Organization **Best Car Mart** business staff needs to allow corporate users of their organization to log
into the **Guardio-Business-App** application using their corporate SSO system, to get used to the above-mentioned
capabilities
To do that, they will configure the **Guardio-Business-App** application to leverage their corporate
IdP for authentication. This will be setup through the **Guardio-Admin-App**.


### Guardio-Admin-App

**Guardio-Admin-App** is the application that provides capabilities to manage users, create roles, assign roles and
setup an identity provider for the **Guardio-Business-App**.

## 2. Setting up

### Step 1: Create an organization
Create a sub-organization named **Best Car Mart**.

### Step 2: Create applications
Now we need **two** applications to communicate with the **Guardio-Business-App** and the ****Guardio-Admin-App****.

Create two applications named **Guardio-Business-App** and **Guardio-Admin-App** [This should be a management application].

Share both applications with all the organizations by clicking the share button.

#### Step 2.1: In the Guardio-Business-App

>| Property                    |                                    Value/s                                     |
>|--------------------------|:------------------------------------------------------------------------------:|
>| Allowed Grant types      |            `Code` and `Client Credientials`             |
>| Authorized redirect URLs |  `http://localhost:3000/api/auth/callback/wso2is` and `http://localhost:3000`  |
>| Allowed origin           |            `http://localhost:3000 `             |

Also, On the User Attributes tab, click on + Add User Attributes.
Select `Email`, `First Name`, `Last Name`, and `Username` from the list of attributes.

#### Step 2.2: In the Guardio-Admin-App
>| Property                    |                                   Value/s                                    |
>|--------------------------|:----------------------------------------------------------------------------:|
>| Allowed Grant types      |           `Organization Switch`, `Code` and `Client Credientials`            |
>| Authorized redirect URLs | `http://localhost:3001/api/auth/callback/wso2isAdmin` and `http://localhost:3001` |
>| Allowed origin           |                           `http://localhost:3001`                            |

Also, On the User Attributes tab, click on + Add User Attributes.
Select `Email`, `First Name`, `Last Name`, and `Username` from the list of attributes.

### Step 3: Create a user and assign roles
You need to create new users on the sub-organizations with the required permissions.

To create a user for Best Auto Mart with permissions to create an IdP for the **Guardio-Business-App**:

* Use the Organization Switcher to change the organization to Best Auto Mart.
* Create a user named Alex on the Best Auto Mart organization.
* Create an admin role with all permissions.
* Assign Alex to this newly created Role.

### Step 4: Setup the `config.json` file
```yaml
{
  "CommonConfig": {
    "AuthorizationConfig": {
      "BaseOrganizationUrl": "<PARENT ORGANIZATION URL> ex: https://api.asgardeo.io/t/guardio"
    }
  },
  "BusinessAppConfig": {
    "AuthorizationConfig": {
      "ClientId": "<CLIENT ID OF THE BUSINESS APP>",
      "ClientSecret": "<CLIENT SECRET OF THE BUSINESS APP>"
    },
    "ApplicationConfig": {
      "HostedUrl": "http://localhost:3000",
      "APIScopes": [
        "openid",
        "email",
        "profile",
        "internal_login",...
      ],
      "Branding": {
        "name": "Guardio Insurance",
        "tag": "Anytime . Anywhere"
      }
    }
  },
  "BusinessAdminAppConfig": {
    "AuthorizationConfig": {
      "ClientId": "<CLIENT ID OF THE BUSINESS ADMIN APP>",
      "ClientSecret": "<CLIENT SECRET OF THE BUSINESS ADMIN APP>"
    },
    "ApplicationConfig": {
      "HostedUrl": "http://localhost:3001",
      "APIScopes": [
        "openid",
        "email",
        "profile",
        "internal_login", ...
      ],
      "Branding": {
        "name": "Guardio Insurance - Administrator Application",
        "tag": "Administrator Application"
      }
    },
    "ManagementAPIConfig": {
      "SharedApplicationName": "Guardio-Business-App",
      "UserStore" : "DEFAULT"
    }
  }
}
```
setup the config json file as mentioned above.

**_NOTE:_**  With the latest B2B organization management features provided by WSO2 Identity Server, the following operations are allowed in sub organization for the organization creator.

1 - onboarding enterprise IDP.
2 - Update authentication options of the shared applications.
3 - Delete the business users.

Then Guardio-Admin-App can be used to manage the sub organization instead of console application.

### Step 5: Run the Guardio-Admin-App

* First, run the development server for the **Guardio-Admin-App**

```bash
 # From `<SAMPE_IS_HOME>/b2b-sample`
 npm install
 nx serve business-admin-app
```
> **_NOTE:_** If `nx serve business-admin-app` produced an error, try with `npx nx serve business-admin-app`

* Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.
* Login from the created user `Alex` to the application.
    * Type `Best Car Mart` when pop up to type the organization.

### Step 6: Setup the identity provider for the Guardio-Business-App

* For this we will create an external identity provider in sub organization.
* Go to the identity providers section in the **Guardio-Admin-App** and fill in the form to create an identity provider for the
  **Guardio-Business-App**.

* After creating the Idp add it to the login flow by clicking on `Add to Login Flow`.

### Step 8: Run the Guardio-Business-App

* First, run the development server for the **Guardio-Business-App**.

* Open a separate terminal and run
```bash
 # From `<SAMPE_IS_HOME>/b2b-sample`
 nx serve business-app
```
> **_NOTE:_** If `nx serve business-app` produced an error, try with `npx nx serve business-app`

* Open a **private browser** and type [http://localhost:3000](http://localhost:3000) with your browser to see the result.
* Login via the configured enterprise IDP to the application.
    * Type `Best Car Mart` when pop up to type the organization.

---

#### Documentations

* [Documentation for setting this sample application in a PCC environment](https://ciamcloud.docs.wso2.com/en/latest/guides/organization-login/try-organization-login/)
* [Documentation for setting this sample application in an Asgardeo environment](https://ciamcloud.docs.wso2.com/en/latest/guides/organization-login/try-organization-login/)

---
## When creating a new library

> After creating a new library in the project (using nx). Please make sure to append `@b2bsample/` before the relevant
> path key in the `tsconfig.base.json`. 
