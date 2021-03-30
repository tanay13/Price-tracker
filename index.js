const puppeteer = require('puppeteer')
const $ = require('cheerio')
const CronJob = require('cron').CronJob
const nodemailer = require('nodemailer');

const url = "https://www.amazon.in/Sony-WH-1000XM4-Cancelling-Headphones-Bluetooth/dp/B0863TXGM3/"

async function configBrowser()
{
    const browser = await puppeteer.launch()

    const page = await browser.newPage();

    await page.goto(url);
    return page;
}

async function checkprice(page)
{
    await page.reload();
    let html = await page.evaluate(()=>{
        return document.body.innerHTML;
    })
    $('#priceblock_ourprice',html).each(function(){
        let Price = $(this).text()
        let currentPrice = Number(Price.replace(/[^0-9.-]+/g,""));
        if(currentPrice<20000){
            console.log("Price Fall - BUY!!!!" + price)
        }
        else{
            console.log("Can wait for sometime"+price)
        }
    })
    
    
}

async function monitor()
{
    let page = await configBrowser();
    await checkprice(page);
}

async function startTracking(){
    const page = await configBrowser();
    const job = new CronJob('*/15* * * * *',function(){
        checkprice(page);
    },null,true,null,null,true)
    job.start();
}

async function sendNotification(){
    var transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:'rtanay65@gmail.com',
            pass:"Lavairis504q@"
        }
    })

    
}


startTracking();


monitor()




