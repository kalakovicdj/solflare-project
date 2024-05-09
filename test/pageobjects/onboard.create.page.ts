import { $ } from "@wdio/globals";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class OnboardCreatePage {
  /**
   * define selectors using getter methods
   */
  private get copyButton() {
    return $('button=Copy');
  }

  private get iSavedRecoveryPhrasesButton() {
    return $('button=I SAVED MY RECOVERY PHRASE');
  }

  private get continueButton() {
    return $('[data-id="continue_button"]');
  }

  private get continuePasswordsButton() {
    return $('button=Continue');
  }

  private get newPasswordInput() {
    return $('[name="password"]');
  }

  private get repeatPasswordInput() {
    return $('[name="password2"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   */
  public async clickCopyButton() {
    await (await this.copyButton).click(); 
  }

  public async clickISavedRecoveryPhrasesButton() {
    await (await this.iSavedRecoveryPhrasesButton).click(); 
  }

  public async clickContinueButton() {
    await (await this.continueButton).click(); 
  }

  public async clickContinueButtonOnPasswordsForm() {
    await (await this.continuePasswordsButton).click(); 
  }

  // Function to retrieve clipboard content
  public async getClipboardContent(): Promise<string> {
    // Use browser.execute to execute JavaScript code in the browser
    const clipboardText = await browser.executeAsync((done) => {
        // Utilize the Clipboard API
        navigator.clipboard.readText().then(done).catch(() => done(''));
    }) as string; // Explicitly cast the result to string

    return clipboardText;
  }

  // Function to retrieve all recovery phrases based on data-index attributes
  public async getAllRecoveryPhrases(): Promise<string> {
    // Find all elements with data-index attribute in ascending order
    const recoveryPhrases = await browser.execute(() => {
        const phrasesArray: string[] = [];
        // Select all elements with the `data-index` attribute
        const phraseElements = document.querySelectorAll('[data-index]');
        // Sort the elements based on their `data-index` value
        const sortedElements = Array.from(phraseElements).sort((a, b) => {
            return parseInt((a as HTMLElement).getAttribute('data-index') || '0', 10) - 
                   parseInt((b as HTMLElement).getAttribute('data-index') || '0', 10);
        });
        // Extract the inner text from each sorted element and add it to the array
        sortedElements.forEach((element) => {
            phrasesArray.push((element as HTMLElement).innerText.trim());
        });
        // Return the joined string
        return phrasesArray.join(' ');
    });
    
    return recoveryPhrases;
  }

  /**
  * Public async function to fill mnemonic phrase inputs
  * @param {string} phrase - The mnemonic phrase to fill
  */
  public async fillMnemonicInputs(phrase: string): Promise<void> {
    // Split the phrase into individual words
    const words = phrase.split(" ");

    // Iterate through the list of words and input them into the fields
    for (let i = 0; i < words.length; i++) {
        // Construct the selector for each input field using its unique index attribute
        const inputSelector = `input[data-id='recovery_phrase_input'][tabindex='${i + 1}']`;

        // Wait for the input field to be clickable and then set the word
        const inputField = await $(inputSelector);
        await inputField.waitForClickable({ timeout: 5000 });
        await inputField.setValue(words[i]);
    }
  }


  /**
  * Public async function to fill passwords
  * @param {string} newPassword - Password
  * * @param {string} repeatPassword - Password
  */
  public async setPasswords(newPassword: string, repeatPassword: string) {
    await this.newPasswordInput.setValue(newPassword);
    await this.repeatPasswordInput.setValue(repeatPassword);
  }

  /**
   * Validates that a notification with a specific text is displayed.
  * @param expectedText - The text that the notification should contain.
  * @returns true if the notification with the expected text is found, false otherwise.
  */
  public async validateNotificationWithText(expectedText: string): Promise<boolean> {
    // Select the notification container
    const notificationSelector = '#notistack-snackbar';
    const notificationContainer = await $(notificationSelector);

    // Wait for the notification to be visible
    await notificationContainer.waitForDisplayed({ timeout: 5000 });

    // Retrieve the text content from the notification container
    const notificationText = await notificationContainer.getText();

    // Verify that the notification contains the expected text
    return notificationText.includes(expectedText);
}
}

export default new OnboardCreatePage();
