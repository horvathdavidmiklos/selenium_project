package hu.robertszujo.seleniumproject.loancalculator;

import hu.robertszujo.seleniumproject.BaseTestClass;
import hu.robertszujo.seleniumproject.helper.FormState;
import org.openqa.selenium.JavascriptExecutor;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import static hu.robertszujo.seleniumproject.helper.Constant.*;
import static hu.robertszujo.seleniumproject.constants.TestConstants.CALCULATOR_PAGE_URL;
import static org.assertj.core.api.Assertions.assertThat;

public class BehaviorValidationTest extends BaseTestClass {


    @DataProvider(name = "propertyValueIncreaseScenarios")
    public Object[][] propertyValueIncreaseScenario() {
        return new Object[][]{
                // propertyValue, higherPropertyValue, multiHousehold, existingInstallments, householdIncome
                {30000000, 40000000, false, Long.parseLong(EXISTING_INSTALLMENTS_NONE), 3000000},
                {20000000, 25000000, true, Long.parseLong(EXISTING_INSTALLMENTS_MEDIUM), 950000},
                {30000000, 35000000, true, Long.parseLong(EXISTING_INSTALLMENTS_LOW), 1000000},
        };
    }

    @DataProvider(name = "householdIncomeIncreaseScenarios")
    public Object[][] householdIncomeIncreaseScenarios() {
        return new Object[][]{
                // propertyValue, multiHousehold, existingInstallments, householdIncome, higherHouseholdIncome
                {100000000, true, Long.parseLong(EXISTING_INSTALLMENTS_NONE), 1000000, 1100000,},
                {125000000, true, Long.parseLong(EXISTING_INSTALLMENTS_MEDIUM), 1200000, 1300000,},
                {155000000, true, Long.parseLong(EXISTING_INSTALLMENTS_LOW), 1500000, 1550000,},
        };
    }

    @DataProvider(name = "installmentsIncreaseScenarios")
    public Object[][] installmentsIncreaseScenarios() {
        return new Object[][]{
                // propertyValue, multiHousehold, householdIncome, existingInstallments, lowerOverdraft, higherOverdraft
                {100000000, true, Long.parseLong(EXISTING_INSTALLMENTS_NONE), Long.parseLong(EXISTING_INSTALLMENTS_MODERATE), Long.parseLong(OVERDRAFT_LIMIT_ACCEPTABLE)},
                {125000000, true, Long.parseLong(EXISTING_INSTALLMENTS_MEDIUM), Long.parseLong(EXISTING_INSTALLMENTS_HIGH), Long.parseLong(OVERDRAFT_LIMIT_MODERATELY_HIGH)},
                {80000000, true, Long.parseLong(EXISTING_INSTALLMENTS_LOW), Long.parseLong(EXISTING_INSTALLMENTS_MEDIUM), Long.parseLong(OVERDRAFT_LIMIT_THRESHOLD)},
        };
    }

    @Test(description = "Max loan decreases when overdraft limit increases (income fixed, property high)",
            dataProvider = "installmentsIncreaseScenarios")
    public void behavior_maxLoanDecreasesWithOverdraftLimit(
            long propertyValue,
            boolean multiHousehold,
            long existingInstallments,
            long existingHigherInstallments,
            long houseHoldIncome) {
        // Given
        openCalculatorReady();

        // When
        long maxLoan1 = whenCalculateMaxLoan(propertyValue, multiHousehold, existingInstallments, houseHoldIncome);
        resetToCleanCalculatorState();
        long maxLoan2 = whenCalculateMaxLoan(propertyValue, multiHousehold, existingHigherInstallments, houseHoldIncome);

        // Then
        thenMaxLoanShouldDecrease(maxLoan1, maxLoan2);

        reporter.pass("Maximum loan amount decreased from " + maxLoan1 + " to " + maxLoan2
                + " when overdraft limit increased from " + existingInstallments + " to " + existingHigherInstallments);
    }


    @Test(description = "Max loan increases when propertyValue increases (all other inputs fixed per scenario)",
            dataProvider = "propertyValueIncreaseScenarios")
    public void behavior_maxLoanIncreasesWithPropertyValue(long propertyValue,
                                                           long higherPropertyValue,
                                                           boolean multiHousehold,
                                                           long existingInstallments,
                                                           long houseHoldIncome) {
        // Given
        openCalculatorReady();

        //When
        long maxLoan1 = whenCalculateMaxLoan(propertyValue, multiHousehold, existingInstallments, houseHoldIncome);
        resetToCleanCalculatorState();
        long maxLoan2 = whenCalculateMaxLoan(higherPropertyValue, multiHousehold, existingInstallments, houseHoldIncome);

        //Then
        thenMaxLoanShouldIncrease(maxLoan1, maxLoan2);

        reporter.pass("Maximum loan amount increased from " + maxLoan1 + " to " + maxLoan2
                + " when property value doubled");
    }

