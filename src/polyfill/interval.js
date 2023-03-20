(function () {
    const timer = new java.util.Timer();
    let counter = 1;
    const ids = {};


    function clearInterval(id) {
        if (ids[id] !== undefined) {
            ids[id].cancel();
            timer.purge();
            delete ids[id];
        }
    }

    function setInterval(fn, delay) {
        let id = counter;
        counter += 1;
        const arg = Array.from(arguments).slice(2)
        ids[id] = new JavaAdapter(java.util.TimerTask, {run: fn.apply.bind(fn, this, arg)});
        timer.schedule(ids[id], delay, delay);
        return id;
    }

    exports.setInterval = setInterval;
    exports.clearInterval = clearInterval;

})()
