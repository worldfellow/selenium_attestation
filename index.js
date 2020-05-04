const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');

var isAdmin = false;
var isLive = true;
var urlLive = 'http://mu.etranscript.in/';
var urlLocal = 'http://localhost/';




(async function autologin() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        if(isAdmin){  
        var username = 'francis@edulab.in';
        var password = 'P@ssw0rd';    
        var element = 'enterOtp';
        var url = isLive ? urlLive : urlLocal;
        await driver.get(url+'app/#/auth/login');
        await driver.findElement(By.name('email')).sendKeys(username, Key.TAB);
        await driver.findElement(By.name('password')).sendKeys(password, Key.RETURN);  
        var otp = await isItThere(driver,element)
        if(otp){
        var currenturl = (await driver.getCurrentUrl()).toString();
        console.log("currenturl : " + JSON.stringify(currenturl)); 
        if(currenturl == url+'app/#/auth/adminOtp'){
            driver.navigate().to(driver.get(url+'app/#/pages/adminPending'));
        }

        }
    }else{
        var username = 'priyankaTestUser@grr.la';
        var password = '123456';
        var url = isLive ? urlLive : urlLocal;
        await driver.get(url+'app/#/auth/login');
        await driver.findElement(By.name('email')).sendKeys(username, Key.TAB);
        await driver.findElement(By.name('password')).sendKeys(password, Key.RETURN);
         var currenturl = (await driver.getCurrentUrl()).toString();
         console.log("currenturl : " + JSON.stringify(currenturl)); 
         setTimeout(async function () {
        if(currenturl == url+'app/#/auth/login'){
            console.log("reached")
        await driver.navigate().to(driver.get(url+'app/#/pages/dashboard/attestation_page'));  
         
    }
}, 30000)
    
}

    } finally {
      //await driver.quit();
    }
  })();

  function isItThere(driver, element){
   return driver.wait(until.elementLocated(By.id(element)), 30 * 1000).then(el => {
        return el; 
    });
}