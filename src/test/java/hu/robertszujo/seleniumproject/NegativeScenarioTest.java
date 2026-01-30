package hu.robertszujo.seleniumproject;

import org.assertj.core.api.AbstractBooleanAssert;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class NegativeScenarioTest extends BaseTestClass {


    // Age validation
    @Test(description = "Invalid input: applicant too young")
    public void failed_applicantTooYoung() {
        var formState = new FormState().setAge(Constant.AGE_TOO_YOUNG);
        runValidation(formState);
        String actualMessage = loanCalculatorPage.waitForAgeErrorMessage();
        assertFailedMessage(actualMessage, Constant.UNDERAGE_ERROR_MESSAGE, false);
    }

    @Test(description = "Invalid input: applicant too old")
    public void failed_applicantTooOld() {
        var formState = new FormState().setAge(Constant.AGE_TOO_OLD);
        runValidation(formState);
        String actualMessage = loanCalculatorPage.waitForAgeErrorMessage();
        assertFailedMessage(actualMessage, Constant.MAX_AGE_ERROR_MESSAGE, false);
    }

    // Property value validation
    @Test(description = "Invalid input: property value below minimum")
    public void failed_propertyValueBelowMinimum() {
        var formState = new FormState().setPropertyValue(Constant.PROPERTY_VALUE_BELOW_MINIMUM);
        runValidation(formState);
        String actualMessage = loanCalculatorPage.waitForPropertyValueErrorMessage();
        assertFailedMessage(actualMessage, Constant.PROPERTY_MINIMUM_ERROR_MESSAGE, false);
    }

    // Single earner income validation
    @Test(description = "Invalid input: single earner below minimum income")
    public void failed_singleEarnerBelowMinimumIncome() {
        var formState = new FormState()
                .setSingleHousehold()
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_SINGLE_BELOW_MINIMUM);
        runValidation(formState);
        String actualMessage = loanCalculatorPage.waitForHouseholdIncomeErrorMessage();
        assertFailedMessage(actualMessage, null, true);
    }

    // Dual earner income validation
    @Test(description = "Invalid input: dual earner below minimum income")
    public void failed_dualEarnerBelowMinimumIncome() {
        var formState = new FormState()
                .setMultiHousehold(true)
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_DUAL_BELOW_MINIMUM);
        runValidation(formState);
        String actualMessage = loanCalculatorPage.waitForHouseholdIncomeErrorMessage();
        assertFailedMessage(actualMessage, null, true);
    }

    // JTM violation - 50% rule (existing installments < 800k overdraft)
    @Test(description = "Invalid input: JTM violation with 50% rule (loan under 800k)")
    public void failed_jtmViolation50PercentRule() {
        var formState = new FormState()
                .setSingleHousehold()
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_RISKY)
                .setExistingInstallments(Constant.JTM_50_PERCENT_VIOLATION);
        runValidation(formState);
        String actualMessage = loanCalculatorPage.waitForExistingInstallmentsErrorMessage();
        assertFailedMessage(actualMessage, Constant.DEBT_TO_INCOME_ERROR_MESSAGE, true);
    }

    // JTM violation - 60% rule (existing installments >= 800k overdraft)
    @Test(description = "Invalid input: JTM violation with 60% rule (loan over 800k)")
    public void failed_jtmViolation60PercentRule() {
        var formState = new FormState()
                .setMultiHousehold(true)
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_RISKY)
                .setExistingInstallments(Constant.JTM_60_PERCENT_VIOLATION)
                .setOverdraftLimit(Constant.OVERDRAFT_LIMIT_THRESHOLD);
        runValidation(formState);
        String actualMessage = loanCalculatorPage.waitForExistingInstallmentsErrorMessage();
        assertFailedMessage(actualMessage, Constant.DEBT_TO_INCOME_ERROR_MESSAGE, true);
    }

    private void runValidation(FormState formState) {
        loadPageAndAcceptCookies();
        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();
        formState.apply(loanCalculatorPage);
        loanCalculatorPage.clickCalculateButton();
    }

    private void assertFailedMessage(String actualMessage, String expectedMessage, boolean isFallbackMessageVisible) {
        if (expectedMessage != null) {
            assertThat(actualMessage)
                    .as("Validation message should match the expected content")
                    .isEqualTo(expectedMessage);
        } else {
            assertThat(actualMessage)
                    .as("Validation message should be populated")
                    .isNotBlank();
        }
        assertThat(loanCalculatorPage.isFallbackMessageVisible())
                .as("Fallback panel visibility should match scenario expectation")
                .isEqualTo(isFallbackMessageVisible);
        assertThat(loanCalculatorPage.isResultsSectionVisible())
                .as("Loan offers must remain hidden when validation fails")
                .isFalse();
        reporter.pass("Validation message shown: " + actualMessage);
    }
}
