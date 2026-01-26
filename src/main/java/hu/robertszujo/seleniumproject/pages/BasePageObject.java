package hu.robertszujo.seleniumproject.pages;

import com.aventstack.extentreports.ExtentTest;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class BasePageObject {

    protected WebDriver driver;
    protected ExtentTest reporter;

    public BasePageObject(WebDriver driver, ExtentTest reporter) {
        this.driver = driver;
        this.reporter = reporter;
        PageFactory.initElements(driver, this);
    }
}
