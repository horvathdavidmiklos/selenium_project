package hu.robertszujo.seleniumproject;

public class Constant {

    public static final String UNDERAGE_ERROR_MESSAGE = "Hitelt kizárólag 18. életévüket betöltött személyek igényelhetnek.";
    public static final String PROPERTY_MINIMUM_ERROR_MESSAGE = "Minimum 5 millió forint érékű ingatlan szükséges";
    public static final String MAX_AGE_ERROR_MESSAGE = "Sajnos jelenleg nem tudunk kalkulálni, kérjük add meg adataid és visszahívunk.";
    public static final String DEBT_TO_INCOME_ERROR_MESSAGE = "A megadott jövedelemhez képest túl nagy a törlesztőrészlet.";

    public static final String PROPERTY_VALUE_MINIMUM = "5000000";
    public static final String PROPERTY_VALUE_BELOW_MINIMUM = "4999999";

    public static final String AGE_TOO_YOUNG = "17";
    public static final String AGE_APPROVED = "30";
    public static final String AGE_TOO_OLD = "66";

    public static final String HOUSEHOLD_INCOME_SINGLE_MINIMUM = "193000";
    public static final String HOUSEHOLD_INCOME_SINGLE_BELOW_MINIMUM = "192999";
    public static final String HOUSEHOLD_INCOME_DUAL_MINIMUM = "290000";
    public static final String HOUSEHOLD_INCOME_DUAL_BELOW_MINIMUM = "289999";
    public static final String HOUSEHOLD_INCOME_MEDIUM = "300000";
    public static final String HOUSEHOLD_INCOME_RISKY = "400000";
    public static final String HOUSEHOLD_INCOME_HIGH = "800000";

    public static final String EXISTING_INSTALLMENTS_NONE = "0";
    public static final String EXISTING_INSTALLMENTS_HIGH = "200001";
    public static final String EXISTING_INSTALLMENTS_ACCEPTABLE = "200000";

    public static final String OVERDRAFT_LIMIT_NONE = "0";
    public static final String OVERDRAFT_LIMIT_ACCEPTABLE = "1000000";
    public static final String OVERDRAFT_LIMIT_HIGH = "1500000";
    public static final String OVERDRAFT_LIMIT_THRESHOLD = "800000";

    // JTM ratio boundaries
    public static final String JTM_50_PERCENT_VIOLATION = "250000"; // 400k * 50% = 200k, so 250k exceeds
    public static final String JTM_60_PERCENT_VIOLATION = "260000"; // 400k * 60% = 240k, so 260k exceeds
}
