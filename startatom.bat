@echo off
cd /d "C:/TANGJ15/code/"
set nodejspath=C:\TANGJ15\Software\node-v13.12.0-win-x64
set rubypath=C:\Ruby27-x64\bin

set "path=%path%;C:\Users\tangj15\AppData\Local\atom\bin;C:\Users\tangj15\AppData\Local\atom\;%nodejspath%\node_modules\;%nodejspath%\node_global;%rubypath%"

echo Your environment has been set up for using atom and apm.

cmd /k "%nodejspath%/nodevars.bat&%rubypath%/setrbvars.cmd"