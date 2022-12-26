*******************How to Install Playwright*********************
1. In VsCode install the package  "Playwright Test for VSCode"
2. Press "Ctrl + Shift + p" and type "Playwright".
3. Select the Broswer and hit 'Ok'


* To Excute test in multiple environment We need to install two pakages
    1. npm install dotenv --save   -------> (https://github.com/motdotla/dotenv)
    2. npm install --save-dev cross-env ------>(https://github.com/kentcdodds/cross-env) 


* To download the latest version you user command
    npm i


* install Allure-report => 
    npm i -D @playwright/test allure-playwright
    npm i -D allure-commandline (To add command line pakge in project)

To ope a allure report from command line reqiore following command, install it in your machine 
    npm i -g allure-commandline

* You can debug the playwright script but omly javascript file
    PWDEBUG=1 node filename;

* Added this for testing the braches