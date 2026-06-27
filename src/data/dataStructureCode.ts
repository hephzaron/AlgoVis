import { DataStructure } from '../types';

export const dataStructureCode: Record<DataStructure, string> = {
    array: `
    class Array:
        def __init__(self, initial_capacity=10):
            self.data = [None] * initial_capacity
            self.capacity = initial_capacity
            self.length = 0
        
        def _resize(self, new_capacity):
            new_data = [None] * new_capacity
            for i in range(self.length):
                new_data[i] = self.data[i]
            self.data = new_data
            self.capacity = new_capacity
        
        def push(self, value):
            if self.length == self.capacity:
                self._resize(self.capacity * 2)
            
            self.data[self.length] = value
            self.length += 1
            return self.length - 1
        
        def pop(self):
            if self.length == 0:
                return None
            
            self.length -= 1
            value = self.data[self.length]
            self.data[self.length] = None
            
            # Shrink if too sparse
            if self.length > 0 and self.length == self.capacity // 4:
                self._resize(self.capacity // 2)
            
            return value
        
        def insert_at(self, value, index):
            if index < 0 or index > self.length:
                return False
            
            if self.length == self.capacity:
                self._resize(self.capacity * 2)
            
            # Shift elements to the right
            for i in range(self.length, index, -1):
                self.data[i] = self.data[i - 1]
            
            self.data[index] = value
            self.length += 1
            return True
        
        def remove_at(self, index):
            if index < 0 or index >= self.length:
                return None
            
            value = self.data[index]
            
            # Shift elements to the left
            for i in range(index, self.length - 1):
                self.data[i] = self.data[i + 1]
            
            self.length -= 1
            self.data[self.length] = None
            
            # Shrink if too sparse
            if self.length > 0 and self.length == self.capacity // 4:
                self._resize(self.capacity // 2)
            
            return value
        
        def get(self, index):
            if index < 0 or index >= self.length:
                return None
            return self.data[index]
        
        def set(self, index, value):
            if index < 0 or index >= self.length:
                return False
            self.data[index] = value
            return True
        
        def clear(self):
            self.data = [None] * self.capacity
            self.length = 0
        
        def sort(self):
            # Simple bubble sort for visualization
            for i in range(self.length - 1):
                for j in range(self.length - 1 - i):
                    if self.data[j] > self.data[j + 1]:
                        self.data[j], self.data[j + 1] = \
                            self.data[j + 1], self.data[j]
        
        def reverse(self):
            for i in range(self.length // 2):
                j = self.length - 1 - i
                self.data[i], self.data[j] = self.data[j], self.data[i]
        
        def size(self):
            return self.length
        
        def get_capacity(self):
            return self.capacity
        
        def is_empty(self):
            return self.length == 0
        
        def get_items(self):
            return self.data[:self.length]
    `.trim(),
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
graph: `class GraphNode:
    def __init__(self, value, node_id):
        self.value = value
        self.id = node_id
        self.neighbors = {}
        self.position = {'x': random.random() * 300 + 100, 'y': random.random() * 300 + 100}

    def add_neighbor(self, node):
        self.neighbors[node.id] = node

    def remove_neighbor(self, node_id):
        if node_id in self.neighbors:
            del self.neighbors[node_id]
            return True
        return False

    def has_neighbor(self, node_id):
        return node_id in self.neighbors

    def get_neighbors(self):
        return list(self.neighbors.keys())

    def get_degree(self):
        return len(self.neighbors)

class Graph:
    def __init__(self):
        self.nodes = {}
        self.size = 0

    def add_node(self, value, node_id):
        if node_id in self.nodes:
            raise ValueError(f"Node with ID {node_id} already exists")
        node = GraphNode(value, node_id)
        self.nodes[node_id] = node
        self.size += 1
        return node

    def remove_node(self, node_id):
        if node_id not in self.nodes:
            return False
        
        # Remove all edges pointing to this node
        for node in self.nodes.values():
            node.remove_neighbor(node_id)
        
        del self.nodes[node_id]
        self.size -= 1
        return True

    def get_node(self, node_id):
        return self.nodes.get(node_id)

    def add_edge(self, from_id, to_id):
        if from_id not in self.nodes or to_id not in self.nodes:
            return False
        
        from_node = self.nodes[from_id]
        to_node = self.nodes[to_id]
        from_node.add_neighbor(to_node)
        to_node.add_neighbor(from_node)  # Undirected graph
        return True

    def remove_edge(self, from_id, to_id):
        if from_id not in self.nodes or to_id not in self.nodes:
            return False
        
        from_node = self.nodes[from_id]
        to_node = self.nodes[to_id]
        return from_node.remove_neighbor(to_id) and to_node.remove_neighbor(from_id)

    def has_edge(self, from_id, to_id):
        if from_id not in self.nodes:
            return False
        return self.nodes[from_id].has_neighbor(to_id)

    def get_nodes(self):
        return list(self.nodes.values())

    def get_edges(self):
        edges = []
        seen = set()
        for node_id, node in self.nodes.items():
            for neighbor_id in node.get_neighbors():
                key = '-'.join(sorted([node_id, neighbor_id]))
                if key not in seen:
                    edges.append({'from': node_id, 'to': neighbor_id})
                    seen.add(key)
        return edges

    def clear(self):
        self.nodes.clear()
        self.size = 0

    def get_stats(self):
        node_list = self.get_nodes()
        edge_list = self.get_edges()
        degrees = [node.get_degree() for node in node_list]
        max_degree = max(degrees) if degrees else 0
        min_degree = min(degrees) if degrees else 0
        avg_degree = (len(edge_list) * 2) / len(node_list) if node_list else 0
        
        # Detect cycles (simplified)
        has_cycle = any(d > 1 for d in degrees) and len(node_list) > 2
        
        # Count connected components (BFS)
        components = 0
        visited = set()
        for node in node_list:
            if node.id not in visited:
                components += 1
                queue = [node.id]
                while queue:
                    current_id = queue.pop(0)
                    if current_id in visited:
                        continue
                    visited.add(current_id)
                    current_node = self.nodes.get(current_id)
                    if current_node:
                        for neighbor_id in current_node.get_neighbors():
                            if neighbor_id not in visited:
                                queue.append(neighbor_id)
        
        return {
            'node_count': len(node_list),
            'edge_count': len(edge_list),
            'average_degree': avg_degree,
            'max_degree': max_degree,
            'min_degree': min_degree,
            'connected_components': components,
            'has_cycle': has_cycle
        }

    def force_directed_layout(self, iterations=50, spring_constant=0.1, repulsion_constant=100):
        import random
        node_list = self.get_nodes()
        edge_list = self.get_edges()
        
        if not node_list:
            return
        
        for _ in range(iterations):
            # Apply repulsion between all nodes
            for i in range(len(node_list)):
                for j in range(i + 1, len(node_list)):
                    dx = node_list[i].position['x'] - node_list[j].position['x']
                    dy = node_list[i].position['y'] - node_list[j].position['y']
                    dist = (dx * dx + dy * dy) ** 0.5 + 0.1
                    force = repulsion_constant / (dist * dist)
                    
                    node_list[i].position['x'] += (dx / dist) * force * 0.01
                    node_list[i].position['y'] += (dy / dist) * force * 0.01
                    node_list[j].position['x'] -= (dx / dist) * force * 0.01
                    node_list[j].position['y'] -= (dy / dist) * force * 0.01
            
            # Apply attraction along edges
            for edge in edge_list:
                from_node = self.nodes.get(edge['from'])
                to_node = self.nodes.get(edge['to'])
                if not from_node or not to_node:
                    continue
                
                dx = from_node.position['x'] - to_node.position['x']
                dy = from_node.position['y'] - to_node.position['y']
                dist = (dx * dx + dy * dy) ** 0.5 + 0.1
                force = spring_constant * dist
                
                from_node.position['x'] -= (dx / dist) * force * 0.01
                from_node.position['y'] -= (dy / dist) * force * 0.01
                to_node.position['x'] += (dx / dist) * force * 0.01
                to_node.position['y'] += (dy / dist) * force * 0.01
            
            # Clamp positions
            for node in node_list:
                node.position['x'] = max(50, min(700, node.position['x']))
                node.position['y'] = max(50, min(500, node.position['y']))
`,
heap: 
`
class Heap:
    def __init__(self, heap_type='max'):
        self.heap = []
        self.type = heap_type  # 'max' or 'min'
    
    def _compare(self, a, b):
        if self.type == 'max':
            return a - b  # For max-heap
        else:
            return b - a  # For min-heap
    
    def insert(self, value):
        # Add value to the end
        self.heap.append(value)
        # Heapify up
        index = len(self.heap) - 1
        while index > 0:
            parent = (index - 1) // 2
            if self._compare(self.heap[index], self.heap[parent]) > 0:
                # Swap with parent
                self.heap[index], self.heap[parent] = self.heap[parent], self.heap[index]
                index = parent
            else:
                break
        return index
    
    def extract_root(self):
        if len(self.heap) == 0:
            return None
        
        root = self.heap[0]
        # Replace root with last element
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        
        # Heapify down
        index = 0
        while index < len(self.heap):
            left = 2 * index + 1
            right = 2 * index + 2
            largest = index
            
            if left < len(self.heap):
                if self._compare(self.heap[left], self.heap[largest]) > 0:
                    largest = left
            
            if right < len(self.heap):
                if self._compare(self.heap[right], self.heap[largest]) > 0:
                    largest = right
            
            if largest != index:
                self.heap[index], self.heap[largest] = self.heap[largest], self.heap[index]
                index = largest
            else:
                break
        
        return root
    
    def peek(self):
        if len(self.heap) == 0:
            return None
        return self.heap[0]
    
    def clear(self):
        self.heap = []
    
    def size(self):
        return len(self.heap)
    
    def is_empty(self):
        return len(self.heap) == 0
    
    def get_items(self):
        return self.heap.copy()
  `.trim(),
};
