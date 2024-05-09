import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OnboardPage {
  /**
   * define selectors using getter methods
   */
  private get iNeedWalletButton() {
    return $('[data-id="i_need_a_wallet_button"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   */
  public async clickINeedWalletButton() {
    await (await this.iNeedWalletButton).click();
  }
}

export default new OnboardPage();
