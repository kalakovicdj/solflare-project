import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PortfolioPage {
  /**
   * define selectors using getter methods
   */
  private get walletManagementButton() {
    return $('a[href="/settings"] + button');
  }
  
  /**
   * a method to encapsule automation code to interact with the page
   */
  public async clickWalletManagementButton() {
    await (await this.walletManagementButton).click();
  }
}

export default new PortfolioPage();
