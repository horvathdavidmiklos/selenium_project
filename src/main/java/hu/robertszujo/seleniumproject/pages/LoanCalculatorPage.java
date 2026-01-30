package hu.robertszujo.seleniumproject.pages;

import com.aventstack.extentreports.ExtentTest;
import hu.robertszujo.seleniumproject.constants.ElementConstants;
import hu.robertszujo.seleniumproject.utils.ElementActions;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoanCalculatorPage extends BasePageObject {

    public LoanCalculatorPage(WebDriver driver, ExtentTest reporter) {
        super(driver, reporter);
    }

    // *** Elements ***

    @FindBy(css = "div[class='content_hitelmaximum']")
    private WebElement calculatorForm;

    @FindBy(id = "ingatlan_erteke")
    private WebElement propertyValueInput;

    @FindBy(id = "ingatlan_erteke_error")
    private WebElement propertyValueErrorMessage;

    @FindBy(id = "meletkor")
    private WebElement ageInput;

    @FindBy(id = "mjovedelem")
    private WebElement householdIncomeInput;

    @FindBy(id = "mjovedelem_error")
    private WebElement householdIncomeErrorMessage;

    @FindBy(id = "meglevo_torleszto")
    private WebElement existingInstallmentsInput;

    @FindBy(id = "meglevo_torleszto_error")
    private WebElement existingInstallmentsErrorMessage;

    @FindBy(id = "folyoszamla")
    private WebElement overdraftLimitInput;

    @FindBy(css = "input.mennyit_kaphatok")
    private WebElement calculateButton;

    @FindBy(id = "eletkor_error")
    private WebElement ageErrorMessage;

    @FindBy(id = "max_eredmeny")
    private WebElement resultsSection;

    @FindBy(id = "nem_tudunk_kalkulalni")
    private WebElement cannotCalculatePanel;

    @FindBy(id = "egyedul")
    private WebElement singleHouseholdRadio;

    @FindBy(id = "tobben")
    private WebElement multipleHouseholdRadio;

    @FindBy(id = "box_1_max_desktop")
    private WebElement firstOfferAmount;

    @FindBy(id = "box_1_thm")
    private WebElement firstOfferThm;

    @FindBy(id = "kedvezmeny_biztositasm")
    private WebElement insuranceCheckbox;

    // *** Element methods ***

    public void waitForCalculatorFormToBeDisplayed() {
        reporter.info("Waiting for calculator form to be displayed");
        ElementActions.waitForElementToBeDisplayed(calculatorForm, driver);
    }

    public boolean isCalculatorFormDisplayedAfterWaiting() {
        try {
            waitForCalculatorFormToBeDisplayed();
            return true;
        } catch (TimeoutException e) {
            return false;
        }
    }

    public void enterPropertyValue(String amount) {
        reporter.info("Entering property value: " + amount);
        ElementActions.clearAndType(propertyValueInput, amount, driver);
    }

    public void enterAge(String age) {
        reporter.info("Entering age: " + age);
        ElementActions.clearAndType(ageInput, age, driver);
    }

    public void enterHouseholdIncome(String income) {
        reporter.info("Entering household income: " + income);
        ElementActions.clearAndType(householdIncomeInput, income, driver);
    }

    public void enterExistingLoanInstallments(String amount) {
        reporter.info("Entering existing loan installments: " + amount);
        ElementActions.clearAndType(existingInstallmentsInput, amount, driver);
    }

    public void enterOverdraftLimit(String amount) {
        reporter.info("Entering overdraft limit: " + amount);
        ElementActions.clearAndType(overdraftLimitInput, amount, driver);
    }

    public void selectSingleHousehold() {
        reporter.info("Selecting single-earner household option");
        if (!singleHouseholdRadio.isSelected()) {
            ElementActions.clickWhenClickable(singleHouseholdRadio, driver);
        }
    }

    public void selectMultipleHousehold() {
        reporter.info("Selecting multi-earner household option");
        if (!multipleHouseholdRadio.isSelected()) {
            ElementActions.clickWhenClickable(multipleHouseholdRadio, driver);
        }
    }

    public void clickCalculateButton() {
        reporter.info("Clicking on calculate button");
        ElementActions.scrollIntoView(calculateButton, driver);
        ElementActions.clickWhenClickable(calculateButton, driver);
    }

    public String waitForAgeErrorMessage() {
        ElementActions.waitForTextToBePresent(ageErrorMessage, driver);
        return ageErrorMessage.getText().trim();
    }

    public String waitForPropertyValueErrorMessage() {
        ElementActions.waitForTextToBePresent(propertyValueErrorMessage, driver);
        return propertyValueErrorMessage.getText().trim();
    }

    public String waitForHouseholdIncomeErrorMessage() {
        ElementActions.waitForTextToBePresent(householdIncomeErrorMessage, driver);
        return householdIncomeErrorMessage.getText().trim();
    }

    public String waitForExistingInstallmentsErrorMessage() {
        ElementActions.waitForTextToBePresent(existingInstallmentsErrorMessage, driver);
        return existingInstallmentsErrorMessage.getText().trim();
    }

    public void waitForFallbackMessage() {
        reporter.info("Waiting for fallback panel to be displayed");
        try {
            new WebDriverWait(driver, ElementConstants.MAX_WAIT_DURATION)
                    .ignoring(StaleElementReferenceException.class)
                    .until(webDriver -> isFallbackMessageVisible());
        } catch (TimeoutException timeoutException) {
            reporter.warning("Fallback panel did not become visible within wait window. display="
                    + getFallbackDisplayValue() + ", classes=" + getFallbackPanelCssClasses()
                    + ", text='" + getFallbackPanelText() + "'");
            throw timeoutException;
        }
    }

    public String getFallbackDisplayValue() {
        return executeVisibilityScript("return window.getComputedStyle(arguments[0]).display;", cannotCalculatePanel);
    }

    public boolean isFallbackMessageVisible() {
        return isElementVisuallyDisplayed(cannotCalculatePanel);
    }

    public String getFallbackPanelCssClasses() {
        try {
            return cannotCalculatePanel.getAttribute("class");
        } catch (NoSuchElementException | StaleElementReferenceException e) {
            return "";
        }
    }

    public String getFallbackPanelText() {
        try {
            return cannotCalculatePanel.getText().trim();
        } catch (NoSuchElementException | StaleElementReferenceException e) {
            return "";
        }
    }

    public boolean isResultsSectionVisible() {
        try {
            return resultsSection.isDisplayed();
        } catch (NoSuchElementException | StaleElementReferenceException e) {
            return false;
        }
    }

    public void waitForResultsSectionToBeDisplayed() {
        reporter.info("Waiting for results section to be displayed");
        new WebDriverWait(driver, ElementConstants.MAX_WAIT_DURATION)
                .until(webDriver -> isResultsSectionVisible());
    }

    public String waitForFirstOfferLoanAmount() {
        ElementActions.waitForElementToBeDisplayed(firstOfferAmount, driver);
        ElementActions.waitForTextToBePresent(firstOfferAmount, driver);
        return firstOfferAmount.getText().trim();
    }

    public String waitForFirstOfferThm() {
        ElementActions.waitForElementToBeDisplayed(firstOfferThm, driver);
        ElementActions.waitForTextToBePresent(firstOfferThm, driver);
        return firstOfferThm.getText().trim();
    }

    public void setInsuranceSelected(boolean shouldBeSelected) {
        reporter.info("Setting insurance checkbox selection state to: " + shouldBeSelected);
        if (insuranceCheckbox.isSelected() != shouldBeSelected) {
            ElementActions.clickWhenClickable(insuranceCheckbox, driver);
        }
    }

    private boolean isElementVisuallyDisplayed(WebElement element) {
        try {
            Boolean visibilityResult = (Boolean) ((JavascriptExecutor) driver).executeScript(
                    "const el = arguments[0];" +
                            "if (!el) { return false; }" +
                            "const style = window.getComputedStyle(el);" +
                            "if (!style) { return false; }" +
                            "const rect = el.getBoundingClientRect();" +
                            "return style.display !== 'none' &&" +
                            " style.visibility !== 'hidden' &&" +
                            " parseFloat(style.opacity || '1') > 0 &&" +
                            " rect.height > 0 && rect.width > 0;",
                    element);
            return Boolean.TRUE.equals(visibilityResult);
        } catch (NoSuchElementException | StaleElementReferenceException e) {
            return false;
        }
    }

    private String executeVisibilityScript(String script, WebElement element) {
        try {
            Object result = ((JavascriptExecutor) driver).executeScript(script, element);
            return result != null ? result.toString() : "";
        } catch (NoSuchElementException | StaleElementReferenceException e) {
            return "";
        }
    }

}
