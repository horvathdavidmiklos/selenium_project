//package hu.robertszujo.seleniumproject;
//
//import java.math.BigDecimal;
//import java.util.Arrays;
//import java.util.function.Function;
//
//import org.assertj.core.api.Assertions;
//import org.testng.ITestContext;
//import org.testng.ITestResult;
//import org.testng.annotations.BeforeMethod;
//import org.testng.annotations.DataProvider;
//import org.testng.annotations.Listeners;
//import org.testng.annotations.Test;
//
//import com.aventstack.extentreports.ExtentTest;
//
//import hu.robertszujo.seleniumproject.constants.TestContextConstants;
//import hu.robertszujo.seleniumproject.pages.LoanCalculatorPage;
//import hu.robertszujo.seleniumproject.pages.components.CookiePopup;
//
//import static hu.robertszujo.seleniumproject.constants.TestConstants.CALCULATOR_PAGE_URL;
//
//@Listeners(TestListener.class)
//public class LoanCalculatorTests extends BaseTestClass {
//
//
//
//        private static final NegativeScenario[] NEGATIVE_SCENARIOS = new NegativeScenario[]{
//            new NegativeScenario(
//                "Túl fiatal ügyfél",
//                formStateBuilder()
//                    .propertyValue("20000000")
//                    .age(AGE_TOO_YOUNG)
//                    .multiHousehold(true)
//                    .householdIncome(HOUSEHOLD_INCOME_HIGH)
//                    .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                    .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                    .build(),
//                    LoanCalculatorPage::waitForAgeErrorMessage,
//                    UNDERAGE_ERROR_MESSAGE,
//                    false
//            ),
//            new NegativeScenario(
//                "Túl idős ügyfél",
//                formStateBuilder()
//                    .propertyValue("20000000")
//                    .age(AGE_TOO_OLD)
//                    .multiHousehold(true)
//                    .householdIncome(HOUSEHOLD_INCOME_HIGH)
//                    .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                    .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                    .build(),
//                    LoanCalculatorPage::waitForAgeErrorMessage,
//                    MAX_AGE_ERROR_MESSAGE,
//                    false
//            ),
//            new NegativeScenario(
//                "Túl alacsony ingatlanérték",
//                formStateBuilder()
//                    .propertyValue("4900000")
//                    .age(AGE_APPROVED)
//                    .multiHousehold(true)
//                    .householdIncome(HOUSEHOLD_INCOME_HIGH)
//                    .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                    .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                    .build(),
//                    LoanCalculatorPage::waitForPropertyValueErrorMessage,
//                    PROPERTY_MINIMUM_ERROR_MESSAGE,
//                    false
//            ),
//            new NegativeScenario(
//                "1 kereső – kevés jövedelem",
//                formStateBuilder()
//                    .propertyValue("20000000")
//                    .age(AGE_APPROVED)
//                    .multiHousehold(false)
//                    .householdIncome("180000")
//                    .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                    .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                    .build(),
//                    LoanCalculatorPage::waitForHouseholdIncomeErrorMessage,
//                    null,
//                    false
//            ),
//            new NegativeScenario(
//                "2 kereső – kevés jövedelem",
//                formStateBuilder()
//                    .propertyValue("20000000")
//                    .age(AGE_APPROVED)
//                    .multiHousehold(true)
//                    .householdIncome("250000")
//                    .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                    .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                    .build(),
//                    LoanCalculatorPage::waitForHouseholdIncomeErrorMessage,
//                    null,
//                    false
//            ),
//            new NegativeScenario(
//                "JTM túllépés 50% szabály",
//                formStateBuilder()
//                    .propertyValue("20000000")
//                    .age(AGE_APPROVED)
//                    .multiHousehold(false)
//                    .householdIncome("400000")
//                    .existingInstallments("250000")
//                    .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                    .build(),
//                    LoanCalculatorPage::waitForExistingInstallmentsErrorMessage,
//                    DEBT_TO_INCOME_ERROR_MESSAGE,
//                    true
//            ),
//            new NegativeScenario(
//                "JTM túllépés 60% szabály",
//                formStateBuilder()
//                    .propertyValue("20000000")
//                    .age(AGE_APPROVED)
//                    .multiHousehold(true)
//                    .householdIncome("400000")
//                    .existingInstallments("260000")
//                    .overdraftLimit("800000")
//                    .build(),
//                    LoanCalculatorPage::waitForExistingInstallmentsErrorMessage,
//                    DEBT_TO_INCOME_ERROR_MESSAGE,
//                    true
//            )
//        };
//
//    private static final BehaviourScenario[] BEHAVIOUR_SCENARIOS = new BehaviourScenario[]{
//            new BehaviourScenario(
//                    "Ingatlan érték növelése",
//                    formStateBuilder()
//                            .propertyValue("10000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("800000")
//                            .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                            .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                            .build(),
//                    formStateBuilder()
//                            .propertyValue("20000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("800000")
//                            .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                            .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                            .build(),
//                    Measurement.MAX_LOAN_AMOUNT,
//                    ExpectedTrend.INCREASES,
//                    "Maximum loan amount should increase when property value doubles.",
//                    "Maximum loan grew after raising the property value."
//            ),
//            new BehaviourScenario(
//                    "Jövedelem növelése",
//                    formStateBuilder()
//                            .propertyValue("60000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("300000")
//                            .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                            .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                            .build(),
//                    formStateBuilder()
//                            .propertyValue("60000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("800000")
//                            .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                            .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                            .build(),
//                    Measurement.MAX_LOAN_AMOUNT,
//                    ExpectedTrend.INCREASES,
//                    "Maximum loan amount should increase when household income rises.",
//                    "Maximum loan grew after increasing household income."
//            ),
//            new BehaviourScenario(
//                    "Törlesztő növelése",
//                    formStateBuilder()
//                            .propertyValue("60000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("800000")
//                            .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                            .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                            .build(),
//                    formStateBuilder()
//                            .propertyValue("60000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("800000")
//                            .existingInstallments("150000")
//                            .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                            .build(),
//                    Measurement.MAX_LOAN_AMOUNT,
//                    ExpectedTrend.DECREASES,
//                    "Maximum loan amount should decrease when existing installments grow.",
//                    "Maximum loan dropped after existing installments increased."
//            ),
//            new BehaviourScenario(
//                    "Hitelkeret növelése",
//                    formStateBuilder()
//                            .propertyValue("60000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("800000")
//                            .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                            .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                            .build(),
//                    formStateBuilder()
//                            .propertyValue("60000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("800000")
//                            .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                            .overdraftLimit("1500000")
//                            .build(),
//                    Measurement.MAX_LOAN_AMOUNT,
//                    ExpectedTrend.DECREASES,
//                    "Maximum loan amount should decrease when revolving credit limits increase.",
//                    "Maximum loan dropped after raising the revolving credit limit."
//            ),
//            new BehaviourScenario(
//                    "Biztosítás hatása",
//                    formStateBuilder()
//                            .propertyValue("20000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("800000")
//                            .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                            .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                            .insuranceSelected(false)
//                            .build(),
//                    formStateBuilder()
//                            .propertyValue("20000000")
//                            .age(AGE_APPROVED)
//                            .multiHousehold(true)
//                            .householdIncome("800000")
//                            .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                            .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                            .insuranceSelected(true)
//                            .build(),
//                    Measurement.THM,
//                    ExpectedTrend.DECREASES,
//                    "THM should decrease when the repayment protection insurance benefit is enabled.",
//                    "THM decreased after enabling repayment protection insurance."
//            )
//    };
//
//    private static final SuccessScenario[] BOUNDARY_SCENARIOS = new SuccessScenario[]{
//        new SuccessScenario(
//                "Minimum életkor",
//                formStateBuilder()
//                        .propertyValue("20000000")
//                        .age("18")
//                        .multiHousehold(true)
//                        .householdIncome(HOUSEHOLD_INCOME_HIGH)
//                        .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                        .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                        .build(),
//                Measurement.MAX_LOAN_AMOUNT,
//                "Loan offers should remain available at the minimum eligible age."
//        ),
//        new SuccessScenario(
//                "Felső korhatár",
//                formStateBuilder()
//                        .propertyValue("20000000")
//                        .age("66") //FIXME 65?("65 éves kor felett, 65év+1nap?)
//                        .multiHousehold(true)
//                        .householdIncome(HOUSEHOLD_INCOME_HIGH)
//                        .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                        .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                        .build(),
//                Measurement.MAX_LOAN_AMOUNT,
//                "Loan offers should remain available up to the upper age limit."
//        ),
//        new SuccessScenario(
//                "Minimum ingatlanérték",
//                formStateBuilder()
//                        .propertyValue(PROPERTY_VALUE_MINIMUM)
//                        .age(AGE_APPROVED)
//                        .multiHousehold(true)
//                        .householdIncome(HOUSEHOLD_INCOME_HIGH)
//                        .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                        .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                        .build(),
//                Measurement.MAX_LOAN_AMOUNT,
//                "Minimum property value should still unlock loan offers."
//        ),
//        new SuccessScenario(
//                "1 kereső minimum jövedelem",
//                formStateBuilder()
//                        .propertyValue("20000000")
//                        .age(AGE_APPROVED)
//                        .multiHousehold(false)
//                        .householdIncome(HOUSEHOLD_INCOME_LOW)
//                        .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                        .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                        .build(),
//                Measurement.MAX_LOAN_AMOUNT,
//                "Single-earner minimum income should pass affordability checks."
//        ),
//        new SuccessScenario(
//                "2 kereső minimum jövedelem",
//                formStateBuilder()
//                        .propertyValue("20000000")
//                        .age(AGE_APPROVED)
//                        .multiHousehold(true)
//                        .householdIncome("290000")
//                        .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                        .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                        .build(),
//                Measurement.MAX_LOAN_AMOUNT,
//                "Dual-earner minimum income should pass affordability checks."
//        ),
//        new SuccessScenario(
//                "JTM határ 800k hitelnél",
//                formStateBuilder()
//                        .propertyValue("20000000")
//                        .age(AGE_APPROVED)
//                        .multiHousehold(true)
//                        .householdIncome(HOUSEHOLD_INCOME_RISKY)
//                        .existingInstallments("240000")
//                        .overdraftLimit("800000")
//                        .build(),
//                Measurement.MAX_LOAN_AMOUNT,
//                "Loan offers should remain available at the regulatory JTM boundary."
//        )
//    };
//
//            private static final SuccessScenario[] POSITIVE_SCENARIOS = new SuccessScenario[]{
//            new SuccessScenario(
//                "Sikeres alap kalkuláció",
//                formStateBuilder()
//                    .propertyValue("20000000")
//                    .age(AGE_APPROVED)
//                    .multiHousehold(true)
//                    .householdIncome(HOUSEHOLD_INCOME_HIGH)
//                    .existingInstallments(EXISTING_INSTALLMENTS_NONE)
//                    .overdraftLimit(OVERDRAFT_LIMIT_NONE)
//                    .build(),
//                Measurement.MAX_LOAN_AMOUNT,
//                "Baseline scenario should yield loan offers without triggering fallback."
//            )
//            };
//
//    @BeforeMethod(alwaysRun = true)
//    public void beforeMethod(ITestContext context, ITestResult result) {
//        reporter = SuiteWideStorage.testReport.createTest(
//                result.getMethod().getMethodName(),
//                result.getMethod().getDescription());
//        context.setAttribute(TestContextConstants.REPORTER, reporter);
//        initializePageObjects();
//    }
//
//    public void initializePageObjects() {
//        loanCalculatorPage = new LoanCalculatorPage(driver, reporter);
//        cookiePopup = new CookiePopup(driver, reporter);
//    }
//
//    @Test(description = "Cookie popup should be displayed after page load")
//    public void loadCalculatorPage_cookiePopupShouldBeDisplayed() {
//        driver.get(CALCULATOR_PAGE_URL);
//
//        Assertions.assertThat(cookiePopup.isCookiePopupDisplayedAfterWaiting())
//                .as("Cookie popup should have displayed after page load")
//                .isTrue();
//
//        reporter.pass("Cookie popup was displayed successfully");
//    }
//
//    @Test(description = "Cookie popup should disappear after accepting cookies")
//    public void acceptCookies_CookiePopupShouldDisappear() {
//        driver.get(CALCULATOR_PAGE_URL);
//        cookiePopup.waitForCookiePopupToBeDisplayed();
//
//        cookiePopup.clickOnCookieAcceptButton();
//
//        Assertions.assertThat(cookiePopup.hasCookiePopupDisappearedAfterWaiting())
//                .as("Cookie popup should have disappeared")
//                .isTrue();
//
//        reporter.pass("Cookie popup has disappeared successfully");
//    }
//
//    @Test(description = "Calculator form should be displayed after page load & accepting cookies")
//    public void loadPageAndAcceptCookies_CalculatorFormShouldBeDisplayed() {
//        loadPageAndAcceptCookies();
//
//        Assertions.assertThat(loanCalculatorPage.isCalculatorFormDisplayedAfterWaiting())
//                .as("Calculator form should be displayed after accepting cookies")
//                .isTrue();
//
//        reporter.pass("Loan calculator page was displayed successfully");
//    }
//
//    @DataProvider(name = "negativeLoanScenarios")
//    public Object[][] negativeLoanScenarios() {
//        return Arrays.stream(NEGATIVE_SCENARIOS)
//                .map(NegativeScenario::toDataRow)
//                .toArray(Object[][]::new);
//    }
//
//    @DataProvider(name = "monotonicBehaviourScenarios")
//    public Object[][] monotonicBehaviourScenarios() {
//        return Arrays.stream(BEHAVIOUR_SCENARIOS)
//                .map(BehaviourScenario::toDataRow)
//                .toArray(Object[][]::new);
//    }
//
//    @DataProvider(name = "boundarySuccessScenarios")
//    public Object[][] boundarySuccessScenarios() {
//        return Arrays.stream(BOUNDARY_SCENARIOS)
//                .map(SuccessScenario::toDataRow)
//                .toArray(Object[][]::new);
//    }
//
//    @DataProvider(name = "positiveScenarios")
//    public Object[][] positiveScenarios() {
//        return Arrays.stream(POSITIVE_SCENARIOS)
//                .map(SuccessScenario::toDataRow)
//                .toArray(Object[][]::new);
//    }
//
//        @Test(description = "Invalid inputs should trigger the appropriate business validation", dataProvider = "negativeLoanScenarios")
//        public void calculateMaximumLoan_negativeBusinessValidation(NegativeScenario scenario) {
//        loadPageAndAcceptCookies();
//        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();
//        scenario.formState().apply(loanCalculatorPage);
//
//        loanCalculatorPage.clickCalculateButton();
//        String actualValidationMessage = scenario.validationMessageFetcher().apply(loanCalculatorPage);
//
//        if (scenario.expectedValidationMessage() != null) {
//            Assertions.assertThat(actualValidationMessage)
//                .as("Validation message should match the expected content")
//                .isEqualTo(scenario.expectedValidationMessage());
//        } else {
//            Assertions.assertThat(actualValidationMessage)
//                .as("Validation message should be populated")
//                .isNotBlank();
//        }
//
//        Assertions.assertThat(loanCalculatorPage.isFallbackMessageVisible())
//            .as("Fallback panel visibility should match scenario expectation")
//            .isEqualTo(scenario.expectFallbackVisible());
//
//        Assertions.assertThat(loanCalculatorPage.isResultsSectionVisible())
//            .as("Loan offers must remain hidden when validation fails")
//            .isFalse();
//
//        reporter.pass("Validation message shown: " + actualValidationMessage);
//    }
//
//    @Test(description = "Calculator results should remain monotonic across key business levers", dataProvider = "monotonicBehaviourScenarios")
//    public void calculateMaximumLoan_monotonicBehaviourShouldMatchExpectations(BehaviourScenario scenario) {
//        BigDecimal baselineMeasurement = evaluateMeasurement(scenario.baselineState(), scenario.measurement());
//        BigDecimal modifiedMeasurement = evaluateMeasurement(scenario.modifiedState(), scenario.measurement());
//
//        scenario.expectedTrend().assertTrend(baselineMeasurement, modifiedMeasurement, scenario.expectationDescription());
//
//        reporter.pass(scenario.buildSuccessLog(baselineMeasurement, modifiedMeasurement));
//    }
//
//    @Test(description = "Successful base calculation should produce loan offers", dataProvider = "positiveScenarios")
//    public void calculateMaximumLoan_successfulScenarioShouldDisplayResults(SuccessScenario scenario) {
//        loadPageAndAcceptCookies();
//        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();
//        scenario.formState().apply(loanCalculatorPage);
//
//        loanCalculatorPage.clickCalculateButton();
//        loanCalculatorPage.waitForResultsSectionToBeDisplayed();
//        BigDecimal measuredValue = scenario.measurement().read(loanCalculatorPage);
//
//        Assertions.assertThat(loanCalculatorPage.isFallbackMessageVisible())
//                .as("Fallback panel should stay hidden for successful scenarios")
//                .isFalse();
//
//        Assertions.assertThat(measuredValue)
//                .as(scenario.expectationDescription())
//                .isGreaterThan(BigDecimal.ZERO);
//
//        reporter.pass(scenario.buildSuccessLog(measuredValue));
//    }
//
//    @Test(description = "Boundary values should still yield loan offers", dataProvider = "boundarySuccessScenarios")
//    public void calculateMaximumLoan_boundaryValuesShouldReturnOffers(SuccessScenario scenario) {
//        loadPageAndAcceptCookies();
//        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();
//        scenario.formState().apply(loanCalculatorPage);
//
//        loanCalculatorPage.clickCalculateButton();
//        loanCalculatorPage.waitForResultsSectionToBeDisplayed();
//        BigDecimal measuredValue = scenario.measurement().read(loanCalculatorPage);
//
//        Assertions.assertThat(loanCalculatorPage.isFallbackMessageVisible())
//                .as("Fallback panel should remain hidden for boundary scenarios")
//                .isFalse();
//
//        Assertions.assertThat(measuredValue)
//                .as(scenario.expectationDescription())
//                .isGreaterThan(BigDecimal.ZERO);
//
//        reporter.pass(scenario.buildSuccessLog(measuredValue));
//    }
//
//    private BigDecimal evaluateMeasurement(FormState formState, Measurement measurement) {
//        loadPageAndAcceptCookies();
//        loanCalculatorPage.waitForCalculatorFormToBeDisplayed();
//        formState.apply(loanCalculatorPage);
//
//        loanCalculatorPage.clickCalculateButton();
//        loanCalculatorPage.waitForResultsSectionToBeDisplayed();
//        return measurement.read(loanCalculatorPage);
//    }
//
//    private void loadPageAndAcceptCookies() {
//        driver.get(CALCULATOR_PAGE_URL);
//        cookiePopup.waitForCookiePopupToBeDisplayed();
//        cookiePopup.clickOnCookieAcceptButton();
//        cookiePopup.waitForCookiePopupToDisappear();
//    }
//
//
//
//    private static BigDecimal parseCurrencyValue(String rawAmount) {
//        String numericOnly = rawAmount.replaceAll("[^0-9]", "");
//        return new BigDecimal(numericOnly);
//    }
//
//    private static BigDecimal parseThmValue(String rawThm) {
//        String normalized = rawThm.replace("%", "").replace(" ", "").replace(",", ".").trim();
//        return new BigDecimal(normalized);
//    }
//
//    private static FormStateBuilder formStateBuilder() {
//        return new FormStateBuilder();
//    }
//
//    private static final class BehaviourScenario {
//        private final String name;
//        private final FormState baselineState;
//        private final FormState modifiedState;
//        private final Measurement measurement;
//        private final ExpectedTrend expectedTrend;
//        private final String expectationDescription;
//        private final String successMessage;
//
//        private BehaviourScenario(String name,
//                                  FormState baselineState,
//                                  FormState modifiedState,
//                                  Measurement measurement,
//                                  ExpectedTrend expectedTrend,
//                                  String expectationDescription,
//                                  String successMessage) {
//            this.name = name;
//            this.baselineState = baselineState;
//            this.modifiedState = modifiedState;
//            this.measurement = measurement;
//            this.expectedTrend = expectedTrend;
//            this.expectationDescription = expectationDescription;
//            this.successMessage = successMessage;
//        }
//
//        private Object[] toDataRow() {
//            return new Object[]{this};
//        }
//
//        private FormState baselineState() {
//            return baselineState;
//        }
//
//        private FormState modifiedState() {
//            return modifiedState;
//        }
//
//        private Measurement measurement() {
//            return measurement;
//        }
//
//        private ExpectedTrend expectedTrend() {
//            return expectedTrend;
//        }
//
//        private String expectationDescription() {
//            return expectationDescription;
//        }
//
//        private String buildSuccessLog(BigDecimal baseline, BigDecimal modified) {
//            return successMessage + " Baseline: " + measurement.format(baseline) + ", Modified: " + measurement.format(modified);
//        }
//
//        @Override
//        public String toString() {
//            return name;
//        }
//    }
//
//    private static final class SuccessScenario {
//        private final String name;
//        private final FormState formState;
//        private final Measurement measurement;
//        private final String expectationDescription;
//
//        private SuccessScenario(String name,
//                                FormState formState,
//                                Measurement measurement,
//                                String expectationDescription) {
//            this.name = name;
//            this.formState = formState;
//            this.measurement = measurement;
//            this.expectationDescription = expectationDescription;
//        }
//
//        private Object[] toDataRow() {
//            return new Object[]{this};
//        }
//
//        private FormState formState() {
//            return formState;
//        }
//
//        private Measurement measurement() {
//            return measurement;
//        }
//
//        private String expectationDescription() {
//            return expectationDescription;
//        }
//
//        private String buildSuccessLog(BigDecimal measuredValue) {
//            return name + " succeeded with " + measurement.format(measuredValue);
//        }
//
//        @Override
//        public String toString() {
//            return name;
//        }
//    }
//
//    private enum Measurement {
//        MAX_LOAN_AMOUNT(LoanCalculatorPage::waitForFirstOfferLoanAmount, LoanCalculatorTests::parseCurrencyValue, " Ft"),
//        THM(LoanCalculatorPage::waitForFirstOfferThm, LoanCalculatorTests::parseThmValue, " %");
//
//        private final Function<LoanCalculatorPage, String> valueFetcher;
//        private final Function<String, BigDecimal> valueParser;
//        private final String unitSuffix;
//
//        Measurement(Function<LoanCalculatorPage, String> valueFetcher,
//                    Function<String, BigDecimal> valueParser,
//                    String unitSuffix) {
//            this.valueFetcher = valueFetcher;
//            this.valueParser = valueParser;
//            this.unitSuffix = unitSuffix;
//        }
//
//        private BigDecimal read(LoanCalculatorPage page) {
//            return valueParser.apply(valueFetcher.apply(page));
//        }
//
//        private String format(BigDecimal value) {
//            return value.stripTrailingZeros().toPlainString() + unitSuffix;
//        }
//    }
//
//    private enum ExpectedTrend {
//        INCREASES {
//            @Override
//            void assertTrend(BigDecimal baseline, BigDecimal modified, String description) {
//                Assertions.assertThat(modified)
//                        .as(description)
//                        .isGreaterThan(baseline);
//            }
//        },
//        DECREASES {
//            @Override
//            void assertTrend(BigDecimal baseline, BigDecimal modified, String description) {
//                Assertions.assertThat(modified)
//                        .as(description)
//                        .isLessThan(baseline);
//            }
//        };
//
//        abstract void assertTrend(BigDecimal baseline, BigDecimal modified, String description);
//    }
//
//
//
//    private static final class FormStateBuilder {
//        private String propertyValue = PROPERTY_VALUE_MINIMUM;
//        private String age = AGE_APPROVED;
//        private boolean multiHousehold;
//        private String householdIncome = HOUSEHOLD_INCOME_MEDIUM;
//        private String existingInstallments = EXISTING_INSTALLMENTS_NONE;
//        private String overdraftLimit = OVERDRAFT_LIMIT_NONE;
//        private boolean insuranceSelected;
//
//        private FormStateBuilder propertyValue(String propertyValue) {
//            this.propertyValue = propertyValue;
//            return this;
//        }
//
//        private FormStateBuilder age(String age) {
//            this.age = age;
//            return this;
//        }
//
//        private FormStateBuilder multiHousehold(boolean multiHousehold) {
//            this.multiHousehold = multiHousehold;
//            return this;
//        }
//
//        private FormStateBuilder householdIncome(String householdIncome) {
//            this.householdIncome = householdIncome;
//            return this;
//        }
//
//        private FormStateBuilder existingInstallments(String existingInstallments) {
//            this.existingInstallments = existingInstallments;
//            return this;
//        }
//
//        private FormStateBuilder overdraftLimit(String overdraftLimit) {
//            this.overdraftLimit = overdraftLimit;
//            return this;
//        }
//
//        private FormStateBuilder insuranceSelected(boolean insuranceSelected) {
//            this.insuranceSelected = insuranceSelected;
//            return this;
//        }
//
//        private FormState build() {
//            return new FormState(propertyValue, age, multiHousehold, householdIncome, existingInstallments, overdraftLimit, insuranceSelected);
//        }
//    }
//}
