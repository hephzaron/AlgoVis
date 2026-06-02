/**
 * A simple Huffman encoder/decoder for compression visualization.
 * Stores the tree and the generated bit codes for each character.
 */
import { HuffmanNode } from '../../types';

export class HuffmanCoder {
  private frequencies: Map<string, number> = new Map();
  private codes: Map<string, string> = new Map();
  private root: HuffmanNode | null = null;
  
  /**
   * Builds the Huffman tree for the input text.
   * @param text The input string to encode.
   */
  buildTree(text: string): HuffmanNode | null {
    // Calculate frequencies
    this.frequencies.clear();
    for (const char of text) {
      this.frequencies.set(char, (this.frequencies.get(char) || 0) + 1);
    }
    
    // Create priority queue (min-heap)
    const queue: HuffmanNode[] = [];
    
    for (const [char, freq] of this.frequencies) {
      queue.push({ char, freq, left: null, right: null });
    }
    
    // Sort by frequency
    queue.sort((a, b) => a.freq - b.freq);
    
    // Build tree
    while (queue.length > 1) {
      const left = queue.shift()!;
      const right = queue.shift()!;
      
      const parent: HuffmanNode = {
        char: null,
        freq: left.freq + right.freq,
        left,
        right
      };
      
      queue.push(parent);
      queue.sort((a, b) => a.freq - b.freq);
    }
    
    this.root = queue[0] || null;
    this.generateCodes(this.root, '');
    return this.root;
  }
  
  /**
   * Traverses the tree to generate binary codes for every character.
   * @param node The current tree node.
   * @param code The code prefix accumulated so far.
   */
  private generateCodes(node: HuffmanNode | null, code: string): void {
    if (!node) return;
    
    if (node.char !== null) {
      this.codes.set(node.char, code);
    }
    
    this.generateCodes(node.left, code + '0');
    this.generateCodes(node.right, code + '1');
  }
  
  /**
   * Encodes the given text using the generated Huffman codes.
   * @param text The plaintext to encode.
   * @returns The encoded binary string.
   */
  encode(text: string): string {
    let result = '';
    for (const char of text) {
      result += this.codes.get(char) || '';
    }
    return result;
  }
  
  /**
   * Decodes a Huffman-encoded binary string back to text.
   * @param binary The encoded binary string.
   * @returns The decoded plaintext.
   */
  decode(binary: string): string {
    let result = '';
    let current = this.root;
    
    for (const bit of binary) {
      if (!current) break;
      
      if (bit === '0') {
        current = current.left;
      } else {
        current = current.right;
      }
      
      if (current && current.char !== null) {
        result += current.char;
        current = this.root;
      }
    }
    
    return result;
  }
  
  getCodes(): Map<string, string> {
    return this.codes;
  }
  
  getRoot(): HuffmanNode | null {
    return this.root;
  }
  
  getCompressionRatio(original: string, encoded: string): number {
    const originalBits = original.length * 8;
    const encodedBits = encoded.length;
    return ((originalBits - encodedBits) / originalBits) * 100;
  }
}