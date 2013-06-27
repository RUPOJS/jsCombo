<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>New Web Project</title>
        <style>
        	#suggest {
            position: absolute;
            background-color: #FFFFFF;
            border: 1px solid #CCCCFF;
            font-size: 90%;
            width: 200px;
            }
            #suggest div {
            display: block;
            width: 200px;
            overflow: hidden;
            white-space: nowrap;
            }
            #suggest div.select{ /* keydown, keyup */
            color: #FFFFFF;
            background-color: #3366FF;
            }
            #suggest div.over{ /* mouse over */
            background-color: #99CCFF;
            } 
       	</style>
        <script type="text/javascript" src="suggest.js"></script>
        <script type="text/javascript" src="data.js"></script>
    </head>
    <body>
        <form onsubmit="return false;">
        <table>
        <tr>
        <td>Input:</td>
        <td>
        <!-- Input form -->
        <input id="text" type="text" name="pattern" value="" autocomplete="off" size="10" style="display: block">
        <!-- suggestion area -->
        <div id="suggest" style="display:none;"> </div>
        </td>
        </tr>
        </table>
        </form>
        <script type="text/javascript">
            var start = function(){new Suggest.Local("text", "suggest", list, {dispMax: 10, highlight: true});};
            window.addEventListener ?
            window.addEventListener('load', start, false) :
            window.attachEvent('onload', start);
                    	
        </script>
    </body>
</html>
