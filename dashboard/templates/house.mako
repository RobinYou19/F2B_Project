<%inherit file="base.mako"/>

<body>

<div class="col-sm-3">
	<div class="draggable">
		<div id="watch">
		  <div id="hours"></div>
		  <div id="minutes"></div>
		</div>
		<div id="digital">Time here</div>
	</div>
</div>

%for dev in devs :
	%if "lamp" in dev.devtype :
		<lamp-basic address=${dev.address} light=${dev.attributes}></lamp-basic>
	%endif
%endfor

</body>

<script src="/static/js/components.js"></script>