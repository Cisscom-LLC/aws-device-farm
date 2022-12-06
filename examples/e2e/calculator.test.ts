import { AppiumDriver } from "@bam.tech/appium-helper";
import { TestCase, measurePerformance } from "@perf-profiler/e2e";

const bundleId = "com.google.android.calculator";

const runTest = async () => {
  const driver = await AppiumDriver.create({
    appPackage: bundleId,
    appActivity: `${bundleId}.MainActivity`,
  });

  const testCase: TestCase = {
    beforeTest: async () => {
      driver.stopApp();
      driver.startApp();
      // await driver.findElementById("kill_ui");
    },
    run: async () => {
      // await driver.clickElementById("kill_js");
      // await driver.clickElementById("kill_ui");
      await driver.clickElementByXPath('//android.widget.ImageButton[@content-desc="7"]');
      await driver.clickElementByXPath('//android.widget.ImageButton[@content-desc="multiply"]');
      await driver.clickElementByXPath("//android.widget.ImageButton[@content-desc=\"9\"]");
      await driver.clickElementByXPath("//android.widget.ImageButton[@content-desc=\"equals\"]");
    },
    duration: 10000,
  };

  const { writeResults } = await measurePerformance(bundleId, testCase, 3);
  writeResults();
};

runTest();