    @Test(description = "Max loan increases when householdIncome increases (all other inputs fixed per scenario)",
            dataProvider = "householdIncomeIncreaseScenarios")
    public void behavior_maxLoanIncreasesWithHouseholdIncome(long propertyValue,
                                                             boolean multiHousehold,
                                                             long existingInstallments, long houseHoldIncome,
                                                             long higherHouseHoldIncome) {
        // Given
        openCalculatorReady();

        //When
        long maxLoan1 = whenCalculateMaxLoan(propertyValue, multiHousehold, existingInstallments, houseHoldIncome);
        resetToCleanCalculatorState();
        long maxLoa2 = whenCalculateMaxLoan(propertyValue, multiHousehold, existingInstallments, higherHouseHoldIncome);

        //Then
        thenMaxLoanShouldIncrease(maxLoan1, maxLoa2);

        reporter.pass("Maximum loan amount increased from " + maxLoan1 + " to " + maxLoa2
                + " when household income increased");
    }

    @Test(description = "THM decreases when repayment protection insurance is selected")
    public void behavior_thmDecreasesWithInsurance() {
        // Given
        openCalculatorReady();

        // When - Calculate without insurance
        double thmWithoutInsurance = whenCalculateThmWithInsurance(false);
        resetToCleanCalculatorState();

        // When - Calculate with insurance
        double thmWithInsurance = whenCalculateThmWithInsurance(true);

        // Then
        thenThmShouldDecrease(thmWithoutInsurance, thmWithInsurance);

        reporter.pass("THM decreased from " + thmWithoutInsurance + "% to " + thmWithInsurance 
                + "% when repayment protection insurance was selected");
    }

    // -------- GIVEN helpers --------

    private void openCalculatorReady() {
        loadPageAndAcceptCookies();
        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();
    }

    private void resetToCleanCalculatorState() {
        driver.get(CALCULATOR_PAGE_URL);
        driver.navigate().refresh();
        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();
    }

    private FormState givenBaseValidForm() {
        return new FormState()
                .setHouseholdIncome(HOUSEHOLD_INCOME_HIGH)
                .setMultiHousehold(true)
                .setExistingInstallments(EXISTING_INSTALLMENTS_NONE)
                .setOverdraftLimit(OVERDRAFT_LIMIT_NONE);
    }

    // -------- WHEN helpers --------

    private long whenCalculateMaxLoan(long propertyValue, boolean multiHousehold, long existingInstallments, long houseHoldIncome) {
        FormState form = givenBaseValidForm()
                .setPropertyValue(String.valueOf(propertyValue))
                .setMultiHousehold(multiHousehold)
                .setExistingInstallments(String.valueOf(existingInstallments))
                .setHouseholdIncome(String.valueOf(houseHoldIncome));

        long result = calculateMaxLoan(form);
        reporter.info("Max loan with " + propertyValue + " property: " + result);
        return result;
    }

    private long calculateMaxLoan(FormState formState) {
        scrollTop();
        formState.apply(loanCalculatorPage);
        loanCalculatorPage.clickCalculateButton();
        loanCalculatorPage.waitForResultsSectionToBeDisplayed();

        String amountText = loanCalculatorPage.waitForFirstOfferLoanAmount();
        return parseLoanAmount(amountText);
    }

    private double whenCalculateThmWithInsurance(boolean insuranceSelected) {
        FormState form = givenBaseValidForm()
                .setPropertyValue(PROPERTY_VALUE_SAVE)
                .setInsuranceSelected(insuranceSelected);

        double result = calculateThm(form);
        reporter.info("THM with insurance " + (insuranceSelected ? "selected" : "not selected") + ": " + result + "%");
        return result;
    }

    private double calculateThm(FormState formState) {
        scrollTop();
        formState.apply(loanCalculatorPage);
        loanCalculatorPage.clickCalculateButton();
        loanCalculatorPage.waitForResultsSectionToBeDisplayed();

        String thmText = loanCalculatorPage.waitForFirstOfferThm();
        return parseThmValue(thmText);
    }

    private void scrollTop() {
        ((JavascriptExecutor) driver).executeScript("window.scrollTo(0, 0);");
    }

    // -------- THEN helpers --------

    private void thenMaxLoanShouldIncrease(long smallerPropertyResult, long biggerPropertyResult) {
        assertThat(biggerPropertyResult)
                .as("Maximum loan amount should increase when property value increases")
                .isGreaterThan(smallerPropertyResult);
    }

    private void thenMaxLoanShouldDecrease(long baselineResult, long worseConstraintResult) {
        assertThat(worseConstraintResult)
                .as("Maximum loan amount should decrease when constraints increase (installments/overdraft)")
                .isLessThan(baselineResult);
    }

    private void thenThmShouldDecrease(double thmWithoutInsurance, double thmWithInsurance) {
        assertThat(thmWithInsurance)
                .as("THM should decrease when repayment protection insurance is selected")
                .isLessThan(thmWithoutInsurance);
    }

    // -------- Parsing --------

    /**
     * Example: "15 000 000 Ft" -> 15000000
     */
    private long parseLoanAmount(String loanAmountText) {
        return Long.parseLong(loanAmountText.replaceAll("[^0-9]", ""));
    }

    /**
     * Example: "5,67 %" -> 5.67
     */
    private double parseThmValue(String thmText) {
        String normalized = thmText.replace("%", "").replace(" ", "").replace(",", ".").trim();
        return Double.parseDouble(normalized);
    }
}
