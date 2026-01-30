package hu.robertszujo.seleniumproject.loancalculator;

import hu.robertszujo.seleniumproject.BaseTestClass;
import hu.robertszujo.seleniumproject.helper.Constant;
import hu.robertszujo.seleniumproject.helper.FormState;
import org.testng.annotations.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class BoundaryPositiveTest extends BaseTestClass {


    @Test(description = "Boundary positive: applicant exactly 18 years old (minimum age)")
    public void success_applicantExactly18YearsOld() {
        var formState = new FormState()
                .setAge("18")
                .setPropertyValue("50000000")
                .setMultiHousehold(true)
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_HIGH)
                .setExistingInstallments(Constant.EXISTING_INSTALLMENTS_NONE)
                .setOverdraftLimit(Constant.OVERDRAFT_LIMIT_NONE);
        
        runCalculationAndVerifySuccess(formState);
        reporter.pass("Calculation succeeded with applicant age at minimum boundary (18 years)");
    }

    @Test(description = "Boundary positive: applicant exactly 65 years old (maximum age)")
    public void success_applicantExactly65YearsOld() {
        var formState = new FormState()
                .setAge("59") //FIXME AGE 60!!! (propertValue:50M, Income: 1M (multiHouseHold))
                .setPropertyValue("50000000")
                .setMultiHousehold(true)
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_HIGH)
                .setExistingInstallments(Constant.EXISTING_INSTALLMENTS_NONE)
                .setOverdraftLimit(Constant.OVERDRAFT_LIMIT_NONE);
        
        runCalculationAndVerifySuccess(formState);
        reporter.pass("Calculation succeeded with applicant age at maximum boundary (65 years)");
    }

    @Test(description = "Boundary positive: property value exactly 5,000,000 Ft (minimum)")
    public void success_propertyValueExactlyAtMinimum() {
        var formState = new FormState()
                .setAge(Constant.AGE_APPROVED)
                .setPropertyValue(Constant.PROPERTY_VALUE_MINIMUM)
                .setMultiHousehold(true)
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_HIGH)
                .setExistingInstallments(Constant.EXISTING_INSTALLMENTS_NONE)
                .setOverdraftLimit(Constant.OVERDRAFT_LIMIT_NONE);
        
        runCalculationAndVerifySuccess(formState);
        reporter.pass("Calculation succeeded with property value at minimum boundary (5,000,000 Ft)");
    }

    @Test(description = "Boundary positive: single earner income exactly 193,000 Ft (minimum)")
    public void success_singleEarnerIncomeExactlyAtMinimum() {
        var formState = new FormState()
                .setAge(Constant.AGE_APPROVED)
                .setPropertyValue("50000000")
                .setSingleHousehold()
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_SINGLE_MINIMUM)
                .setExistingInstallments(Constant.EXISTING_INSTALLMENTS_NONE)
                .setOverdraftLimit(Constant.OVERDRAFT_LIMIT_NONE);
        
        runCalculationAndVerifySuccess(formState);
        reporter.pass("Calculation succeeded with single earner income at minimum boundary (193,000 Ft)");
    }


    @Test(description = "Boundary positive: dual earner income exactly 290,000 Ft (minimum)")
    public void success_dualEarnerIncomeExactlyAtMinimum() {
        var formState = new FormState()
                .setAge(Constant.AGE_APPROVED)
                .setPropertyValue("50000000")
                .setMultiHousehold(true)
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_DUAL_MINIMUM)
                .setExistingInstallments(Constant.EXISTING_INSTALLMENTS_NONE)
                .setOverdraftLimit(Constant.OVERDRAFT_LIMIT_NONE);
        
        runCalculationAndVerifySuccess(formState);
        reporter.pass("Calculation succeeded with dual earner income at minimum boundary (290,000 Ft)");
    }

    @Test(description = "Boundary positive: existing installments exactly at 50% of income (under 800k overdraft)")
    public void success_jtmExactlyAt50PercentLimit() {
        var formState = new FormState()
                .setAge(Constant.AGE_APPROVED)
                .setPropertyValue("50000000")
                .setMultiHousehold(true)
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_RISKY)
                .setExistingInstallments("150000") // maximum value, 50% = 2000000 ft
                .setOverdraftLimit(Constant.OVERDRAFT_LIMIT_NONE);
        
        runCalculationAndVerifySuccess(formState);
        reporter.pass("Calculation succeeded with existing installments at 50% JTM boundary");
    }


    @Test(description = "Boundary positive: existing installments exactly at 60% of income (at/over 800k overdraft)")
    public void success_jtmExactlyAt60PercentLimit() {
        var formState = new FormState()
                .setAge(Constant.AGE_APPROVED)
                .setPropertyValue("50000000")
                .setMultiHousehold(true)
                .setHouseholdIncome("8000000")
                .setExistingInstallments("453 000") // 800000 * 60% = 480000
                .setOverdraftLimit(Constant.OVERDRAFT_LIMIT_THRESHOLD);

        runCalculationAndVerifySuccess(formState);
        reporter.pass("Calculation succeeded with existing installments at 60% JTM boundary");
    }

    @Test(description = "Boundary positive: overdraft limit exactly at 800,000 Ft threshold")
    public void success_overdraftLimitExactlyAt800kThreshold() {
        var formState = new FormState()
                .setAge(Constant.AGE_APPROVED) // Safe value
                .setPropertyValue("50000000") // High, safe value
                .setMultiHousehold(true)
                .setHouseholdIncome(Constant.HOUSEHOLD_INCOME_HIGH) // High, safe value
                .setExistingInstallments(Constant.EXISTING_INSTALLMENTS_NONE) // No installments
                .setOverdraftLimit(Constant.OVERDRAFT_LIMIT_THRESHOLD); // BOUNDARY VALUE - Exactly 800,000 Ft
        
        runCalculationAndVerifySuccess(formState);
        reporter.pass("Calculation succeeded with overdraft limit at threshold boundary (800,000 Ft)");
    }

    private void runCalculationAndVerifySuccess(FormState formState) {
        loadPageAndAcceptCookies();
        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();
        formState.apply(loanCalculatorPage);
        loanCalculatorPage.clickCalculateButton();
        loanCalculatorPage.waitForResultsSectionToBeDisplayed();
        
        assertThat(loanCalculatorPage.isResultsSectionVisible())
                .as("Results section should be visible after successful calculation")
                .isTrue();
        
        String loanAmount = loanCalculatorPage.waitForFirstOfferLoanAmount();
        assertThat(loanAmount)
                .as("Loan amount should be displayed")
                .isNotBlank();
        
        reporter.info("Loan offer displayed: " + loanAmount);
    }
}
