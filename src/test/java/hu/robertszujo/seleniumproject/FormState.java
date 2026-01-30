package hu.robertszujo.seleniumproject;

import hu.robertszujo.seleniumproject.pages.LoanCalculatorPage;

public class FormState {
    private String propertyValue;
    private String age;
    private boolean multiHousehold;
    private String householdIncome;
    private String existingInstallments;
    private String overdraftLimit;
    private boolean insuranceSelected;

    public FormState() {
        // Valid defaults
        this.propertyValue = Constant.PROPERTY_VALUE_MINIMUM;
        this.age = Constant.AGE_APPROVED;
        this.multiHousehold = true;
        this.householdIncome = Constant.HOUSEHOLD_INCOME_HIGH;
        this.existingInstallments = Constant.EXISTING_INSTALLMENTS_NONE;
        this.overdraftLimit = Constant.OVERDRAFT_LIMIT_NONE;
        this.insuranceSelected = false;
    }

    public FormState setPropertyValue(String propertyValue) {
        this.propertyValue = propertyValue;
        return this;
    }

    public FormState setAge(String age) {
        this.age = age;
        return this;
    }

    public FormState setMultiHousehold(boolean multiHousehold) {
        this.multiHousehold = multiHousehold;
        return this;
    }

    public FormState setSingleHousehold() {
        this.multiHousehold = false;
        return this;
    }

    public FormState setHouseholdIncome(String householdIncome) {
        this.householdIncome = householdIncome;
        return this;
    }

    public FormState setExistingInstallments(String existingInstallments) {
        this.existingInstallments = existingInstallments;
        return this;
    }

    public FormState setOverdraftLimit(String overdraftLimit) {
        this.overdraftLimit = overdraftLimit;
        return this;
    }

    public FormState setInsuranceSelected(boolean insuranceSelected) {
        this.insuranceSelected = insuranceSelected;
        return this;
    }

    public void apply(LoanCalculatorPage page) {
        if (multiHousehold) {
            page.selectMultipleHousehold();
        } else {
            page.selectSingleHousehold();
        }
        page.enterPropertyValue(propertyValue);
        page.enterAge(age);
        page.enterHouseholdIncome(householdIncome);
        page.enterExistingLoanInstallments(existingInstallments);
        page.enterOverdraftLimit(overdraftLimit);
        page.setInsuranceSelected(insuranceSelected);
    }
}
