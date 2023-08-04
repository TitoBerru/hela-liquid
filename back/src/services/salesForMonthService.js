const path = require("path");
const fs = require("fs");
const cmvFilePath = path.join(__dirname, "../dataBase/cmvJson.json");
let cmv = JSON.parse(fs.readFileSync(cmvFilePath, "utf-8"));
let TotalForMonthDetail =[];
let totalForMonthCost = 0;
function convertToISODate(cmv) {
    const [day, month, yearAndTime] = cmv.split('/');
    const [year, time] = yearAndTime.split(', ');
    const [hours, minutes, seconds] = time.split(':');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours}:${minutes}:${seconds}`;
  }
const salesForMonth ={
    salesForMontDetail :(month)=> {
            return cmv.filter(item => {
                const createdAtDate = new Date(convertToISODate(item.createdAt));
                
                if (createdAtDate.getMonth() === month){
                    TotalForMonthDetail.push(item)
                };
            }
            )
    },
    salesForMontCost :(month)=>{
        
        salesForMonth.salesForMontDetail(month)
        // let totalesenpesos = TotalForMonthDetail.map(item => item.nico *2)
        // totalForMonthCost = totalForMonthCost + (TotalForMonthDetail[0].nico +TotalForMonthDetail[0].Vg + TotalForMonthDetail[0].Pg + TotalForMonthDetail[0].totalEsencias + TotalForMonthDetail[0].frasco)*TotalForMonthDetail[0].quantity;
        let reduce = TotalForMonthDetail.reduce((acum, actual) =>)

       

        totalForMonthCost = TotalForMonthDetail.map(item => Math.round(totalForMonthCost) + (Math.round(item.nico) +Math.round(item.Vg) + Math.round(item.Pg) + Math.round(item.totalEsencias) + Math.round(item.frasco))*item.quantity
            
            )
            // console.log('linea 36 de salesForMonthService', totalForMonthCost)
        // console.log('linea 27', TotalForMonthDetail[0].nico)
       }

    

    
}

module.exports = salesForMonth;
salesForMonth.salesForMontCost(7)
console.log ('console.log desde linea 47 salesForMonthServices: ', totalForMonthCost)