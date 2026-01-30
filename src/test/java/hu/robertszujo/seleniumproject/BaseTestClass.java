package hu.robertszujo.seleniumproject;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import hu.robertszujo.seleniumproject.constants.TestContextConstants;
import hu.robertszujo.seleniumproject.pages.LoanCalculatorPage;
import hu.robertszujo.seleniumproject.pages.components.CookiePopup;
import hu.robertszujo.seleniumproject.reporter.ReporterSetup;
import hu.robertszujo.seleniumproject.webdriver.ChromeDriverOptions;
import hu.robertszujo.seleniumproject.webdriver.WebDriverSetup;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.ITestContext;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

import static hu.robertszujo.seleniumproject.constants.TestConstants.CALCULATOR_PAGE_URL;

public class BaseTestClass {

    protected WebDriver driver;
    protected CookiePopup cookiePopup;
    protected LoanCalculatorPage loanCalculatorPage;
    protected ExtentTest reporter;

    @BeforeSuite(alwaysRun = true)
    public void baseBeforeSuite() {
        new WebDriverSetup().setupChromeDriver();
        SuiteWideStorage.testReport = new ExtentReports();
        SuiteWideStorage.testReport.attachReporter(new ReporterSetup().createReporter());
    }

    @BeforeMethod(alwaysRun = true)
    public void baseBeforeMethod(ITestContext context, ITestResult result) {
        driver = new ChromeDriver(new ChromeDriverOptions().getChromeDriverOptions());
        context.setAttribute(TestContextConstants.DRIVER, driver);

        reporter = SuiteWideStorage.testReport.createTest(
                result.getMethod().getMethodName(),
                result.getMethod().getDescription());
        context.setAttribute(TestContextConstants.REPORTER, reporter);
        initializePageObjects();
    }

    @AfterMethod(alwaysRun = true)
    public void baseAfterMethod() {
        driver.quit();
    }

    @AfterSuite(alwaysRun = true)
    public void baseAfterSuite() {
        SuiteWideStorage.testReport.flush();
    };


    protected void loadPageAndAcceptCookies() {
        driver.get(CALCULATOR_PAGE_URL);
        cookiePopup.waitForCookiePopupToBeDisplayed();
        cookiePopup.clickOnCookieAcceptButton();
        cookiePopup.waitForCookiePopupToDisappear();
    }

    public void initializePageObjects() {
        loanCalculatorPage = new LoanCalculatorPage(driver, reporter);
        cookiePopup = new CookiePopup(driver, reporter);
    }




}
