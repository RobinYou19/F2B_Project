var tags = {}
var evt_bus = null;
var sio = null;

//================ JS tools ====================================================
// dumbs functions to mimic jQuery selectors
var _ = function ( elem ) {
  return document.querySelector( elem );
}

var __ = function ( elem ) {
  return document.querySelectorAll( elem );
}

// check if we use a mobile user-agent
function detectMobile() {
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

//================ Event stuffs  ===============================================
function EventBus () {
    riot.observable(this);
    this.mounted = false;
    this.connected = false;

    this.on('sio-connect',function() {
        log('Event : connected ' + sio.io.engine.transport.name);
        this.connected = true;
        this.refresh_attributes();
    });

    this.on('sio-disconnect',function() {
        log('Event : disconnected');
        this.connected = false;
    });

    this.on('devices-mount',function() {
        log('Event : mounted');
        this.mounted = true;
        run_sio();
        //this.refresh_attributes();
    });

    this.on('visible',function() {
        log('Event : visible');
        this.refresh_attributes();
    });

    this.refresh_attributes = function() {
        if ((this.connected == true) && (this.mounted == true)) {
            sio_refresh_attributes();
        }
    }
};

function visibilityChanged(data) {
    if (document.visibilityState == 'visible')
        evt_bus.trigger('visible');
    else
        console.log('visibility => ' + document.visibilityState);
}


function log(msg) 
{
  console.log(msg)
}

function display_onoff_devices() 
{
  for (t in onoff_devices) 
  {
    var device = onoff_devices[t];
    var size   = device.attributes.length;
    for (var i = 0 ; i < size ; i++)
    {
      console.log(t + " : " + device.attributes[i].name + " : " 
                    + device.attributes[i].nodeValue);
    }    
  }
}

//================ SocketIO ================================================
function run_sio() 
{
  sio = io.connect('ws://' + document.domain + ':' + location.port,{transports: ['websocket'],forceNew:true});
  sio.on('connect', function() {
      evt_bus.trigger('sio-connect');
  });

  sio.on('disconnect', function() {
      evt_bus.trigger('sio-disconnect');
  });

  sio.on('event_attributeChanges', function(data) 
  {
    for (t in onoff_devices)
    {
      var attrs = onoff_devices[t].attributes;
      if (attrs.hasOwnProperty('address'))
      {
        if (attrs.address.value == data['address'])
        {
          onoff_devices[t].setAttribute('status', data['attributes']['light']);
        }
      }
    }
  });
}

function sio_refresh_attributes() 
{
  console.log('refresh_attributes');
  for (t in onoff_devices) 
  {
    var attrs = onoff_devices[t].attributes;
    if (attrs.hasOwnProperty('address')) 
    {
      sio.emit('query_attributes',attrs.address.value);
    }
  }
}

function sio_send_request(addr,action,body) 
{
  sio.emit('send_request',addr,action,body);
}

function sio_query_attributes(addr) 
{
  sio.emit('query_attributes',addr);
}


//================ Main ========================================================
evt_bus = new EventBus();

onoff_devices = document.getElementsByTagName("onoff-device");

evt_bus.trigger('devices-mount');

// We need to force sync the content if we use a mobile device.
// mobile device need a refresh when it come back from sleep
if (detectMobile() == true) 
{
    document.addEventListener("visibilitychange", visibilityChanged);
}
