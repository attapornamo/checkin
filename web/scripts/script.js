function get_data(){
$.post('get_db.php',{token:"lovestory0626life",job:'get'}).done(function(json_data){
        data = JSON.parse(json_data);

        for(var i = 0; i < data.length; i++){
            id = data[i][0];
            uid = data[i][1];
            time = data[i][2];
            status,status_class = check_status(id);
            document.getElementById('update_box').innerHTML += "<p> <p class=\"id\">"+id+ "</p> <p class=\"uid\"> "+ uid +"</p> <p class=\"status "+status_class+"\">"+ status+"</p> <p class=\"time\">"+  time+ "</p></p>" ;
        }
        return data.length;
    });
}

function check_status(id){
    if(id % 2 == 0){
        status = "Checked Out";
        status_class= "out";
    }else{
        status_class="in";
        status = "Checked In";
    }
    return (status,status_class);
}

function get_last_id(){
    last_id = document.getElementsByClassName('id').length - 1;
    return last_id;
}

function getupdated(){
    $.post('get_db.php',{token:"lovestory0626life",job:'update'}).done(function(json_data){
            data = JSON.parse(json_data);
            id = data[0][0];
            uid = data[0][1];
            time = data[0][2];
            status, status_class = check_status(id);
            last_id = get_last_id();
        
            if(last_id != id){
                document.getElementById('update_box').innerHTML += "<p> <p class=\"id\">"+id+ "</p> <p class=\"uid\"> "+ uid +"</p> <p class=\"status "+status_class+"\">"+ status+"</p> <p class=\"time\">"+  time+ "</p></p>" ;
                document.getElementById('notifier').innerHTML = "User with Card Id "+uid + " just got "+ status_class+" !!"; 
               setTimeout(function(){
                document.getElementById('notifier').innerHTML = "No one there!";
             
               },3000);
            }
           
        });
}


$(document).ready(function(){
    get_data();

    setInterval(function(){
        getupdated();
    },100);
 }); 
 