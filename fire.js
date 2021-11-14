function alldelete() {
    firebase.database().ref("/").set(null);
}

function allzero(){
    firebase.database().ref('/users/').orderByChild('point').once('value', function(snapshot){
        snapshot.forEach(function (Child){
            var name = Child.key;
            var pont = 0;
            pont = Number(pont)
            firebase.database().ref('/users/'+name).set({point: pont});
        });
        document.getElementById("rangsor").innerHTML = str;
    });
}

function list() {
    firebase.database().ref('/users/').orderByChild('point').once('value', function(snapshot){
        var str = "";
        var i = 1;
        snapshot.forEach(function (Child){
            var name = Child.key;
            var point = Child.val().point * -1;
            if(i == 1)
                str += "<div style='float:left;  color:yellow;height: 6%; width: 80%'>🥇 "+name+"  </div><div style='float:right; color:yellow; height: 6%;width: 20% text-align: right;'>"+point+" &nbsp;</div>";
            else if(i == 2)
                str += "<div style='float:left;  color:silver; left:0; height: 6%;width: 80%'>🥈 "+name+"  </div><div style='float:right; color:silver; height: 6%;width: 20% text-align: right;'>"+point+" &nbsp;</div>";
            else if(i == 3)
                str += "<div style='float:left;  color:orange; height:6%;width: 80%'>🥉 "+name+"  </div><div style='float:right; color:orange; height: 6%;width: 20% text-align: right;'>"+point+" &nbsp;</div>";
            else
                str += "<div style='float:left; height: 6%;width: 80%'> &nbsp; &nbsp; &nbsp; "+name+"</div><div style='float:right; height: 6%;width: 20%; text-align: right;'>"+point+" &nbsp;</div>";
            i = i + 1;
        });
        document.getElementById("rangsor").innerHTML = str;
    });
}

function listwhitname() {
    var myname = document.getElementById("nametext").value;
    firebase.database().ref('/users/').orderByChild('point').on('value', function(snapshot){
        var str = "";
        var i = 1;
        snapshot.forEach(function (Child){
            var name = Child.key;
            var point = Child.val().point * -1;

            if(i == 1 && String(myname) == String(name))
                str += "<div class='mine' style='float:left; line-height: 1.5; display: inline-block; vertical-align: middle; color:yellow;height: 6%; width: 80%;'>🥇 "+name+"</div><div class='mine' style='float:right; line-height: 1.5; display: inline-block; vertical-align: middle; color:yellow; height: 6%;width: 20%; text-align: right;'>"+point+" &nbsp;</div>";
            else if(i == 2 && String(myname) == String(name))
                str += "<div class='mine' style='float:left; line-height: 1.5; display: inline-block; vertical-align: middle; color:silver; left:0; height: 6%;width: 80%;'>🥈 "+name+"</div><div class='mine' style='float:right; line-height: 1.5; display: inline-block; vertical-align: middle; color:silver; height: 6%;width: 20%; text-align: right;'>"+point+" &nbsp;</div>";
            else if(i == 3 && String(myname) == String(name))
                str += "<div class='mine' style='float:left; line-height: 1.5; display: inline-block; vertical-align: middle; color:orange; height:6%;width: 80%;'>🥉 "+name+"</div><div class='mine' style='float:right; line-height: 1.5; display: inline-block; vertical-align: middle; color:orange; height: 6%;width: 20%; text-align: right;'>"+point+" &nbsp;</div>";
            else if(String(myname) == String(name))
                str += "<div class='mine' style='float:left; line-height: 1.5; display: inline-block; vertical-align: middle; color:white; height:6%;width: 80%;'> &nbsp; &nbsp; &nbsp; "+name+"</div><div class='mine' style='float:right; color:white; line-height: 1.5; display: inline-block; vertical-align: middle; height: 6%;width: 20%; text-align: right;'>"+point+" &nbsp;</div>";
            else if(i == 1)
                str += "<div style='float:left; line-height: 1.5; display: inline-block; vertical-align: middle; color:yellow;height: 6%; width: 80%;'>🥇 "+name+"</div><div style='float:right; color:yellow; line-height: 1.5; display: inline-block; vertical-align: middle; height: 6%;width: 20%; text-align: right;'>"+point+" &nbsp;</div>";
            else if(i == 2)
                str += "<div style='float:left; line-height: 1.5; display: inline-block; vertical-align: middle; padding: 3px 0; color:silver; left:0; height: 6%; width: 80%;'>🥈 "+name+"</div><div style='float:right; line-height: 1.5; display: inline-block; vertical-align: middle; color:silver; height: 6%;width: 20%; text-align: right;'>"+point+" &nbsp;</div>";
            else if(i == 3)
                str += "<div style='float:left; line-height: 1.5; display: inline-block; vertical-align: middle; color:orange; height:6%; width: 80%;'>🥉 "+name+"</div><div style='float:right; line-height: 1.5; display: inline-block; vertical-align: middle; color:orange; height: 6%; width: 20%; text-align: right;'>"+point+" &nbsp;</div>";
            else
                str += "<div style='float:left; line-height: 1.5; display: inline-block; vertical-align: middle; color:white; height:6%; width: 80%;'> &nbsp; &nbsp; &nbsp; "+name+"</div><div style='float:right; line-height: 1.5; display: inline-block; vertical-align: middle; color:white; height: 6%; width: 20%; text-align: right;'>"+point+" &nbsp;</div>";

            i = i + 1;
        });
        str += "<div style='float:left; height: 6%;width: 80%'> &nbsp; &nbsp; &nbsp; "+"</div><div style='float:right; height: 6%;width: 20%; text-align: right;'>"+"</div>";
        document.getElementById("rangsor").innerHTML = str;
    });
}


function add(){
    var name = document.getElementById("nametext").value;
    var pont = document.getElementById("szam").value;
    if (name == "deleteall" || name == "Deleteall"){
        alldelete();
        document.getElementById("nametext").value = "";
        document.getElementById("szam").value = "";
    }
    else if (name == "zeroall" || name  == "Zeroall"){
        allzero();
        document.getElementById("nametext").value = "";
        document.getElementById("szam").value = "";
    }
    else if(name != ""){
        if(pont != ""){
            pont = Number(pont); 
            pont *= -1;
            firebase.database().ref('/users/'+name).set({point: pont});
            listwhitname();
        }
        else{
            var x = 12;
            x -= 12;
            firebase.database().ref('/users/'+name).set({point: x});
            document.getElementById("szam").value = x;
            listwhitname();
        }
    }
}

function plus(){
    var name = document.getElementById("nametext").value;
    var pont = document.getElementById("szam").value;
    if(name != ""){
        pont -= 1;
        pont += 2;
        document.getElementById("szam").value = pont;
        pont *= -1;
        firebase.database().ref('/users/'+name).set({point: pont});
    }
}

function minus(){
    var name = document.getElementById("nametext").value;
    var pont = document.getElementById("szam").value;
    if(name != ""){
        pont -= 1;
        document.getElementById("szam").value = pont;
        pont *= -1;
        firebase.database().ref('/users/'+name).set({point: pont});
    }
}