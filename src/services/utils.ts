

const formateAddress = (s:string)=>{
    return s.slice(0, 6)+"..."+s.slice(36,42)
}


function timeConverter(UNIX_timestamp: any) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
  
    var time = date + ' ' + month + ' ' + year;
    return time;
  }


export{
    formateAddress,
    timeConverter
}