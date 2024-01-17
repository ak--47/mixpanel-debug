var TOKEN = `651a6f7016b5f4da03ebca5e12098489`

//mixpanel setup
mixpanel.init(TOKEN, {

    loaded: function(mixpanel) {
        console.log('mixpanel has loaded')
    },

    //cookie-less options
    persistence: 'localStorage',
    // disable_persistence: false,
    ip: false,

    //other governance
    property_blacklist: ["$browser"],
    ignore_dnt: true,

    //dev options
    debug: true,
    batch_flush_interval_ms: 0
})


//example tracking code
document.querySelector('#clickMe').addEventListener('click', () => {
    mixpanel.track('click me button')
})
document.querySelector('#dontClickMe').addEventListener('click', () => {
    mixpanel.track("don't click me button")
})

//example tracking code
document.querySelector('#profileSet').addEventListener('click', () => {
    mixpanel.people.set({$name: "foo", "bar": "baz"})
})
document.querySelector('#identify').addEventListener('click', () => {
    mixpanel.identify("whuuuuuut")
})