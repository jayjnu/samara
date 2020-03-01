export interface TrieSearchResult {
  path: string;
  node: TrieNode;
}

export default class Trie {
  readonly root: TrieNode;

  constructor(initialWords: string[]) {
    this.root = new TrieNode();

    initialWords.forEach((word) => {
      this.insert(word);
    });
  }

  insert(word: string) {
    this.root.add(word);
  }

  search(word: string): TrieSearchResult[] {
    const node = this.root.getNode(word);

    if (!node) {
      return [];
    }

    return this.findLeaf(node, word);
  }

  findLeaf(node: TrieNode, path: string): TrieSearchResult[] {
    if (node.isLeaf) {
      return [{
        path,
        node
      }];
    }

    return Array.from(node.children.entries()).flatMap(([, child]) => {
      return this.findLeaf(child, path + child.key);
    });
  }
}

class TrieNode {
  isLeaf: boolean;
  key: string;
  children: Map<string, TrieNode>;

  constructor(key: string = '', isLeaf: boolean = false) {
    this.isLeaf = isLeaf;
    this.key = key;
    this.children = new Map<string, TrieNode>();
  }

  add(word: string) {
    if (word.length === 0) {
      return;
    }

    const cap = word[0];
    const rest = word.slice(1);
    const node = this.children.get(cap) || this.children.set(cap, new TrieNode(cap, rest.length === 0)).get(cap);

    (node as TrieNode).add(rest);
  }

  getNode(word: string): TrieNode | null {
    const cap = word[0];
    const rest = word.slice(1);
    const node = this.children.get(cap);

    if (!node) {
      return null;
    }

    if (rest.length === 0) {
      return node;
    }

    return node.getNode(rest);
  }
}
