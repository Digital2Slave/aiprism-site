# LeetcodeOJ--整理




```
    // Search in Rotated Sorted Array
    /*
    Suppose a sorted array is rotated at some pivot unknown to you beforehand.
    (i.e., 0 1 2 4 5 6 7 might become 4 5 6 7 0 1 2).
    You are given a target value to search. If found in the array return its index, otherwise return -1.
    You may assume no duplicate exists in the array.
    */
    // 时间复杂度O(n),空间复杂度O(1)
    class Solution {
    public:
        int search(int A[], int n, int target) {
            if(A == NULL || n < 0)
            {
                return -1;
            }

            for(int i = 0; i < n; i++)
            {
                if(A[i] == target)
                {
                    return i;
                }
            }

            return -1;
        }
    };

    // 时间复杂度O(logn),空间复杂度O(1)
    class Solution {
    public:
        int search(int A[], int n, int target) {
            if(A == NULL || n < 0)
            {
                return -1;
            }

            int first = 0, last = n;
            while(first != last)
            {
                const int mid = (first + last)/2;
                if(A[mid] == target)
                {
                    return mid;
                }
                if(A[first] <= A[mid])// 左半部分
                {
                    if(A[first] <= target && target <= A[mid])
                    {
                        last = mid;
                    }
                    else
                    {
                        first = mid + 1;
                    }
                }
                else// 右半部分
                {
                    if(A[mid] < target && target <= A[last-1])
                    {
                        first = mid + 1;
                    }
                    else
                    {
                        last = mid;
                    }
                }
            }
            return -1;
        }
    };

    //Search in Rotated Sorted Array II
    /*
    Follow up for "Search in Rotated Sorted Array":
    What if duplicates are allowed?
    Would this affect the run-time complexity? How and why?
    Write a function to determine if a given target is in the array.
    */
    // 时间复杂度O(n)(最糟糕的情况), 空间复杂度O(1)
    class Solution {
    public:
        int search(int A[], int n, int target) {
            if(A == NULL || n < 0)
            {
                return false;
            }

            for(int i = 0; i < n; i++)
            {
                if(A[i] == target)
                {
                    return true;
                }
            }

            return false;
        }
    };
    // 时间复杂度O(logn)(最糟糕的情况), 空间复杂度O(1)
    class Solution {
    public:
        bool search(int A[], int n, int target) {
            if(A == NULL || n < 0)
            {
                return false;
            }
            int first = 0, last = n;
            while(first != last)
            {
                const int mid = (first + last)/2;
                if(A[mid] == target) { return true;}
                if(A[first] < A[mid])
                {
                    if(A[first] <= target && target < A[mid])
                    {
                        last = mid;
                    }
                    else
                    {
                        first = mid + 1;
                    }
                }
                else
                {
                    if(A[first] > A[mid])
                    {
                        if(A[mid] < target && target <= A[last-1])
                        {
                            first = mid + 1;
                        }
                        else
                        {
                            last = mid;
                        }
                    }
                    else
                    {
                        first++;// skip duplicate one
                    }
                }
            }
            return false;
        }
    };

    /*
    Longest Consecutive Sequence
    Given an unsorted array of integers, find the length of the longest consecutive elements sequence.
    For example,
    Given [100, 4, 200, 1, 3, 2],
    The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.
    Your algorithm should run in O(n) complexity.
    */
    class Solution {
    public:
        int longestConsecutive(vector<int> &num) {
            unordered_map<int, bool> used;
            for(auto i : num) used[i] = false;// C++11 新特征auto

            int longest = 0;

            for(auto i : num)
            {
                if(used[i]) continue;

                int length = 1;
                used[i] = true;

                for(int j = i + 1; used.find(j) != used.end(); ++j)
                {
                    used[j] = true;
                    ++length;
                }

                for(int j = i - 1; used.find(j) != used.end(); --j)
                {
                    used[j] = true;
                    ++length;
                }
                longest = max(longest, length);
            }
            return longest;
        }
    };

    /*
    3Sum
    Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
    Note:
    Elements in a triplet (a,b,c) must be in non-descending order. (ie, a ≤ b ≤ c)
    The solution set must not contain duplicate triplets.
    For example, given array S = {-1 0 1 2 -1 -4},
    A solution set is:
    (-1, 0, 1)
    (-1, -1, 2)
    */
    class Solution {
    public:
        vector<vector<int> > threeSum(vector<int> &num) {
            // Start typing your C/C++ solution below
            // DO NOT write int main() function

            vector<vector<int> > ret;
            ret.clear();
            sort(num.begin(),num.end());
            for(int i=0; i!=num.size();i++)
            {
                if(i > 0 && num[i]==num[i-1])
                    continue;
                int j=i+1, k=num.size()-1;

                while(j<k)
                {
                    if(j>i+1&&num[j]==num[j-1])
                    {
                        j++;
                        continue;
                    }
                    if(k<num.size()-1&& num[k]==num[k+1])
                    {
                        k--;
                        continue;
                    }

                    int sum = num[i] + num[j] + num[k];
                    if(sum>0)
                    {
                        k--;
                    }else if(sum<0)
                    {
                        j++;
                    }else
                    {
                        vector<int> tmp;
                        tmp.push_back(num[i]);
                        tmp.push_back(num[j]);
                        tmp.push_back(num[k]);
                        ret.push_back(tmp);
                        j++;
                    }
               }// end for j < k
            }// end for i
            return ret;
        }
    };
    /*
    3Sum Closest
    Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. Return the sum of the three integers. You may assume that each input would have exactly one solution.
    For example, given array S = {-1 2 1 -4}, and target = 1.
    The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
    */
    class Solution {
    public:
        int threeSumClosest(vector<int> &num, int target) {
            int result = 0;
            int min_gap = INT_MAX;
            sort(num.begin(), num.end());
            for(auto a = num.begin(); a != prev(num.end(),2); ++a)
            {
                auto b = next(a);
                auto c = prev(num.end());

                while(b < c)
                {
                    const int sum = *a + *b + *c;
                    const int gap = abs(sum - target);
                    if(gap < min_gap)
                    {
                        result = sum;
                        min_gap = gap;
                    }
                    if(sum < target)
                    {
                        ++b;
                    }
                    else
                    {
                        --c;
                    }
                }
            }
            return result;
        }
    };
    /*
    4Sum
    Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
    Note:
    Elements in a quadruplet (a,b,c,d) must be in non-descending order. (ie, a ≤ b ≤ c ≤ d)
    The solution set must not contain duplicate quadruplets.
    For example, given array S = {1 0 -1 0 -2 2}, and target = 0.
    A solution set is:
    (-1,  0, 0, 1)
    (-2, -1, 1, 2)
    (-2,  0, 0, 2)
    */
    class Solution {
    public:
        vector<vector<int> > fourSum(vector<int> &num, int target) {
            vector<vector<int>> result;
            if(num.size() < 4) return result;
            sort(num.begin(), num.end());

            unordered_multimap<int, pair<int, int>> cache;
            for(int i = 0; i + 1 < num.size(); ++i)
            {
                for(int j = i + 1; j < num.size(); ++j)
                {
                    cache.insert(make_pair(num[i] + num[j], make_pair(i,j)));
                }
            }

            for(auto i = cache.begin(); i != cache.end(); ++i)
            {
                int x = target - i->first;
                auto range = cache.equal_range(x);
                for(auto j = range.first; j != range.second; ++j)
                {
                    auto a = i->second.first;
                    auto b = i->second.second;
                    auto c = j->second.first;
                    auto d = j->second.second;
                    if(a != c && a != d && b != c && b != d)
                    {
                        vector<int> vec = {num[a], num[b], num[c], num[d]};
                        sort(vec.begin(), vec.end());
                        result.push_back(vec);
                    }
                }
            }
            sort(result.begin(), result.end());
            result.erase(unique(result.begin(),result.end()), result.end());
            return result;
        }
    };
```



  