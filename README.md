<h1 align="center">React Drawer</h1>

**React Drawer** is an easy to use drawer component for React.js.

## Install

```bash
npm install @jahlgren/react-drawer
```

## Usage

```jsx
import React, { useState } from 'react';
import Drawer from '@jahlgren/react-drawer';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)} >
        Content...
      </Drawer>
      <button onClick={() => setIsOpen(true)}>Open</button>
    </>
  );
}

export default App;
```

And import style manually:

```jsx
import '@jahlgren/react-drawer/dist/index.css';
```

## API

| props      | type           | default   | description    |
|------------|----------------|-----------|----------------|
| open | boolean | - | **(required)**, open or close drawer |
| children | any | undefined | drawer content |
| width | string\|number | 300 | width of the drawer |
| transitionDuration | number | 180 | transition duration in milliseconds |
| maskClassName | string | undefined | mask css classes |
| className | string  | undefined | drawer css classes |
| onClose | () => void | undefined | close click function |
