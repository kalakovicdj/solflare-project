import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SuccessPage {
  /**
   * define selectors using getter methods
   */
  private get followUsButton() {
    return $('button=Follow us');
  }

  private get enterSolanaButton() {
    return $('button=Enter Solana');
  }

  
  /**
   * a method to encapsule automation code to interact with the page
   */
  public async clickFollowUsButton() {
    await (await this.followUsButton).click();
  }

  public async clickEnterSolanaButton() {
    await (await this.enterSolanaButton).click();
  }

  // Function to validate the URL in the new tab
  public async verifyTwitterTab() {
    // Click the button to open a new tab
    await this.clickFollowUsButton();
  
    // Save the current tab ID
    const originalWindow = await browser.getWindowHandle();
  
    // Wait for the new window or tab to open
    await browser.waitUntil(async () => (await browser.getWindowHandles()).length > 1, {
      timeout: 10000,
      timeoutMsg: 'New tab did not open within the expected time'
    });
  
    // Get all window/tab IDs
    const allWindows = await browser.getWindowHandles();
  
    // Find the new tab's ID (which is not the original tab)
    const newTab = allWindows.find(window => window !== originalWindow);
  
    if (!newTab) {
      throw new Error('Unable to find the new tab. Make sure that the button opens a new tab.');
    }
  
    // Switch to the new tab
    await browser.switchToWindow(newTab);
  
    // Wait until the expected URL is loaded (adjust timeout as needed)
    const expectedUrl = 'https://twitter.com/solflare_wallet';
    await browser.waitUntil(async () => {
      const actualUrl = await browser.getUrl();
      return actualUrl === expectedUrl;
    }, {
      timeout: 10000,
      timeoutMsg: `URL does not match! Expected: ${expectedUrl}`
    });
  
    // Close the new tab and return to the original tab
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);
  }
}

export default new SuccessPage();
