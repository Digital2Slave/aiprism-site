# LeetCodeOJ--Reverse Words in a String

Given an input string, reverse the string word by word.

For example,  
Given s = "`the sky is blue`",  
return "`blue is sky the`".

[click to show clarification.](https://oj.leetcode.com/problems/reverse-words-in-a-string/#)

Clarification:

  * What constitutes a word?
A sequence of non-space characters constitutes a word.
  * Could the input string contain leading or trailing spaces?
Yes. However, your reversed string should not contain leading or trailing spaces.
  * How about multiple spaces between two words?
Reduce them to a single space in the reversed string.



C++版本： 


```
    class Solution {
    public:
        void reverseWords(string &s) {
        string rs;
        for (int i = s.length()-1; i >= 0; )
        {
            while (i >= 0 && s[i] == ' ') {i--;}
            if (i < 0) {break;}
            if (!rs.empty()) {rs.push_back(' ');}
            string t;
            while (i >= 0 && s[i] != ' ') {t.push_back(s[i--]);}
            reverse(t.begin(), t.end());
            rs.append(t);
        }
        s = rs;
        }
    };
```



  
  