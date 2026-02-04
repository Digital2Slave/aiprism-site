# C++Switch语句实现输入日期计算为改年的第几天




```cpp
    #include<iostream>
    using namespace std;
    int main()
    {
     long year,location;
     int month,day;
     cout<<"请输入年月日："<<endl;
     cin>>year>>month>>day;

     if ((year%4==0&&year&100!=0)||(year%400==0))
     {
       switch(month)
       {
       case 1:{location=day;break;}
       case 2:{location=31+day;break;}
       case 3:{location=31+29+day;break;}
       case 4:{location=31+29+31+day;break;}
       case 5:{location=31+29+31+30+day;break;}
       case 6:{location=31+29+31+30+31+day;break;}
       case 7:{location=31+29+31+30+31+30+day;break;}
       case 8:{location=31+29+31+30+31+30+31+day;break;}
       case 9:{location=31+29+31+30+31+30+31+31+day;break;}
       case 10:{location=31+29+31+30+31+30+31+31+30+day;break;}
       case 11:{location=31+29+31+30+31+30+31+31+30+31+day;break;}
       case 12:{location=31+29+31+30+31+30+31+31+30+31+30+day;break;}
       }
     }
     else
     {
       switch(month)
       {
       case 1:{location=day;break;}
       case 2:{location=31+day;break;}
       case 3:{location=31+28+day;break;}
       case 4:{location=31+28+31+day;break;}
       case 5:{location=31+28+31+30+day;break;}
       case 6:{location=31+28+31+30+31+day;break;}
       case 7:{location=31+28+31+30+31+30+day;break;}
       case 8:{location=31+28+31+30+31+30+31+day;break;}
       case 9:{location=31+28+31+30+31+30+31+31+day;break;}
       case 10:{location=31+28+31+30+31+30+31+31+30+day;break;}
       case 11:{location=31+28+31+30+31+30+31+31+30+31+day;break;}
       case 12:{location=31+28+31+30+31+30+31+31+30+31+30+day;break;}
       }
     }
     cout<<year<<"年"<<month<<"月"<<day<<"日"<<"是"<<year<<"年的第"<<location<<"天。"<<endl;
     return 0;
    }
```



  
  
```