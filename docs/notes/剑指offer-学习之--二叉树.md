# 《剑指offer》学习之--二叉树

18树的子结构

输入两棵二叉树A和B，判断B是不是A的子结构。二叉树结点定义如下：

  



```
    struct BinaryTreeNode
    {
        int m_nValue;
        BinaryTreeNode* m_pLeft;
        BinaryTreeNode* m_pRight;
    }
```



  



```
    bool HasSubtreeCore(BinaryTreeNode* pRoot1, BinaryTreeNode* pRoot2);
    bool DoesTree1HaveTree2(BinaryTreeNode* pRoot1, BinaryTreeNode* pRoot2);

    bool HasSubtree(BinaryTreeNode* pRoot1, BinaryTreeNode* pRoot2)
    {
        bool result = false;

        if(pRoot1 != NULL && pRoot2 != NULL)//鲁棒性
        {
            if(pRoot1->m_nValue == pRoot2->m_nValue)
                result = DoesTree1HaveTree2(pRoot1, pRoot2);
            if(!result)
                result = HasSubtree(pRoot1->m_pLeft, pRoot2);//左子树遍历
            if(!result)
                result = HasSubtree(pRoot1->m_pRight, pRoot2);//右子树遍历
        }

        return result;
    }

    bool DoesTree1HaveTree2(BinaryTreeNode* pRoot1, BinaryTreeNode* pRoot2)
    {
        if(pRoot2 == NULL)
            return true;

        if(pRoot1 == NULL)
            return false;

        if(pRoot1->m_nValue != pRoot2->m_nValue)
            return false;

        return DoesTree1HaveTree2(pRoot1->m_pLeft, pRoot2->m_pLeft) &&
            DoesTree1HaveTree2(pRoot1->m_pRight, pRoot2->m_pRight);
    }
```



  


19二叉树的镜像

①递归


```
    void MirrorRecursively(BinaryTreeNode *pNode)
    {
        if((pNode == NULL) || (pNode->m_pLeft == NULL && pNode->m_pRight))
            return;

        BinaryTreeNode *pTemp = pNode->m_pLeft;
        pNode->m_pLeft = pNode->m_pRight;
        pNode->m_pRight = pTemp;

        if(pNode->m_pLeft)
            MirrorRecursively(pNode->m_pLeft);

        if(pNode->m_pRight)
            MirrorRecursively(pNode->m_pRight);
    }
```



②循环 


```
    void MirrorIteratively(BinaryTreeNode* pRoot)
    {
        if(pRoot == NULL)
            return;

        std::stack<BinaryTreeNode*> stackTreeNode;
        stackTreeNode.push(pRoot);

        while(stackTreeNode.size() > 0)
        {
            BinaryTreeNode *pNode = stackTreeNode.top();
            stackTreeNode.pop();

            BinaryTreeNode *pTemp = pNode->m_pLeft;
            pNode->m_pLeft = pNode->m_pRight;
            pNode->m_pRight = pTemp;

            if(pNode->m_pLeft)
                stackTreeNode.push(pNode->m_pLeft);

            if(pNode->m_pRight)
                stackTreeNode.push(pNode->m_pRight);
        }
    }
```



  
  