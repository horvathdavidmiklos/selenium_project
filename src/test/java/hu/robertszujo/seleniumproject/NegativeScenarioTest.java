package hu.robertszujo.seleniumproject;

import hu.robertszujo.seleniumproject.pages.LoanCalculatorPage;
import lombok.Getter;
import lombok.Setter;

import java.util.function.Function;

public class NegativeScenario extends BaseTestClass{
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
    private static final String HOUSEHOLD_INCOME_HIGH = "800000";

    private static final String EXISTING_INSTALLMENTS_NONE = "0";
    private static final String EXISTING_INSTALLMENTS_HIGH = "200001";
    private static final String EXISTING_INSTALLMENTS_ACCEPTABLE = "200000";

    private static final String OVERDRAFT_LIMIT_NONE = "0";

    private NegativeScenario scenario =;


    private NegativeScenario createNegativeScenario(){
        return new NegativeScenario()
                ;
    }



    private static final class NegativeScenario {


        private final String name;
        private final LoanCalculatorTests.FormState formState;
        private final Function<LoanCalculatorPage, String> validationMessageFetcher;
        private final String expectedValidationMessage;
        private final boolean expectFallbackVisible;
    }
}
