# C/C++取整函数ceil(),floor()

使用floor函数。floor(x)返回的是小于或等于x的最大整数。  
如： floor(10.5) == 10 floor(-10.5) == -11

  
使用ceil函数。ceil(x)返回的是大于x的最小整数。  
如： ceil(10.5) == 11 ceil(-10.5) ==-10

  
floor()是向负无穷大舍入，floor(-10.5) == -11；  
ceil()是向正无穷大舍入，ceil(-10.5) == -10

fix  
朝零方向取整，如fix(-1.3)=-1; fix(1.3)=1;  
floor  
朝负无穷方向取整，如floor(-1.3)=-2; floor(1.3)=1;  
ceil  
朝正无穷方向取整，如ceil(-1.3)=-1; ceil(1.3)=2;  
round  
四舍五入到最近的整数，如round(-1.3)=-1;round(-1.52)=-2;round(1.3)=1;round(1.52)=2