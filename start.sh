#!/bin/bash
echo -e "#!/bin/bash\nxrdb $HOME/.Xresources\nstartxfce4 &" > ~/.vnc/xstartup
chmod +x ~/.vnc/xstartup
vncserver -kill :1
vncserver :1
cd noVNC
./utils/novnc_proxy --vnc localhost:5901
