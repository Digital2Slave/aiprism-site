# 《剑指offer》二叉树的遍历

面试题23：从上往下打印二叉树（同一层的结点按照从左到右的顺序打印）

struct BinaryTreeNode

{

int m_value;

BinaryTreeNode* m_pLeft;

BinaryTreeNode* m_pRight;



```
}


    void PrintFromTopToBottom(BinaryTreeNode* pRoot)
    {
        if(pRoot == NULL)
            return;

        std::deque<BinaryTreeNode *> dequeTreeNode;

        dequeTreeNode.push_back(pRoot);

        while(dequeTreeNode.size())
        {
            BinaryTreeNode *pNode = dequeTreeNode.front();//c.front(): 返回c中首元素的引用。若c为空, 函数行为未定义
            dequeTreeNode.pop_front();                    //c.pop_front(): 删除c中首元素。若c为空, 函数行为未定义。函数返回void

            printf("%d ", pNode->m_nValue);

            if(pNode->m_pLeft)
                dequeTreeNode.push_back(pNode->m_pLeft);//c.push_back(t): 在c的尾部创建一个值为t的元素, 返回void

            if(pNode->m_pRight)
                dequeTreeNode.push_back(pNode->m_pRight);
        }
    }
```



  


面试题24：二叉搜索树的后序遍历

输入一个整数数组，判断该数组是不是莫二叉搜索树的后序遍历结果。如果是则返回True, 否则返回False.


```
    // BST：Binary Search Tree，二叉搜索树
    bool VerifySquenceOfBST(int sequence[], int length)
    {
        if(sequence == NULL || length <= 0)
            return false;

        int root = sequence[length - 1];

        // 在二叉搜索树中左子树的结点小于根结点
        int i = 0;
        for(; i < length - 1; ++ i)
        {
            if(sequence[i] > root)
                break;
        }

        // 在二叉搜索树中右子树的结点大于根结点
        int j = i;
        for(; j < length - 1; ++ j)
        {
            if(sequence[j] < root)
                return false;
        }

        // 判断左子树是不是二叉搜索树
        bool left = true;
        if(i > 0)
            left = VerifySquenceOfBST(sequence, i);

        // 判断右子树是不是二叉搜索树
        bool right = true;
        if(i < length - 1)
            right = VerifySquenceOfBST(sequence + i, length - i - 1);

        return (left && right);
    }
```



  
面试题24 续 二叉搜索树的前序遍历 

输入一个整数数组，判断该数组是不是莫二叉搜索树的前序遍历结果。如果是则返回True, 否则返回False.  



```
    // 前序遍历--> BST：Binary Search Tree，二叉搜索树
    bool VerifySquenceOfBST(int sequence[], int length)
    {
        if(sequence == NULL || length <= 0)
            return false;

        int root = sequence[0];

        // 在二叉搜索树中左子树的结点小于根结点
        int i = 1;
        for(; i < length - 1; ++ i)
        {
            if(sequence[i] > root)
                break;
        }

        // 在二叉搜索树中右子树的结点大于根结点
        int j = i;
        for(; j < length - 1; ++ j)
        {
            if(sequence[j] < root)
                return false;
        }

        // 判断左子树是不是二叉搜索树
        bool left = true;
        if(i > 1)
            left = VerifySquenceOfBST(sequence, i);

        // 判断右子树是不是二叉搜索树
        bool right = true;
        if(i < length)
            right = VerifySquenceOfBST(sequence + i, length - i);

        return (left && right);
    }
```



  
  


面试题25：二叉树中和为某一值的路径

  



```
    void FindPath(BinaryTreeNode* pRoot, int expectedSum)
    {
        if(pRoot == NULL)//鲁棒性考虑
            return;

        std::vector<int> path;//先入后出
        int currentSum = 0;   //遍历到当前结点的总和数值
        FindPath(pRoot, expectedSum, path, currentSum);
    }

    void FindPath
    (
        BinaryTreeNode*   pRoot,
        int               expectedSum,
        std::vector<int>& path,
        int&              currentSum
    )// 注意vector容器的函数调用形式!
    {
        currentSum += pRoot->m_nValue;
        path.push_back(pRoot->m_nValue);

        // 如果是叶结点，并且路径上结点的和等于输入的值
        // 打印出这条路径
        bool isLeaf = pRoot->m_pLeft == NULL && pRoot->m_pRight == NULL;
        if(currentSum == expectedSum && isLeaf)
        {
            printf("A path is found: ");
            std::vector<int>::iterator iter = path.begin();
            for(; iter != path.end(); ++ iter)
                printf("%d\t", *iter);

            printf("\n");
        }

        // 如果不是叶结点，则遍历它的子结点
        if(pRoot->m_pLeft != NULL)
            FindPath(pRoot->m_pLeft, expectedSum, path, currentSum);
        if(pRoot->m_pRight != NULL)
            FindPath(pRoot->m_pRight, expectedSum, path, currentSum);

        // 在返回到父结点之前，在路径上删除当前结点，
        // 并在currentSum中减去当前结点的值
        currentSum -= pRoot->m_nValue;
        path.pop_back();
    }
```



  
  


  