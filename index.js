const mqtt = require("mqtt");
const mqttclient = mqtt.connect('mqtt://18.118.84.253:1883/', {username: "admin", password: "R3m0t3#233*"});
const mysql = require('mysql');

const topic = 't';

var wei;
var oxi;
var wch;
var bp;

var jsonWei;
var jsonOxi;
var jsonWch;
var jsonBp;

var db = mysql.createConnection({
  host     : 'patient.cjkt9nomzgoo.us-east-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'Satelite233*',
  port     : 3306,
  database : 'db_rpm_remotem',
});

db.connect((err) => {
  if(err) throw err;
  console.log('Database Connected..');
});


function decode_date(timestamp){
  var timestamp = timestamp - 14400;
  return (new Date(timestamp * 1000).toISOString().slice(0, 19).replace('T', ' '));
}

try {
  mqttclient.on('connect', function () { // When connected
    console.log('Client connected');
    //subscribe to a topic
    mqttclient.subscribe([topic], function () {
    mqttclient.on('message', function (topic, message, packet) {

    if (JSON.parse(message.toString()).from == "GATEWAY"){
      report = message;

      var mac = JSON.parse(report.toString()).data.mac;
      var version = JSON.parse(report.toString()).data.value.version;
      var model = JSON.parse(report.toString()).data.value.model;
      var factory = JSON.parse(report.toString()).data.value.factory;
      var current_time = decode_date(parseInt(JSON.parse(report.toString()).data.value.current_time));
      var uptime = JSON.parse(report.toString()).data.value.uptime;
      var wireless_ip = JSON.parse(report.toString()).data.value.wireless_ip;
      var uplinkType = JSON.parse(report.toString()).data.value.uplinkType;
      var deviceCode = JSON.parse(report.toString()).deviceCode;

      let postx = {"mac": mac, "version": version, "model": model, "factory": factory, "time": current_time, "uptime": uptime, "wireless_ip": wireless_ip, "uplinkType": uplinkType, "deviceCode": deviceCode};
      let sqlx = 'INSERT INTO gateway_report SET ?';
      db.query(sqlx, postx, (err, result) => {
          if(err) throw err;
          console.log("Gateway Report Data inserted");
      });

    }

	  if ((JSON.parse(message.toString()).data?.value?.device_list?.[0]) !== undefined) {

          var attribute = JSON.parse(message.toString()).data.attribute;
          console.log(attribute);

          if (attribute == 'BLE_weight_scale'){ //Weight
            wei = message;
            jsonWei= JSON.parse(wei.toString()).data.value.device_list[0];

            var mac1 = JSON.parse(wei.toString()).mac;
            var time1 = decode_date(parseInt(JSON.parse(wei.toString()).time));
            var ip1 = JSON.parse(wei.toString()).deviceCode;
            var ble_addr1 = JSON.parse(wei.toString()).data.value.device_list[0].ble_addr;

            let post1 = {"weight": jsonWei.weight, "ble_addr": ble_addr1, "get_time": time1, "mac": mac1, "ip": ip1};
	          let sql1 = 'INSERT INTO tbl_rpm_weight SET ?';
            db.query(sql1, post1, (err, result) => {
                if(err) throw err;
                console.log("weight data inserted");
            });
          }

          if (attribute == 'BLE_Oximeter'){ //Oximeter
            oxi = message;
            jsonOxi = JSON.parse(oxi.toString()).data.value.device_list[0];

            var mac2 = JSON.parse(oxi.toString()).mac;
            var time2 = decode_date(parseInt(JSON.parse(oxi.toString()).time));
	          var ip2 = JSON.parse(oxi.toString()).deviceCode;
            var ble_addr2 = JSON.parse(oxi.toString()).data.value.device_list[0].ble_addr;

            let post1 = {"spo2": jsonOxi.spo2, "pulse": jsonOxi.pulse, "pi": jsonOxi.pi, "ble_addr": ble_addr2, "get_time": time2, "mac": mac2, "ip": ip2};
            let sql1 = 'INSERT INTO tbl_rpm_oximeter SET ?';
            db.query(sql1, post1, (err, result) => {
                if(err) throw err;
                console.log("Oximeter data inserted");
            });
          }
          if (attribute == 'BLE_watch_temp'){ //Watch
            wch = message;
            jsonWch = JSON.parse(wch.toString()).data.value.device_list[0];

            var mac3 = JSON.parse(wch.toString()).mac;
            var time3 = decode_date(parseInt(JSON.parse(wch.toString()).time));
  	        var ip3 = JSON.parse(wch.toString()).deviceCode;
            var ble_addr3 = JSON.parse(wch.toString()).data.value.device_list[0].ble_addr;

            let post1 = {"hr": jsonWch.hear_rate, "temp": jsonWch.temperature, "ble_addr": ble_addr3, "get_time": time3, "mac": mac3, "ip": ip3};
            let sql1 = 'INSERT INTO tbl_rpm_watch SET ?';
            db.query(sql1, post1, (err, result) => {
                if(err) throw err;
                console.log("Watch data inserted");
            });
          }
          if (attribute == 'BLE_BPG'){ //Bp
            bp = message;
            jsonBp = JSON.parse(bp.toString()).data.value.device_list[0];

            var mac4 = JSON.parse(bp.toString()).mac;
            var time4 = decode_date(parseInt(JSON.parse(bp.toString()).time));
	          var ip4 = JSON.parse(bp.toString()).deviceCode;
            var ble_addr4 = JSON.parse(bp.toString()).data.value.device_list[0].ble_addr;

            let post1 = {"bp_high": jsonBp.bp_high, "bp_low": jsonBp.bp_low, "pr": jsonBp.PR, "ble_addr": ble_addr4, "get_time": time4, "mac": mac4, "ip": ip4};
            let sql1 = 'INSERT INTO tbl_rpm_bp SET ?';
            db.query(sql1, post1, (err, result) => {
                if(err) throw err;
                console.log("Bp data inserted");
            });

          }
        }

      });
    });
  });
} catch (err) {
  console.log(err);
}