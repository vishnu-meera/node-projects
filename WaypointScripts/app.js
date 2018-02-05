var options = {
    user: "vsankar",
    pass: "Rei@2018",
    instance: "https://rei2.service-now.com"
};
 
var ServiceNow = require('servicenow')(options);
var Incident = ServiceNow.Incident;
 
