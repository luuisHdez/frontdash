function request(){
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("Access-Token", "571d97217dd898376de2bc99be7756ee4613c580");
myHeaders.append("Cookie", "session_id=5200adebd38ac2c0afaf3dd2275c9b070e51587f");

var urlencoded = new URLSearchParams();
urlencoded.append("date_from", "2020-03-01  05:42:55");
urlencoded.append("date_to", "2020-03-02 20:00:00");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch("http://192.168.1.15:8040/api/pos_order_line", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
