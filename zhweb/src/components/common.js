export default {
    formatDate(now){
        var now = new Date(now*1000)
        var year=now.getFullYear(); 
        var month=now.getMonth()+1; 
        var date=now.getDate(); 
        var hour=now.getHours(); 
        var minute=now.getMinutes(); 
        var second=now.getSeconds(); 
        return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
    },
    loginOut() {
        localStorage.clear();
    }
}