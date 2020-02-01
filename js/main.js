/**
 * Created by RA on 5/19/2017.
 */

var $debug = true;

var c = {};

// Set Animation Timelines.
var $titleLoadTL;

// var autoTL = new TimelineLite({paused: true});
// var userTL = new TimelineLite({paused: true});
// var endTL = new TimelineLite({paused: true});



var $jsLinks = [
    'js/TweenMax.min.js'
];

// trace for consistent console logging
function trace(value) {
    if ($debug === true) {
        console.log('<<< ', value, ' >>>')
    }
}

function preInit() {
    trace('preInit');
    setupDom();
    loadJS($jsLinks);

}

function setupDom() {
    trace('setupDom');
    c.dom = {};
    c.dom.nextSlide = document.getElementsByClassName('bg-title');
    c.dom.title = document.getElementById('title');

}

function init() {
    trace('init');

    addListeners();
    start();
}

function addListeners() {
    trace('addListeners');
    // c.dom.nextSlide.addEventListener('click', nextSlide);
    c.dom.title.addEventListener('click', nextSlide);

}
function start() {
    trace('start');
    titleLoad();
    slideShow("intro-bg",15,5,0.5,0);
    footerLoad();

}

function titleLoad() {
    trace('titleLoad');

    $titleLoadTL = new TimelineLite({paused: true});

    $titleLoadTL
        .addLabel("pre")
        .to("#title",3,{opacity:1})
        .addLabel("start")
        // .to("#title_fae_old",2,{opacity:0},"start")
        // .to("#title_fae_new",2,{opacity:1},"start")
    ;

    $titleLoadTL.play();

    // from(c.dom.autoFrame,0.5,{height:"100px",ease:ease1},"start").
    // to(c.dom.autoRating,0.5,{opacity:1},"start")

}

function footerLoad() {
    trace('footerLoad');
    TweenLite.to("#nimaiFooter",3,{opacity:1});
}


// ====================================
//     FULL BACKGROUND SLIDE SHOW
//     VANILLA JS & GSAP
//     Example Call:
//     slideShow("intro-bg",10,1.3,0.5,0);
// ====================================



var $slides;
// var $slides = document.getElementsByClassName("intro-bg"); //slides
var stayTime; //time the slide stays
var slideTime; //fade in / fade out time
var alphaSet;
var currentSlide = 0; //keep track on the current slide

function slideShow(slideClass,sTime,tTime,alpha,current) {
    $slides = document.getElementsByClassName(slideClass); //slides
    currentSlide = current; //keep track on the current slide
    stayTime = sTime; //time the slide stays
    slideTime = tTime; //fade in / fade out time
    alphaSet = alpha;

    TweenLite.set($slides, {autoAlpha:0, onComplete: function(){
        TweenLite.to($slides[currentSlide],(slideTime*2), {autoAlpha:alphaSet});	//show first image
        TweenLite.delayedCall(stayTime, nextSlide); //start the slideshow
    }});	//hide all images




}
function nextSlide() {
    trace('nextSlide');
    TweenLite.to($slides[currentSlide], slideTime, {
        autoAlpha: 0,
        className: "-=bg-active"
    }); //fade out the old slide
    currentSlide = ++currentSlide % $slides.length; //find out which is the next slide
    TweenLite.to($slides[currentSlide], slideTime, {
        autoAlpha: alphaSet,
        className: "+=bg-active"
    }); //fade in the next slide
    TweenLite.delayedCall(stayTime, nextSlide); //wait a couple of seconds before next slide
}


//======================================
//========= CUSTOM FUNCTIONS =============
//======================================

function loadJS(link) {
    loadScripts(link,function(){
        trace('Scripts loaded');
        init();
    });
}

function loadScripts(array,callback){
    var loader = function(src,handler){
        var script = document.createElement("script");
        script.src = src;
        script.onload = script.onreadystatechange = function(){
            script.onreadystatechange = script.onload = null;
            handler();
        }
        var head = document.getElementsByTagName("head")[0];
        (head || document.body).appendChild( script );
    };
    (function run(){
        if(array.length!=0){
            loader(array.shift(), run);
        }else{
            callback && callback();
        }
    })();
}

function once(fn, context) {
    var result;

    return function() {
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    };
}

// Usage
var canOnlyFireOnce = once(function() {
    console.log('Fired!');
});

// canOnlyFireOnce(); // "Fired!"
// canOnlyFireOnce(); // nada


// ======================================





window.addEventListener('load', preInit);
