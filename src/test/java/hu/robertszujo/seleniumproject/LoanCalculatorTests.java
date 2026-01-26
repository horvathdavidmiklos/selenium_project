package hu.robertszujo.seleniumproject;

import java.util.function.Supplier;

import org.assertj.core.api.Assertions;
import org.testng.ITestContext;
import org.testng.ITestResult;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Listeners;
import org.testng.annotations.Test;

import com.aventstack.extentreports.ExtentTest;

import hu.robertszujo.seleniumproject.constants.TestConstants;
import hu.robertszujo.seleniumproject.constants.TestContextConstants;
import hu.robertszujo.seleniumproject.pages.LoanCalculatorPage;
import hu.robertszujo.seleniumproject.pages.components.CookiePopup;

import static hu.robertszujo.seleniumproject.constants.TestConstants.CALCULATOR_PAGE_URL;

@Listeners(TestListener.class)
public class LoanCalculatorTests extends BaseTestClass {

    private ExtentTest reporter;
    private LoanCalculatorPage loanCalculatorPage;
    private CookiePopup cookiePopup;

    private static final String UNDERAGE_ERROR_MESSAGE = "Hitelt kizárólag 18. életévüket betöltött személyek igényelhetnek.";
    private static final String PROPERTY_MINIMUM_ERROR_MESSAGE = "Minimum 5 millió forint érékű ingatlan szükséges";
    private static final String MAX_AGE_ERROR_MESSAGE = "Sajnos jelenleg nem tudunk kalkulálni, kérjük add meg adataid és visszahívunk.";
    private static final String DEBT_TO_INCOME_ERROR_MESSAGE = "A megadott jövedelemhez képest túl nagy a törlesztőrészlet.";

    private static final String PROPERTY_VALUE_MINIMUM = "5000000";
    private static final String PROPERTY_VALUE_BELOW_MINIMUM = "4999999";

    private static final String AGE_TOO_YOUNG = "17";
    private static final String AGE_APPROVED = "30";
    private static final String AGE_TOO_OLD = "66";

    private static final String HOUSEHOLD_INCOME_LOW = "193000";
    private static final String HOUSEHOLD_INCOME_MEDIUM = "300000";
    private static final String HOUSEHOLD_INCOME_RISKY = "400000";
    private static final String HOUSEHOLD_INCOME_HIGH = "600000";

    private static final String EXISTING_INSTALLMENTS_NONE = "0";
    private static final String EXISTING_INSTALLMENTS_HIGH = "200001";
    private static final String EXISTING_INSTALLMENTS_ACCEPTABLE = "200000";

    private static final String OVERDRAFT_LIMIT_NONE = "0";

    @BeforeMethod(alwaysRun = true)
    public void beforeMethod(ITestContext context, ITestResult result) {
        reporter = SuiteWideStorage.testReport.createTest(
                result.getMethod().getMethodName(),
                result.getMethod().getDescription());
        context.setAttribute(TestContextConstants.REPORTER, reporter);
        initializePageObjects();
    }

    public void initializePageObjects() {
        loanCalculatorPage = new LoanCalculatorPage(driver, reporter);
        cookiePopup = new CookiePopup(driver, reporter);
    }

    @Test(description = "Cookie popup should be displayed after page load")
    public void loadCalculatorPage_cookiePopupShouldBeDisplayed() {
        driver.get(CALCULATOR_PAGE_URL);

        Assertions.assertThat(cookiePopup.isCookiePopupDisplayedAfterWaiting())
                .as("Cookie popup should have displayed after page load")
                .isTrue();

        reporter.pass("Cookie popup was displayed successfully");
    }

    @Test(description = "Cookie popup should disappear after accepting cookies")
    public void acceptCookies_CookiePopupShouldDisappear() {
        driver.get(CALCULATOR_PAGE_URL);
        cookiePopup.waitForCookiePopupToBeDisplayed();

        cookiePopup.clickOnCookieAcceptButton();

        Assertions.assertThat(cookiePopup.hasCookiePopupDisappearedAfterWaiting())
                .as("Cookie popup should have disappeared")
                .isTrue();

        reporter.pass("Cookie popup has disappeared successfully");
    }

    @Test(description = "Calculator form should be displayed after page load & accepting cookies")
    public void loadPageAndAcceptCookies_CalculatorFormShouldBeDisplayed() {
        loadPageAndAcceptCookies();

        Assertions.assertThat(loanCalculatorPage.isCalculatorFormDisplayedAfterWaiting())
                .as("Calculator form should be displayed after accepting cookies")
                .isTrue();

        reporter.pass("Loan calculator page was displayed successfully");
    }

    @Test(description = "Underage applicant should receive business validation error")
    public void calculateMaximumLoan_underageApplicantShouldSeeAgeRestrictionError() {
        assertInlineValidationScenario(
                "Underage applicants should see age restriction validation message",
                PROPERTY_VALUE_MINIMUM,
                AGE_TOO_YOUNG,
                HOUSEHOLD_INCOME_LOW,
                EXISTING_INSTALLMENTS_NONE,
                () -> loanCalculatorPage.waitForAgeErrorMessage(),
                UNDERAGE_ERROR_MESSAGE,
                false);

        reporter.pass("Age restriction validation appeared and no loan offer was displayed");
    }

