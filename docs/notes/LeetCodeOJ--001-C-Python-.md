# LeetCodeOJ--001(C++ && Python)

Two Sum  


Given an array of integers, find two numbers such that they add up to a specific target number.

The function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are not zero-based.

You may assume that each input would have exactly one solution.

Input: numbers={2, 7, 11, 15}, target=9  
Output: index1=1, index2=2

C++版本：


```cpp
    class Solution {
    public:
        vector<int> twoSum(vector<int> &numbers, int target)
        {
                vector<int> out_res;
                vector<int> in_vec;

                for(int i=0;i<numbers.size();i++)
                    in_vec.push_back(numbers[i]);

                 //
                std::sort(in_vec.begin(),in_vec.end());

                int i=0,j=(int)in_vec.size()-1;

                while(i<=j)
                {
                    int sum = in_vec[i]+in_vec[j];
                    if(sum>target)
                    {
                        j--;
                    } else if(sum<target)
                    {
                        i++;
                    }else
                    {
                        out_res.clear();
                        out_res.push_back(in_vec[i]);
                        out_res.push_back(in_vec[j]);
                        int index1=0,index2=0;
                        for(int i=0;i<numbers.size();i++)
                        {
                            if(numbers[i]==out_res[0])
                            {
                                index1=i+1;
                                break;
                            }
                        }
                        for(int i=0;i<numbers.size();i++)
                        {
                            if((numbers[i]==out_res[1])&&(i!=index1-1)){
                                index2=i+1;
                                break;
                            }
                        }
                        out_res.clear();
                        if(index1<index2)
                        {
                            out_res.push_back(index1);
                            out_res.push_back(index2);
                        }else
                        {
                            out_res.push_back(index2);
                            out_res.push_back(index1);
                        }
                      //  std::cout<<out_res[0]<<","<<out_res[1]<<std::endl;
                        return out_res;
                    }

                }
            }
    };
```



  


C++哈希表版本


```
    class Solution {
    public:
        vector<int> twoSum(vector<int> &numbers, int target)
        {
            unordered_map<int, int> mapping;
            vector<int> result;

            for(int i = 0; i < numbers.size(); i++)
            {
                mapping[numbers[i]] = i;
            }
            for(int i = 0; i < numbers.size(); i++)
            {
                const int gap = target - numbers[i];
                if(mapping.find(gap)!= mapping.end()&&
                mapping[gap] > i)
                {
                    result.push_back(i+1);
                    result.push_back(mapping[gap]+1);
                    break;
                }
            }
            return result;
        }
    };
```
python


  
Python版本： 


```python
    class Solution:
        # @return a tuple, (index1, index2)
        def twoSum(self, num, target):
            lenth = len(num)
            dictNum = {}
            result = [0,0]
            for i,element in enumerate(num):
                dictNum[element] = i        # dictionary

            for j in range(0,lenth):
                if (target - num[j])in dictNum and j != dictNum[target - num[j]]:
                    result[0] = min(j + 1, dictNum[target - num[j]] + 1)
                    result[1] = max(j + 1, dictNum[target - num[j]] + 1)
            return tuple(result)
```



  
  