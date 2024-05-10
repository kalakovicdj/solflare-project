# Solflare Application Basic Testing Project

## Description

This project provides basic testing for the Solflare application. It ensures that critical features are functioning correctly by using **WebDriverIO**, **Mocha**, and **Allure Reporter** to generate reports and logs while providing meaningful error messages.

## Installation

Before starting testing, install the project's dependencies with:

```bash
npm install
````

## Why Edge Browser Must Be Installed

- **Edge Integration with the System:**
  
  Microsoft Edge is integrated deeply into Windows systems and is distributed via the Windows Update process, making it tightly coupled with the OS. On macOS, Microsoft provides a downloadable installer but doesn't include a standalone EdgeDriver executable like Chrome.

- **Browser Compatibility:**
  
  Microsoft EdgeDriver needs to match the version of the installed Edge browser to ensure compatibility, which requires the browser to be installed. Differences in Chrome and Firefox:

- **Standalone Distribution:**
  
  Chrome and Firefox are distributed as standalone browsers that are not deeply integrated with the OS. They can be installed and removed more easily.

- **WebDriver Implementations:**
  
  ChromeDriver and GeckoDriver are often downloaded automatically because they are distributed as standalone executables that can be easily paired with any version of their respective browsers.

- **Binary Path Requirement:**
  
  EdgeDriver requires the path to the Edge browser binary because it needs to confirm that the browser is installed and compatible. If Edge isn't installed, EdgeDriver can't work.


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
