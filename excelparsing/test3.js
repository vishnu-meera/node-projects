import * as React from 'react';
import readXlsxFile from 'read-excel-file'
import FileReaderInput from 'react-file-reader-input';
import XLSX from'xlsx';

const sheet2arr = function(sheet){
    var result = [];
    var row;
    var rowNum;
    var colNum;
    var range = XLSX.utils.decode_range(sheet['!ref']);
    for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
       row = [];
        for(colNum=range.s.c; colNum<=range.e.c; colNum++){
           var nextCell = sheet[
              XLSX.utils.encode_cell({r: rowNum, c: colNum})
           ];
           if( typeof nextCell !== 'undefined' )
                row.push(nextCell.w);
        }
        if(row.length>0) result.push(row);
    }
    return result;
 };

class InputView extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }

    handleChange = async (file) =>{
        console.log(file);
        // let data_1 = await readXlsxFile(file, { sheet: 1 });
        // let data_2 = await readXlsxFile(file, { sheet: 2 });
        // let data_3 = await readXlsxFile(file, { sheet: 3 });
        // console.log(data_1)
        // console.log(data_2)
        // console.log(data_3)
        const XLSX = require('xlsx');
        var workbook = XLSX.read(file);
    }

    handleChange2 = (e, results) => {
        //console.log("xlsx==>",results)
        results.forEach(result => {
          const [e, file] = result;
          //console.log("xlsx==>",e.target.result);
          var workbook = XLSX.read(e.target.result, {
            type: 'binary',
            cellStyles:true
          });
          
          //var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets['Roadmap'],{raw:true,cellStyles:true}); //sheet_to_row_object_array
          let y = 'Roadmap'
          var sheet = workbook.Sheets[y];
          console.log("sheet2arr==>",sheet2arr(sheet))
          //console.log("Sheet==>",sheet);
        //   for (const z in sheet) {
        //     /* all keys that do not begin with "!" correspond to cell addresses */
        //     if(z[0] === '!') continue;
        //     console.log(y + "!" + z + "=" + JSON.stringify(sheet[z]));
        //   }

          //var json_object = JSON.stringify(XL_row_object);
          //console.log("XL_row_object==>",XL_row_object);

          workbook.SheetNames.forEach(function(sheetName) {
            // Here is your object
            //console.log("SheetName==>",sheetName)
    
          })
        });
      }
      
    render() {
        return (
            // <div className="content">
            //     <input id="input" type="file" onChange={ (e) => this.handleChange2(e.target.files[0]) } className="input-file"/>
            // </div>
            <div className="content">
                <label htmlFor="my-file-input">Upload a File:</label>
                <FileReaderInput as="binary" id="my-file-input"
                                onChange={this.handleChange2}>
                <button>Select a file!</button>
                </FileReaderInput>
          </div>
        );
    }
}


  export default InputView;