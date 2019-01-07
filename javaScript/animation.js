

$(document).ready(function() {
    $('#skip').on("click", function(){ window.location.href = "https://dmarsola.github.io/" });

    console.log(`page loaded`);
    function $$(id) { return document.getElementById(id); }

    let pageWidth;
    let pageHeight;
    let numRainDrops;
    let rain = [];
    let colour = "#20211a";  // #c68e15 #d5f2e3 #01110a
    let buildingBase;
    let buildingWidth;

    function getScreeSize() {
        pageWidth = window.innerWidth;
        pageHeight = window.innerHeight;
        numRainDrops = pageWidth*6;
        if (numRainDrops > rain.length){
            for (let i = rain.length; i<numRainDrops; i++)
                newRainDrop(i);
        }

        $("canvas").attr('width', pageWidth);
        $("canvas").attr('height', pageHeight);
        // console.log(`width: ${pageWidth} and height: ${pageHeight}`);
    }

    getScreeSize();
    $(window).resize(function () { getScreeSize(); }); // on page resize

    let elCanvas = $$('cnv');
    let ctx = elCanvas.getContext('2d');

    function Drop(_size, _yRate, _staringX, _startingY) {
        this.size = _size;
        this.yRate = _yRate;
        this.yPos = _startingY;
        this.xPos = _staringX;
    }

    function newRainDrop(i) {
        rain[i] = new Drop(
            (Math.random()+1)*5, // size of the drop
            (Math.random()+1)*4, // rate of y
            Math.random() * pageWidth, // starting X position
            -(Math.random() * pageHeight)); // starting Y position
    }

    function backDrop(){
        buildingBase = pageHeight-pageHeight/5;
        buildingWidth = pageWidth/3.5;
        ctx.strokeStyle = colour;

        // left building
        ctx.beginPath();
        ctx.moveTo(0, buildingBase);
        ctx.lineTo(buildingWidth, buildingBase);
        ctx.lineTo(buildingWidth, 0);
        ctx.stroke();

        // right building
        ctx.beginPath();
        ctx.moveTo(pageWidth, buildingBase);
        ctx.lineTo(pageWidth-buildingWidth, buildingBase);
        ctx.lineTo(pageWidth-buildingWidth, 0);
        ctx.stroke();

        // alley depth
        ctx.beginPath();
        ctx.moveTo(buildingWidth, buildingBase);
        ctx.lineTo(pageWidth-buildingWidth, pageHeight/4);
        ctx.stroke();

        // left window
        ctx.fillStyle = "#c68e15";
        ctx.rect(-10, pageHeight/4, pageWidth/5, pageHeight/5);
        ctx.stroke();
        ctx.fill();

        // right door
        ctx.fillStyle = "#c68e15";
        ctx.rect(pageWidth-pageWidth/8, pageHeight/4, pageWidth+1, buildingBase-pageHeight/4);
        ctx.stroke();
        ctx.fill();
    }

    function makeRain() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        backDrop();
        for (let i=0; i<numRainDrops; i++) {
            if (rain[i].yPos > pageHeight) // || rain[i].xPos > pageWidth
                newRainDrop(i);
            if (rain[i].yPos>=0-rain[i].size && rain[i].xPos < pageWidth){
                ctx.strokeStyle = colour;
                ctx.beginPath();
                ctx.moveTo(rain[i].xPos, rain[i].yPos);
                ctx.lineTo(rain[i].xPos, rain[i].yPos + rain[i].size);
                ctx.stroke();
            }
            rain[i].yPos += rain[i].yRate;
        }
    }

    function thunder(){
        function revertBack(){
            $("body").css("background-color", "");
        }
        function turnWhite(){
            $("body").css("background-color", "white");
            setTimeout(revertBack, 60)
        }
        function revertColour(){
            // $("mario").css("color", "");
            colour = "#20211a";
        }
        colour = "#778899";
        turnWhite();
        setTimeout(turnWhite, 60);
        setTimeout(turnWhite, 240);
        setTimeout(turnWhite, 360);
        setTimeout(revertColour, 420);
    }

    let position = 10;
    // console.log(position);
    $('#mario').css({left: `${position}px`} );




    (function () {
        function blackMario(){
            setTimeout(function(){ $('#text').text(''); }, 2000);

            function lightMario(){
                $('#mario').css({color: ''});
            };
            function moveForward(){
                $('#mario').animate({'font-size': '20vh'}, 1500);
                $('#mario').animate({left: `${pageWidth-pageWidth/8}px`}, 5000);
            }
            // console.log('black');
            $('#mario').css({color: '20211a'});
            setTimeout(moveForward, 9500);
            setTimeout(lightMario, 11000);
        }

        setInterval(makeRain, 30);
        setInterval(thunder, 8000);

        setTimeout(function MarioWalksIn(){
            // console.log('Go mario');
            $('#mario').animate({left: `${buildingWidth/2}px`}, 4000);
            }, 1000,

            setTimeout(function(){ $('#text').text('Hi, kid! What are you doing here?'); }, 5000),

            setTimeout(function(){ $('#text').text("Ah! I see. I'm Mario. I run the show here."); }, 7000),

            setTimeout(function(){ $('#text').text("What can I do for you?"); }, 11000),

            setTimeout(function(){ $('#text').text("Crazy 8s? It's an amazing game."); }, 14000),

            setTimeout(function hide(){
                setTimeout(function(){$('#text').text('The police? Just a sec, I will be right back.');}, 1000);
                // console.log('Time to hide');
                $('#mario').animate({left: `${buildingWidth*2}px`}, 1000);
                $('#mario').animate({'font-size': `5em`}, 1000);
                setTimeout(blackMario, 2000);
            }, 17500),

            setTimeout(function(){ $('#text').text("Don't worry. You never know what to expect from those guys. They are dangerous."); }, 24000),

            setTimeout(function(){ $('#text').text("They are gone now. All is fine, trust me. Come on in, I'll show you around."); }, 28000),

            setTimeout(function(){ window.location.href = "https://dmarsola.github.io/"; }, 36000)

        ,1000);

    }());

}); // when doc is ready