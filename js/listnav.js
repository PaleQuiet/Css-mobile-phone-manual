/*
* @Author: Pale quiet
* @Date:   2018-05-15 15:06:55
* @Last Modified by:   Marte
* @Last Modified time: 2018-05-22 16:21:11
*/
$(document).ready(function() {
    getlist();
});

function getlist(){
    $.ajax({
        url: "../cssbook/json/nav.json",
        type: "get",
        dataType: "json",
        success:function(data){
            shownav(data);
            showcsslist(data);
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}
function shownav(data){
    var menu = $(".nav.navbar-nav");
    for(i=0;i<data.length;i++){
        var child =data[i].childelement;
        var parentli="";
        var childul="";
        var childli="";
        var sunul="";
        var sunli="";
        if(child.length>0){
            parentli = "<li class=\"dropdown\"><a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\""+data[i].url+"\">"+data[i].name+"</a>";
            childul = "<ul class=\"dropdown-menu animated\">";
            for(n=0;n<child.length;n++){
                var sun = child[n].sunelement;
                var sunlist ="";
                if (sun&&sun.length!=0) {
                    childli = "<li class=\"dropdown\"><a href=\""+child[n].url+"\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">"+child[n].name+"</a>";
                    sunul = "<ul class=\"dropdown-menu animated\">";
                    for (m=0; m<sun.length; m++) {
                        sunli = '<li><a class="sun" href="load.php?parent='+data[i].url+'&child='+child[n].url+'&sun='+sun[m].url+' #bd">'+sun[m].name+'</a></li>';
                        sunlist += sunli;
                    }
                    sunul +=sunlist;
                }else{
                    childli = '<li><a class="child" href="load.php?parent='+data[i].url+'&child='+child[n].url+'&sun= #bd">'+child[n].name+'</a></li>'
                    // sunul =parentli+childul+childli+"</li></ul></li>";
                }
                if (sun) {sunul+="</ul>"}
                childul += childli+sunul+"</li>"
            }
            parentli += childul+"</ul>";
            menu.append(parentli+"</li>");
        }else{
            var parentli = "<li><a href=\""+data[i].url+"\">"+data[i].name+"</a></li>"
            menu.append(parentli);
        }
    }
    $.getScript("js/bootsnav.js");
    $(".sun").click(function(event){
        event.preventDefault();
        showmain($(this).text());
      });
    $(".child").click(function(event){
        event.preventDefault();
        showmain($(this).text());
      });

}
function showcsslist (data) {
    var list=$("#common-packages");
    var taglist ="";
    for(i=0;i<data.length;i++){
        var child =data[i].childelement;
        for(n=0;n<child.length;n++){
            var sun = child[n].sunelement;
            if (sun) {
                for (m=0; m<sun.length; m++) {
                    suna = '<a href="load.php?parent='+data[i].url+'&child='+child[n].url+'&sun='+sun[m].url+' #bd" class="package list-group-item" target="_blank"><div class="row"><div class="col-md-3"><h4 class="package-name">'+sun[m].name+'</h4></div><div class="col-md-9"><p class="package-description">'+sun[m].description+'</p></div><div class="main"></div></div></a>';
                    taglist += suna;
                }
            }else{
                    suna = '<a href="load.php?parent='+data[i].url+'&child='+child[n].url+'&sun= #bd" class="package list-group-item" target="_blank"><div class="row"><div class="col-md-3"><h4 class="package-name">'+child[n].name+'</h4></div><div class="col-md-9"><p class="package-description">'+child[n].description+'</p></div><div class="main"></div></div></a>';
                    taglist += suna;
            }
        }
    }
    list.append(taglist);
    $("#common-packages > a").click(function(event){
        event.preventDefault();
        showmain($("h4",this).text());
    });
}
$(function(){
    $("i[type=button]").click(function(){
      var txt=$("input[type=text]").val();
      if($.trim(txt)!=""){
        $("#common-packages a").hide().filter(function(index){return $("h4:contains('"+txt+"')",this).length==1}).show();
      }else{
        $("#common-packages a").show();
      }
    });
});
function showmain(value){
    var txt=value;
    $("#common-packages a").hide().filter(function(index){return $("h4:contains('"+txt+"')",this).length==1}).show("fast",function (){
        var chooseelement=$(this).find(".main");
        var pagevalue=$(this).attr("href");
        chooseelement.load(pagevalue,function () {
            $('#compatible').hide();
            $('#example').hide();
        });
    });
}
