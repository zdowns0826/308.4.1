console.log("Part 1");
const data = {}
let csv_string = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor's Assistant,26";
let new_string = "";
pastFirstLine = false;
col_counter = 0;
row_counter = 0;
for (let i = 0; i <= csv_string.length; i++) {
    if ((csv_string[i] === ',' || csv_string[i] === '\n') && pastFirstLine === false) {
        data[`${new_string}`] = [];
        new_string = "";
        if (csv_string[i] === '\n') {
            let print_string = "";
            pastFirstLine = true;
            for (const dataKey in data) {
                print_string += dataKey + " ";
            }
            console.log(print_string);
        }
    }
    else if ((csv_string[i] === ',' || csv_string[i] === '\n' && pastFirstLine === true) || (i == csv_string.length && pastFirstLine === true)) { // checks for commas or \n BUT ALSO checks for end of a CSV string as well
        let keyName = Object.keys(data)[col_counter];
        data[keyName].push(new_string);
        new_string = "";
        col_counter++;
        if (col_counter == Object.keys(data).length) {
            let print_string = "";
            for (const dataKey in data) {
                print_string += data[dataKey][row_counter] + " ";
            }
            console.log(print_string);
            col_counter = 0;
            row_counter++;
        }
    }
    else {
        new_string += csv_string[i];
    }
}
console.log("Part 2");
let total_columns = Object.keys(data).length;
const two_d_array = [];
let temp_array = [];
for (i = 0; i < row_counter+1; i++) {
    for (k = 0; k < Object.keys(data).length; k++) {
        if (i == 0) {
            temp_array.push(Object.keys(data)[k]);
        }
        else {
            let keyName = Object.keys(data)[k];
            temp_array.push(data[keyName][i-1]);
        }
        if (k+1 == Object.keys(data).length) {
            two_d_array.push(temp_array);
            temp_array = [];
        }
    }
}
console.log(two_d_array);
console.log("Part 3");
const single_array = two_d_array[0];
const obj_array = [];
let myObj = {};
for (i=1; i<two_d_array.length; i++) {
    for(k=0; k<single_array.length; k++) {
        myObj[`${single_array[k]}`] = two_d_array[i][k];
        if (k==single_array.length-1) {
            obj_array.push(myObj);
            myObj = {};
        }
    }
}
console.log(obj_array);
console.log("Part 4");
obj_array.pop();
obj_array.splice(1, 0, { ID: "48", Name: "Barry", Occupation: "Runner", Age: "25" });
obj_array.push({ ID: "7", Name: "Bilbo", Occupation: "None", Age: "111" });
console.log(obj_array);
console.log("Part 5");
let new_csv = Object.keys(obj_array[0]).join() + "\n";
for (n = 0; n<total_columns; n++) {
    new_csv += Object.values(obj_array[n]).join() + "\n";
}
new_csv = new_csv.slice(0,-1);
console.log(JSON.stringify(new_csv));