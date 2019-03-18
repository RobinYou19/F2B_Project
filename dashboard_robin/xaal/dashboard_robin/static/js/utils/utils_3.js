//----------MENU JS ------------------//

function menuDisplay() 
{
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") 
  {
    x.className += " responsive";
  } 
  else 
  {
    x.className = "topnav";
  }
}

//----------TOUCH JS -----------------//

var myElement     = window.document;
var mc            = new Hammer(myElement);
var md            = new Hammer.Manager(myElement);
var pages_list    = ["/menu", "/house","/modules", "/favorites",
                     "/scenarios", "/configuration", "/account"]

/***************************************/
function build_panleft_dict(input_list)
{
  var panleft_dict  = {};
  var i;
  for (i = 0; i< pages_list.length; i++)
  {
    panleft_dict[pages_list[i]] = pages_list[(i+1)%pages_list.length];
  }
  return panleft_dict;
}

function build_panright_dict(input_list)
{
  var panright_dict = {};
  var i;
  panright_dict["/menu"] = "/account";
  for (i = 1; i < input_list.length; i++)
  {
    panright_dict[pages_list[i]] = pages_list[i-1];
  }
  return panright_dict;
}

/***************************************/

md.add(new Hammer.Swipe({ event: 'swipe', threshold: '150', direction: Hammer.DIRECTION_HORIZONTAL, velocity: 0.3}));

md.on('swipe', function(ev)
{
  console.log(ev.deltaX);
  if (ev.deltaX < 0)
  {
    console.log("panleft detected");
    panleft_dict = build_panleft_dict(pages_list);
    var name;
    name = window.location.pathname;
    dest = panleft_dict[name];
    window.location.href = "http://localhost:9090"+dest;    
  }
  else
  {
    console.log("panright detected");
    panright_dict = build_panright_dict(pages_list);
    var name;
    name = window.location.pathname;
    dest = panright_dict[name];
    window.location.href = "http://localhost:9090"+dest;   
  }
})

md.add(new Hammer.Tap({ event: 'double_tap', taps: 2}));
md.on("double_tap",function(ev)
{
  var name;
  name = window.location.pathname;
  window.location.href = "http://localhost:9090/menu";
})

/*********************************************/

var observable = function(el) {

  /**
   * Extend the original object or create a new empty one
   * @type { Object }
   */

  el = el || {}

  /**
   * Private variables
   */
  var callbacks = {},
    slice = Array.prototype.slice

  /**
   * Public Api
   */

  // extend the el object adding the observable methods
  Object.defineProperties(el, {
    /**
     * Listen to the given `event` ands
     * execute the `callback` each time an event is triggered.
     * @param  { String } event - event id
     * @param  { Function } fn - callback function
     * @returns { Object } el
     */
    on: {
      value: function(event, fn) {
        if (typeof fn == 'function')
          (callbacks[event] = callbacks[event] || []).push(fn)
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Removes the given `event` listeners
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    off: {
      value: function(event, fn) {
        if (event == '*' && !fn) callbacks = {}
        else {
          if (fn) {
            var arr = callbacks[event]
            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
              if (cb == fn) arr.splice(i--, 1)
            }
          } else delete callbacks[event]
        }
        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Listen to the given `event` and
     * execute the `callback` at most once
     * @param   { String } event - event id
     * @param   { Function } fn - callback function
     * @returns { Object } el
     */
    one: {
      value: function(event, fn) {
        function on() {
          el.off(event, on)
          fn.apply(el, arguments)
        }
        return el.on(event, on)
      },
      enumerable: false,
      writable: false,
      configurable: false
    },

    /**
     * Execute all callback functions that listen to
     * the given `event`
     * @param   { String } event - event id
     * @returns { Object } el
     */
    trigger: {
      value: function(event) {

        // getting the arguments
        var arglen = arguments.length - 1,
          args = new Array(arglen),
          fns,
          fn,
          i

        for (i = 0; i < arglen; i++) {
          args[i] = arguments[i + 1] // skip first argument
        }

        fns = slice.call(callbacks[event] || [], 0)

        for (i = 0; fn = fns[i]; ++i) {
          fn.apply(el, args)
        }

        if (callbacks['*'] && event != '*')
          el.trigger.apply(el, ['*', event].concat(args))

        return el
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  })

  return el
}

function update(device, data)
{
  var attributes_dict = {};
  var values_dict = {}
  var list_title = ['lamp.basic','lamp.toggle', 'lamp.dimmer', 'powerrelay.basic', 'powermeter.basic',
                    'thermometer.basic', 'hygrometer.basic', 'barometer.basic',
                    'windgauge.basic'];
  var list_value = ['light','light','light', 'power', 'power', 'temperature', 'humidity', 'pressure',
                    'windStrength'];

  var to_change_value = ['status','status','status', 'status', 'status', 'value', 'value', 'value', 'value'];

  for (var i = 0 ; i < list_title.length ; i++)
  {
    attributes_dict[list_title[i]] = list_value[i];
    values_dict[list_title[i]] = to_change_value[i]
  }
  for (var key in attributes_dict)
  {
    if (key == device.title)
    {
      device.setAttribute(values_dict[key], data['attributes'][attributes_dict[key]]);

    }
  }
}