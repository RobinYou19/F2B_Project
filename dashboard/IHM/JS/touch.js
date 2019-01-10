var myElement     = window.document;
var mc            = new Hammer(myElement);
var md            = new Hammer.Manager(myElement);
var pages_list    = ["menu.html", "house.html","modules.html", "scenarios.html",
										 "favorites.html", "configuration.html", "account.html"]

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
	panright_dict["menu.html"] = "account.html";
	for (i = 1; i < input_list.length; i++)
	{
		panright_dict[pages_list[i]] = pages_list[i-1];
	}
	return panright_dict;
}

/***************************************/
mc.on("panleft", function(ev) 
{
	panleft_dict = build_panleft_dict(pages_list);
	var name;
	var helper;
	var dest;
  name = window.location.pathname;
  helper = name.split("/");
  name = helper[helper.length - 1];
  dest = panleft_dict[name];
  window.location.href = "../HTML/"+dest;
});

mc.on("panright", function(ev) 
{
	panright_dict = build_panright_dict(pages_list);
	var name;
	var helper;
	var dest;
  name = window.location.pathname;
  helper = name.split("/");
  name = helper[helper.length - 1];
  dest = panright_dict[name];
  window.location.href = "../HTML/"+dest;
});

/*********************************************/

md.add(new Hammer.Tap({ event: 'double_tap', taps: 2}));
md.on("double_tap",function(ev)
{
	window.location.href = "../HTML/menu.html";
})