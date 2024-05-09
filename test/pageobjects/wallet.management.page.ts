import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WalletManagementPage {
  /**
   * define selectors using getter methods
   */
  private get mainWalletSpan() {
    return $('span=Main Wallet');
  }
  
  private get manageRecoveryPhraseButton() {
    return $('span=Manage recovery phrase');
  }

  private get addWalletButton() {
    return $('div[role="dialog"] [data-icon="plus"]');
  }

  private get saveButton() {
    return $('span=Save');
  }
  
  /**
   * a method to encapsule automation code to interact with the page
   */
  public async checkIsMainWalletDisplayed() {
    return await (await this.mainWalletSpan).isDisplayed();
  }

  public async clickAddWalletButton() {
    return await (await this.addWalletButton).click();
  }

  public async clickManageRecoveryPhraseButton() {
    return await (await this.manageRecoveryPhraseButton).click();
  }

  public async clickSaveButton() {
    return await (await this.saveButton).click();
  }

  public async isFirstItemCheckedAndDisabled(): Promise<{ checked: boolean, disabled: boolean }> {
    // Find the first item by selecting the element with `data-item-index="0"` and role `switch`
    const firstItemSelector = '[data-item-index="0"] button[role="switch"]';
    const firstItemButton = await $(firstItemSelector);

    // Retrieve the value of the `aria-checked` attribute and check if it's set to 'true'
    const isChecked = await firstItemButton.getAttribute('aria-checked') === 'true';

    // Check if is set to 'disabled'
    const isDisabled = !(await firstItemButton.isEnabled());

    // Return an object containing both attributes' states
    return { checked: isChecked, disabled: isDisabled };
  }

  public async selectItemsByIndex(indexes: number[]) {
    for (const index of indexes) {
        // Construct a selector for the button using the data-item-index attribute
        const buttonSelector = `div[data-item-index="${index}"] button[role="switch"]`;

        // Wait for the button to be clickable and click it
        const switchButton = await $(buttonSelector);
        await switchButton.waitForClickable({ timeout: 5000 });
        await switchButton.click();
    }
  }

  public async checkIsNewWalletDisplayed(indexValue: number): Promise<boolean> {
    const walletSelector = `span=Wallet ${indexValue}`;
    const walletElement = await $(walletSelector);

    // Wait until the element is displayed before checking its presence
    await walletElement.waitForDisplayed({ timeout: 5000 });

    return walletElement.isDisplayed();
  }
}

export default new WalletManagementPage();
