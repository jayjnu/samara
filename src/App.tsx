import React, {useState} from 'react';
import {Container} from '@material-ui/core';
import Suggest from './features/suggest';
import product from './data/product';

export interface ProductData {
  collection: string;
  name: ProductDictionary
}

export interface ProductDictionary {
  [productName: string]: ProductItem
}

export interface ProductItem {

}

function App() {
  const [data, updateData] = useState<ProductItem|null>(null);

  const onSearch = (keyword: string) => {
    const item = (product as ProductData).name[keyword];
    updateData(item);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>사말아?</h1>
      </header>
      <Container>
        <h2>Hello World</h2>
        <Suggest onSubmit={onSearch}/>
        <div>
          {data && JSON.stringify(data)}
        </div>
      </Container>
    </div>
  );
}

export default App;
