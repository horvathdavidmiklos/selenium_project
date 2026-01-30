package hu.robertszujo.seleniumproject.utils;

import hu.robertszujo.seleniumproject.constants.ElementConstants;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ElementActions {

    public static void waitForElementToBeDisplayed(WebElement elementToBeDisplayed, WebDriver driver) {
        new WebDriverWait(driver, ElementConstants.MAX_WAIT_DURATION)
                .until(ExpectedConditions.visibilityOf(elementToBeDisplayed));
    }

    public static void waitForElementToDisappear(WebElement elementToDisappear, WebDriver driver) {
        new WebDriverWait(driver, ElementConstants.MAX_WAIT_DURATION)
                .until(ExpectedConditions.invisibilityOf(elementToDisappear));
    }

    public static void clearAndType(WebElement targetElement, String value, WebDriver driver) {
        new WebDriverWait(driver, ElementConstants.MAX_WAIT_DURATION)
                .until(ExpectedConditions.elementToBeClickable(targetElement));
        scrollIntoView(targetElement, driver);
        targetElement.click();
        targetElement.sendKeys(Keys.CONTROL + "a");
        targetElement.sendKeys(value);
    }

    public static void clickWhenClickable(WebElement elementToClick, WebDriver driver) {
        new WebDriverWait(driver, ElementConstants.MAX_WAIT_DURATION)
                .until(ExpectedConditions.elementToBeClickable(elementToClick));
        elementToClick.click();
    }

    public static void scrollIntoView(WebElement elementToScrollTo, WebDriver driver) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block: 'center'});", elementToScrollTo);
    }

    public static void waitForTextToBePresent(WebElement targetElement, WebDriver driver) {
        new WebDriverWait(driver, ElementConstants.MAX_WAIT_DURATION)
                .until(webDriver -> !targetElement.getText().trim().isEmpty());
    }

}
