const Excel = require('exceljs');
const workbook = new Excel.Workbook();
workbook.xlsx.readFile("Sample2.xlsx")
    .then(function() {
        //console.log(data. _worksheets[0])
        let Roadmap =  workbook.getWorksheet("Roadmap");
        Roadmap.eachRow(function(row, rowNumber) {
          if(rowNumber>3){
            console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
            row.eachCell(function(cell, colNumber) {
              let cellcolor = "", fillColor = ""
              // if(typeof cell.font === 'object')
              //   cellcolor = cell.font.color
              if(typeof cell.fill === 'object')
                fillColor = cell.fill.fgColor  
              console.log('Cell ' + colNumber + ' = ' + cell + ' = ' + ' = ' + fillColor["theme"]);
            });
        }
      });
    });//worksheet.eachRow