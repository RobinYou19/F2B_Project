var myElement     = window.document;
var mc            = new Hammer(myElement);
var md            = new Hammer.Manager(myElement);
var pages_list    = ["/menu", "/house","/modules", "/scenarios",
										 "/favorites", "/configuration", "/account"]

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
mc.on("panleft", function(ev) 
{
	console.log("panleft detected");
	panleft_dict = build_panleft_dict(pages_list);
	var name;
	name = window.location.pathname;
	dest = panleft_dict[name];
	window.location.href = "http://localhost:9090"+dest;
});

mc.on("panright", function(ev) 
{
	console.log("panright detected");
	panright_dict = build_panright_dict(pages_list);
	var name;
	name = window.location.pathname;
	dest = panright_dict[name];
	window.location.href = "http://localhost:9090"+dest;
});

/*********************************************/

md.add(new Hammer.Tap({ event: 'double_tap', taps: 2}));
md.on("double_tap",function(ev)
{
	var name;
	name = window.location.pathname;
	window.location.href = "http://localhost:9090/menu";
})