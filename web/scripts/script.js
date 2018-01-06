$(document).ready(function(){
    var row;
    var id, uid,time;
    $.post('get_db.php',{token:"lovestory0626life"}).done(function(json_data){
        data = JSON.parse(json_data);
        console.log(data);
        
        for(var i = 0; i < data.length; i++){
            id = data[i][0];
            uid = data[i][1];
            time = data[i][2];
            if(id % 2 == 0){
                status = "Checked Out";
            }else{
                status = "Checked In";
            }

            document.getElementById('update_box').innerHTML += "<p> <p class=\"id\">"+id+ "</p> <p class=\"uid\"> "+ uid +"</p> <p class=\"status\">"+ status+"</p> <p class=\"time\">"+  time+ "</p></p>" ;
            
        }
        
    });
}); 