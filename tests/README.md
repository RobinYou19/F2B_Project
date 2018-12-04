Bilan
=====
- LitElement : Lourd à charger notamment car il y a bcp de dépendances
- SlimJS : Je n'ai pas réussi à faire de l'héritage dans le browser, les 
  exemples sont en typescript. J'ai essayé de les transpiler, mais je 
  rencontre de soucis.
- Vanilla : Très très verbeux... :( 
- ReactJS : possibilité d'utiliser JSX mais je n'arrive pas à compiler mes .jsx pour obtenir du javascript compréhensible ES15. Les exemples n'utilisent pas JSX
On peut obtenir du non JSX à partir du JSX ici :
https://babeljs.io/repl 
- SkateJS : même problème que pour ReactJS sauf que la il n'y a pas de syntaxe sans JSX
- x-tag, l'héritage fonctionne dans le browser, mais les 'extensions' (notés ::) ne sont pas hérités (voire écrase l'existant), donc pas d'héritage de template, ni d'event .. donc en gros aucun intérêt :( 