    @Test(description = "Property value below minimum threshold should block calculation")
    public void calculateMaximumLoan_propertyValueBelowThresholdShouldShowCollateralError() {
        assertInlineValidationScenario(
                "Applicants must provide collateral worth at least five million forints",
                PROPERTY_VALUE_BELOW_MINIMUM,
                AGE_APPROVED,
                HOUSEHOLD_INCOME_MEDIUM,
                EXISTING_INSTALLMENTS_NONE,
                () -> loanCalculatorPage.waitForPropertyValueErrorMessage(),
                PROPERTY_MINIMUM_ERROR_MESSAGE,
                false);

        reporter.pass("Collateral validation prevented loan calculation as expected");
    }

    @Test(description = "Over 65 applicant should be prompted to request a callback")
    public void calculateMaximumLoan_overSixtyFiveApplicantShouldSeeUnableToCalculateNotice() {
        assertInlineValidationScenario(
                "Applicants older than the supported limit should receive guidance to request a callback",
                PROPERTY_VALUE_MINIMUM,
                AGE_TOO_OLD,
                HOUSEHOLD_INCOME_MEDIUM,
                EXISTING_INSTALLMENTS_NONE,
                () -> loanCalculatorPage.waitForAgeErrorMessage(),
                MAX_AGE_ERROR_MESSAGE,
                false);

        reporter.pass("Over-age validation blocked the calculator and kept results hidden");
    }

    @Test(description = "Debt-to-income ratio above permitted threshold should trigger validation")
    public void calculateMaximumLoan_debtRatioAboveLimitShouldShowObligationError() {
        assertInlineValidationScenario(
                "Existing obligations above the allowed ratio should surface a validation error",
                PROPERTY_VALUE_MINIMUM,
                AGE_APPROVED,
                HOUSEHOLD_INCOME_RISKY,
                EXISTING_INSTALLMENTS_HIGH,
                () -> loanCalculatorPage.waitForExistingInstallmentsErrorMessage(),
                DEBT_TO_INCOME_ERROR_MESSAGE,
                true);

        reporter.pass("Debt-to-income validation blocked calculation when obligations exceeded the limit");
    }

    @Test(description = "Eligible borrowers with acceptable ratios should receive loan offers")
    public void calculateMaximumLoan_incomeAtThresholdWithValidDebtRatioShouldReturnOffers() {
        loadPageAndAcceptCookies();
        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();

        loanCalculatorPage.selectSingleHousehold();
        fillCalculatorForm(
                PROPERTY_VALUE_MINIMUM,
                AGE_APPROVED,
                HOUSEHOLD_INCOME_HIGH,
                EXISTING_INSTALLMENTS_ACCEPTABLE
        );

        loanCalculatorPage.clickCalculateButton();
        loanCalculatorPage.waitForResultsSectionToBeDisplayed();
        String firstOfferAmount = loanCalculatorPage.waitForFirstOfferLoanAmount();
        int parsedOfferAmount = Integer.parseInt(firstOfferAmount.replace(" ", ""));

        Assertions.assertThat(loanCalculatorPage.isFallbackMessageVisible())
                .as("Fallback panel should remain hidden for successful calculations")
                .isFalse();

        Assertions.assertThat(firstOfferAmount)
                .as("First loan offer amount should be populated once calculation succeeds")
                .isNotBlank();

        Assertions.assertThat(parsedOfferAmount)
                .as("Calculated loan amount should meet the minimum 4M HUF threshold")
                .isGreaterThanOrEqualTo(4_000_000);

        reporter.pass("Calculator returned loan offers when inputs satisfied all business rules");
    }

    private void assertInlineValidationScenario(String scenarioDescription,
                                                String propertyValue,
                                                String age,
                                                String householdIncome,
                                                String existingInstallments,
                                                Supplier<String> validationMessageSupplier,
                                                String expectedValidationMessage,
                                                boolean expectFallbackVisible) {
        loadPageAndAcceptCookies();
        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();
        loanCalculatorPage.selectSingleHousehold();
        fillCalculatorForm(propertyValue, age, householdIncome, existingInstallments);

        loanCalculatorPage.clickCalculateButton();
        String actualValidationMessage = validationMessageSupplier.get();
        Assertions.assertThat(actualValidationMessage)
                .as(scenarioDescription)
                .isEqualTo(expectedValidationMessage);
        Assertions.assertThat(loanCalculatorPage.isFallbackMessageVisible())
                .as("Fallback panel visibility should match scenario expectation")
                .isEqualTo(expectFallbackVisible);
        Assertions.assertThat(loanCalculatorPage.isResultsSectionVisible())
                .as("No loan offers should be displayed when validation fails")
                .isFalse();
    }

    private void loadPageAndAcceptCookies() {
        driver.get(CALCULATOR_PAGE_URL);
        cookiePopup.waitForCookiePopupToBeDisplayed();
        cookiePopup.clickOnCookieAcceptButton();
        cookiePopup.waitForCookiePopupToDisappear();
    }

    private void fillCalculatorForm(String propertyValue,
                                    String age,
                                    String householdIncome,
                                    String existingInstallments) {
        loanCalculatorPage.enterPropertyValue(propertyValue);
        loanCalculatorPage.enterAge(age);
        loanCalculatorPage.enterHouseholdIncome(householdIncome);
        loanCalculatorPage.enterExistingLoanInstallments(existingInstallments);
        loanCalculatorPage.enterOverdraftLimit(LoanCalculatorTests.OVERDRAFT_LIMIT_NONE);
    }
}
