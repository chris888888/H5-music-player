var timer = null;//控制音乐当前播放的进度条
var conf = {
    "indexOfsongs": 0
};
var audio = document.getElementsByTagName('audio')[0];
var source = document.getElementsByTagName('source');

//上一首事件
$("#prev").click(function () {
    if (conf.indexOfsongs > 0) {
        conf.indexOfsongs--;
    } else {
        conf.indexOfsongs = source.length - 1;
    }
    audio.src = source[conf.indexOfsongs].src;
    audioPlay();
})
//播放键事件
function audioPlay() {
    clearInterval(timer);
    audio.load();
    audio.oncanplay=function(){
        var nowSrcLength = Math.ceil(audio.duration);
        console.log(audio.duration)
        timer = setInterval(function () {
            var now = Math.ceil(audio.currentTime);
            var n = now / nowSrcLength;
            barMove(n);
        }, 2000);
        $('#play').css('background-position', '-61px 0');
        $('#play').data('play', true);
        audio.play();
    } 
}
 //播放键   
$("#play").click(function () {
    if ($("#play").data('play') === false) {
        audioPlay();
    } else {
        clearInterval(timer);
        $('#play').css('background-position', '2px 0');
        $('#play').data('play', false);
        audio.pause();
    }

});
//下一首事件
$("#next").click(function () {
    if (conf.indexOfsongs < source.length - 1) {
        conf.indexOfsongs++;
    } else {
        conf.indexOfsongs = 0;
    }
    audio.src = source[conf.indexOfsongs].src;
    audioPlay();
})
//音乐进度条 进度改变
function barMove(n) {
    n = Math.floor(n * 380);
    $('#progressBar-now').css('left', n);
    $('#progressBar-bg').css('width', n + 10);
}
//声音控制条
$("#volume-progressBar").on('click', 'li', function () {
    liIndex = $(this).index();
    for (var i = 0; i <= 4; i++) {
        if (i <= liIndex) {
            $("#volume-progressBar li")[i].style.backgroundColor = '#33d9ff';
        } else {
            $("#volume-progressBar li")[i].style.backgroundColor = 'white';
        }
    }
    audio.volume = (liIndex + 1) * 0.2;
});
$("#mute").click(function () {
    if (audio.muted === false) {
        audio.muted = true;
        $(this).css({
            'background-color': "#33d9ff",
            "color": "#1a1a1a"
        });
    } else {
        audio.muted = false;
        $(this).css('background-color', "#1a1a1a");
        $(this).css('color', "white");
    }
})
//控制播放模式
$('#model').click(function () {
    if ($('#model').data('type') == 0) {
        $(this).attr("title", "单曲循环");
        audio.loop = true;
        $(this).css('background-position', "-186px -120px");
    }
})
//播放列表相关
$("#listBtn").click(function(){ //点击播放列表 展开
    $("#list").toggle(400);
})
$("#list").on("click","p",function(){ //点击播放列表内的歌曲 播放
    conf.indexOfsongs=$(this).index();
    console.log(conf.indexOfsongs)
    audio.src = source[conf.indexOfsongs].src;
    audioPlay();
})
function loadList(){
    for(let i=0;i<source.length;i++){
        var $p=$("<p></p>");
        var s= source[i].src.toString().split(".");
        var t= decodeURI(s[0]);
        var q=t.split("/");
        $p.html(q[q.length-1]);
        $("#list").append($p);
    }
}

loadList()