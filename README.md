# Solflare Application Basic Testing Project

## Description

This project provides basic testing for the Solflare application. It ensures that critical features are functioning correctly by using **WebDriverIO**, **Mocha**, and **Allure Reporter** to generate reports and logs while providing meaningful error messages.

## Installation

Before starting testing, install the project's dependencies with:

```bash
npm install
````

## Running Tests

You can run tests in different browsers with the following commands:

**All Browsers:**


* With GUI:

````bash
npm run test:all
````

* Headless mode:
````bash
npm run test:all:headless
````

**Chrome:**

* With GUI:
````bash
npm run test:chrome
````

* Headless mode:
````bash
npm run test:chrome:headless
````

**Firefox:**

* With GUI:
````bash
npm run test:firefox
````

* Headless mode:
````bash
npm run test:firefox:headless
````

**Edge:**

* With GUI:
````bash
npm run test:edge
````

* Headless mode:
````bash
npm run test:edge:headless
````


## Reporting

The Allure Reporter generates comprehensive test reports. These reports are automatically generated after test execution. To open them, run:

````bash
npm run open:allure:report
````

## Logging

This project uses the Winston logger. The info method captures relevant log messages throughout the testing process, while all screenshots of failed tests are stored in the ./screenshots folder.
