import { DataStructure } from '../types';

export const dataStructureCode: Record<DataStructure, string> = {
  stack: `class Stack:
    def __init__(self):
        self._items = []

    def push(self, value):
        self._items.append(value)

    def pop(self):
        if not self._items:
            return None
        return self._items.pop()

    def peek(self):
        if not self._items:
            return None
        return self._items[-1]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)
`,

  queue: `class Queue:
    def __init__(self):
        self._items = []

    def enqueue(self, value):
        self._items.append(value)

    def dequeue(self):
        if not self._items:
            return None
        return self._items.pop(0)

    def front(self):
        if not self._items:
            return None
        return self._items[0]

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)
`,

  bst: `class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if self.root is None:
            self.root = Node(value)
            return
        current = self.root
        while True:
            if value < current.value:
                if current.left is None:
                    current.left = Node(value)
                    return
                current = current.left
            else:
                if current.right is None:
                    current.right = Node(value)
                    return
                current = current.right

    def contains(self, value):
        current = self.root
        while current is not None:
            if value == current.value:
                return True
            elif value < current.value:
                current = current.left
            else:
                current = current.right
        return False

    def inorder(self, node, result):
        if node is None:
            return
        self.inorder(node.left, result)
        result.append(node.value)
        self.inorder(node.right, result)
`,

  hash: `class HashTable:
    def __init__(self, size=16):
        self._size = size
        self._buckets = [[] for _ in range(size)]

    def _hash(self, key):
        return hash(key) % self._size

    def set(self, key, value):
        idx = self._hash(key)
        bucket = self._buckets[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))

    def get(self, key):
        idx = self._hash(key)
        bucket = self._buckets[idx]
        for k, v in bucket:
            if k == key:
                return v
        return None

    def delete(self, key):
        idx = self._hash(key)
        bucket = self._buckets[idx]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return True
        return False
`,
linkedList: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class LinkedList:
    def __init__(self):
        self._head = None
        self._tail = None
        self._size = 0

    def append(self, value):
        new_node = Node(value)
        if self._head is None:
            self._head = new_node
            self._tail = new_node
        else:
            self._tail.next = new_node
            self._tail = new_node
        self._size += 1

    def remove_first(self):
        if self._head is None:
            return None
        value = self._head.value
        self._head = self._head.next
        self._size -= 1
        if self._head is None:
            self._tail = None
        return value

    def peek(self):
        if self._head is None:
            return None
        return self._head.value

    def is_empty(self):
        return self._size == 0

    def size(self):
        return self._size

    def get_items(self):
        items = []
        current = self._head
        while current is not None:
            items.append(current.value)
            current = current.next
        return items

    def clear(self):
        self._head = None
        self._tail = None
        self._size = 0

    def insert_at(self, value, index):
        if index < 0 or index > self._size:
            return False
        
        if index == self._size:
            self.append(value)
            return True
        
        new_node = Node(value)
        
        if index == 0:
            new_node.next = self._head
            self._head = new_node
            if self._tail is None:
                self._tail = new_node
            self._size += 1
            return True
        
        current = self._head
        current_index = 0
        while current is not None and current_index < index - 1:
            current = current.next
            current_index += 1
        
        if current is not None:
            new_node.next = current.next
            current.next = new_node
            self._size += 1
            return True
        
        return False

    def remove_at(self, index):
        if index < 0 or index >= self._size:
            return None
        
        if index == 0:
            return self.remove_first()
        
        current = self._head
        current_index = 0
        while current is not None and current_index < index - 1:
            current = current.next
            current_index += 1
        
        if current is not None and current.next is not None:
            value = current.next.value
            current.next = current.next.next
            self._size -= 1
            if current.next is None:
                self._tail = current
            return value
        
        return None

    def index_of(self, value):
        current = self._head
        index = 0
        while current is not None:
            if current.value == value:
                return index
            current = current.next
            index += 1
        return -1
`,
};
