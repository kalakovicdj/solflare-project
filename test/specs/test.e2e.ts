import { expect } from "@wdio/globals";
import { saveScreenshotOnFailure } from "../../project_modules/screenshoot_module/save.screenshot.on.failure";
import logger from "../../project_modules/logger/logger";
import landingPage from "../pageobjects/landing.page";
import onboardPage from "../pageobjects/onboard.page";
import onboardCreatePage from "../pageobjects/onboard.create.page";
import successPage from "../pageobjects/success.page";
import portfolioPage from "../pageobjects/portfolio.page";
import walletManagementPage from "../pageobjects/wallet.management.page";


describe("My Solflare application", () => {
  beforeEach(async function () {
    logger.info('Open Solflare application');
    browser.url("/");
    logger.info('Solflare application successfuly opened');

    logger.info(`Start test: ${this.currentTest?.title}`);
  });

  afterEach(async function () {
    const currentTestTitle = this.currentTest?.title;

    if (this.currentTest?.state !== 'passed' && currentTestTitle) {
        await saveScreenshotOnFailure(currentTestTitle);
    }

    await browser.reloadSession();
  });

  it('Verify that the correct recovery phrase is copied', async function() {
    logger.info('Click "access wallet" button');
    await landingPage.clickAccessWalletButton();
    logger.info('Onboard page is opened');
    
    logger.info('Click "I need wallet button" button');
    await onboardPage.clickINeedWalletButton();
    logger.info('Onboard create page is opened');

    logger.info('Click "copy" button');
    await onboardCreatePage.clickCopyButton();

    logger.info('Validate notification after copy action');
    await onboardCreatePage.validateNotificationWithText('Copied to clipboard');

    // The expected content that should be in the clipboard
    const expectedContent = await onboardCreatePage.getAllRecoveryPhrases();
    logger.info(`Expected recovery phrases: ${expectedContent}`);

    // Retrieve the clipboard content
    const clipboardContent = await onboardCreatePage.getClipboardContent();
    logger.info(`Copied recovery phrases: ${clipboardContent}`);

    // Check if the clipboard content matches the expected content
    logger.info(`Compare copied and expected recovery phrases`);
    await expect(expectedContent).toEqual(expectedContent);
    logger.info(`The recovery phrases have been copied successfully`);
  });

  it('Verify that the user is returned to the solflare app and the portfolio is loaded', async function() {
    logger.info('Click "access wallet" button');
    await landingPage.clickAccessWalletButton();
    logger.info('Onboard page is opened');
    
    logger.info('Click "I need wallet button" button');
    await onboardPage.clickINeedWalletButton();
    logger.info('Onboard create page is opened');

    // The expected content that should be in the clipboard
    const expectedContent = await onboardCreatePage.getAllRecoveryPhrases();
    logger.info(`Expected recovery phrases: ${expectedContent}`);

    logger.info(`Click "i saved my recovery phrases button"`);
    await onboardCreatePage.clickISavedRecoveryPhrasesButton();

    logger.info(`Fill phrases in the empty fileds`);
    await onboardCreatePage.fillMnemonicInputs(expectedContent);

    logger.info(`Click continue button`);
    await onboardCreatePage.clickContinueButton();

    logger.info(`Fill passwords`);
    await onboardCreatePage.setPasswords('password', 'password');

    logger.info(`Click continue button`);
    await onboardCreatePage.clickContinueButtonOnPasswordsForm();

    logger.info(`Success page is opened ${await browser.getUrl()}`);
    logger.info(`Verify Twitter tab`);
    await successPage.verifyTwitterTab();
    logger.info(`Twitter tab displayed successfully`);

    logger.info(`Validate if portfolio page is displayed after closing Twitter tab`);
    await expect(await browser.getUrl()).toEqual('https://solflare.com/portfolio');
    logger.info(`Portfolio page is displayed after closing Twitter tab`);
  });

  it('Verify that the recovery phrase list contains the original wallet and the newly added wallets', async function() {
    logger.info('Click "access wallet" button');
    await landingPage.clickAccessWalletButton();
    logger.info('Onboard page is opened');
    
    logger.info('Click "I need wallet button" button');
    await onboardPage.clickINeedWalletButton();
    logger.info('Onboard create page is opened');

    // The expected content that should be in the clipboard
    const expectedContent = await onboardCreatePage.getAllRecoveryPhrases();
    logger.info(`Expected recovery phrases: ${expectedContent}`);

    logger.info(`Click "i saved my recovery phrases button"`);
    await onboardCreatePage.clickISavedRecoveryPhrasesButton();

    logger.info(`Fill phrases in the empty fileds`);
    await onboardCreatePage.fillMnemonicInputs(expectedContent);

    logger.info(`Click continue button`);
    await onboardCreatePage.clickContinueButton();

    logger.info(`Fill passwords`);
    await onboardCreatePage.setPasswords('password', 'password');

    logger.info(`Click continue button`);
    await onboardCreatePage.clickContinueButtonOnPasswordsForm();

    logger.info(`Success page is opened ${await browser.getUrl()}`);
    logger.info(`Click "enter solana" button`);
    await successPage.clickEnterSolanaButton();

    logger.info(`Success page  ${await browser.getUrl()} is opened`);
    logger.info(`Click "wallet management" button`);
    await browser.setTimeouts(50000);
    await portfolioPage.clickWalletManagementButton();

    logger.info(`Check is "main wallet" displayed`);
    await expect (await walletManagementPage.checkIsMainWalletDisplayed()).toEqual(true);

    logger.info(`Click "add wallet" button`);
    await walletManagementPage.clickAddWalletButton();

    logger.info(`Click "manage recovery phrase" button`);
    await walletManagementPage.clickManageRecoveryPhraseButton();

    logger.info(`Validate is first element disabled and checked`);
    const { checked, disabled } = await walletManagementPage.isFirstItemCheckedAndDisabled();

    // Assert that both values are `true`
    expect(checked).toEqual(true);
    logger.info(`First element is checked`);
    expect(disabled).toEqual(true);
    logger.info(`First element is disabled`);

    logger.info(`Select 3 4 element from list`);
    const walletIndexPositions = [2,3];
    await walletManagementPage.selectItemsByIndex(walletIndexPositions);

    logger.info(`Click "Save" button`);
    await walletManagementPage.clickSaveButton();

    logger.info(`Check if other wallets are displayed`);
    for (const index of walletIndexPositions) { 
      logger.info(`Check if "Wallet ${index}" is displayed`);
      await expect (await walletManagementPage.checkIsNewWalletDisplayed(index)).toEqual(true);
      logger.info(`"Wallet ${index}" is displayed`);
    }
  });
});
