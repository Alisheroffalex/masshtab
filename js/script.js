const ogConsole = console
console = () => {}


var myFullpage = new fullpage('#main', {
    sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
    css3: true,
    onLeave: function (origin, destination, direction) {
        console.log(origin);
        console.log(destination);
        console.log(direction);
    }
});
console = ogConsole
console.log('hi')
