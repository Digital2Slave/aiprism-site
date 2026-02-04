# 《剑指offer》学习之--反转链表与合并两个排序链表

16题目：定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点。

链表结点定义如下所示：


```
    struct ListNode
    {
        int m_nkey;
        ListNode* m_pNext;
    };
```



  


核心函数功能接收说明：


```
    ListNode* ReverseList(ListNode* pHead)
    {
        ListNode* pReversedHead = NULL;      //!<翻转链表的头结点为NULL
        ListNode* pNode = pHead;
        ListNode* pPrev = NULL;
        while(pNode != NULL)
        {
            ListNode* pNext = pNode->m_pNext;//!<防止翻转时导致链表断开, 暂存pNode->m_pNext结点

            if(pNext == NULL)                //!<单个结点的链表
                pReversedHead = pNode;

            pNode->m_pNext = pPrev;          //!<
            pPrev = pNode;                   //!<下一个结点指向单向链表的前一个结点

            pNode = pNext;                   //!<追加单向链表操作
        }

        return pReversedHead;
    }
```



17.合并两个排序的链表


```
    ListNode* Merge(ListNode* pHead1, ListNode* pHead2)
    {
        // 鲁棒性考虑,两个链表之一为空链表
        if(pHead1 == NULL)
            return pHead2;
        else if(pHead2 == NULL)
            return pHead1;

        ListNode* pMergedHead = NULL;

        if(pHead1->m_nValue < pHead2->m_nValue)
        {
            pMergedHead = pHead1;
            pMergedHead->m_pNext = Merge(pHead1->m_pNext, pHead2);
        }
        else
        {
            pMergedHead = pHead2;
            pMergedHead->m_pNext = Merge(pHead1, pHead2->m_pNext);
        }

        return pMergedHead;
    }
```



  
  
  