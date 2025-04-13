// App.js
import React from 'react';
import MyStyledApp from './components/MyStyledApp'; // ✅ Import your component

function App() {
  return (
    <div className="App">
      <MyStyledApp /> {/* ✅ Render your styled app */}
    </div>
  );
}
export default App;