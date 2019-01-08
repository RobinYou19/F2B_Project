#=====================================================================
def ${name}(addr=None):
    """${doc}"""
    if (addr==None):addr = tools.get_random_uuid()
    dev = Device('${devtype}',addr)
    % if (len(attributes) !=0):
    
    # -- Attributes --
    % for attr in attributes:
    # ${attributes[attr]['description']}
    dev.new_attribute('${attr}')
    % endfor
    % endif
    % if (len(methods) !=0):

    # -- Methods --
    % for meth in methods:
<%
        keys = list(methods[meth]['parameters'].keys())
        tmp = map(lambda x: '_%s' % x,keys)
        args = ','.join(tmp)
        buf= ""
        for k in keys:
            buf=buf+"%s=[%%s]" % k+","
%>    def default_${meth}(${args}):
        """${methods[meth]['description']}"""
        % if len(args) == 0:
        logger.info("default_${meth}()")
        % else:
        logger.info("default_${meth}(${buf})" % (${args}))
        % endif
        
    % endfor
    % for meth in methods:
    dev.add_method('${meth}',default_${meth})
    % endfor
    
    % endif
    return dev
