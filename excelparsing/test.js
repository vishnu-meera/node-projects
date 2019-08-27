import parseXlsx from 'excel';

const roadMapParseConstant = {
    'Public Announcement' :  1,
    'CAPEX Approved':2,
    'Lease Signed':3,
    'TAM Award':4,
    'Colo Ready':5,
    'Dock Date':6,
    'RTEG Network':7,
    'RTEG Server':8,
    'RTEG':9,
    'Preview':10,
    'O365 Services':11,
    'Azure GA':12,
    'Engineering Readiness':13,
    'Office GA':14
}
parseXlsx('Sample2.xlsx','1').then((data) => {
    let test1 = (data.map(y=>y.filter(x=>x.length !== 0))).filter(x=>x.length > 0);
    //console.log(test1)
    let somearray =[];
    
    for (let index = 3; index < test1.length; index++) {
        const element = test1[index];
        let obj = {};
        obj["PartitionKey"] = "Countries";
        obj["RowKey"] = element[0];
        obj["CountryStatus"] = "Live";
        
    }
});