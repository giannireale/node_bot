

const { Telegraf } = require('telegraf')
const xlsx  = require ('node-xlsx');
randomCount = 1;
pools = [];
const bot = new Telegraf('1777018787:AAFTMxLFi_cQcS4lNDIZ6WqhEV_P5O87obo');
bot.command('quit', (ctx) => {
    // Explicit usage
    ctx.telegram.leaveChat(ctx.message.chat.id)

    // Using context shortcut
    ctx.leaveChat()
})

bot.on('message', (ctx) => {
    // Explicit usage
    console.log("start");
    // Using context shortcut
    if(ctx.message.text != null && ctx.message.text.startsWith("/start")) {
        param = null;
        if(ctx.message.text.includes(" ")) {
            p = ctx.message.text.split(" ");
            param = p[1];
        }
        createPolls(ctx, param);
        forLoop(ctx)
        
    }

})

const forLoop = async ctx => {
    console.log("Start");
    
    for (let index = 0; index < pools.length; index++) {
        const pool = pools[index];
        await sendPoll(ctx, pool);
    }
    
   console.log("End");
   };

   const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
   };
   
   const sendPoll = (ctx, element) => {
    return sleep(400).then(v => ctx.telegram.sendQuiz(element.chat_id, element.question, element.options, {correct_option_id:element.correct_option_id}));
   };


function rollWb(ctx, wb, j) {
    sheet = wb[j].data;
    
    row = null;
    cell = null;
    rows = sheet.length;
    cols = 6; // No of columns
    tmp = 0;

    pools = [];
    for(r = 0; r < rows; r++) {
        options = [];
       
        correctOptionId = 0;
        question =  "test";
        
        row = sheet[r];
        
        if(r == 0 ) continue;
        
        if(row != null) {
            
            for(c = 0; c < cols; c++) {
                cell = row[c];
                if(cell != null) {
                    
                    switch (c) {
                    case 0:
                        value = cell;
                        
                        if(value != null && ((value >=1 &&
                                value <=	57) ||
                                (value >=167 &&
                                value <=	265)||
                                (value >=398 &&
                                value <=	474)||
                                (value >=606 &&
                                value <=	688)
                                )) {
                            correctOptionId = 0
                        } else if(value != null && (( value >=58 &&
                                value <=	109) ||
                                (value >=266 &&
                                value <=	320)||
                                (value >=475 &&
                                value <=	543)||
                                (value >=689 &&
                                value <=	755))) {
                            correctOptionId = 1
                        } else if(value != null && ((value >=110 &&
                                value <=	170)||
                                (value >=321 &&
                                value <=	397)||
                                (value >=544 &&
                                value <=	605)||
                                (value >=756 &&
                                value <=	837))) {
                            correctOptionId = 2
                        }
                        break;
                    case 2:
                        question = "#" + randomCount + " - " + cell.substring(0, cell.length > 100 ? 99 : cell.length);
                        break;
                    case 3:
                        options.push(cell.substring(0, cell.length > 100 ? 99 : cell.length));
                        break;
                    case 4:
                        options.push(cell.substring(0, cell.length > 100 ? 99 : cell.length));
                        break;
                    case 5:
                        options.push(cell.substring(0, cell.length > 100 ? 99 : cell.length));
                        break;

                    default:
                        break;
                    }
                    
                    
                }
            }
        }
        if(r > 0 ) {
            let obj = {};
            Object.assign(obj, {chat_id:ctx.message.chat.id, question : question, options : options, correct_option_id : correctOptionId });
            pools.push(obj);
            randomCount++;
        }
    }
}

function createPolls(ctx, param) {
    try {
        const wb = xlsx.parse(`${__dirname}/q.xlsx`);
        j = param != null ? param-1 : Math.floor(Math.random() * 8);
        rollWb(ctx, wb, j);
        randomCount = 1;  
    } catch(ioe) {
       console.log(ioe)
    }
    
}


bot.launch().then(() => console.log("Bot Started!"))
.catch((e) => console.error("Uh oh, bot didn't start: ", e.toString()));

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))