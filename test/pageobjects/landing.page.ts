import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingPage {
  /**
   * define selectors using getter methods
   */
  private get accessWalletButton() {
    return $("[onclick*='accessWallet']");
  }

  /**
   * a method to encapsule automation code to interact with the page
   */
  public async clickAccessWalletButton() {
    await (await this.accessWalletButton).click();
  }
}

export default new LandingPage();
