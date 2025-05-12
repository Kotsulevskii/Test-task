// Получение 5-ти постов в виде списка, с использованием React (сборщик Vite) 
import { useState, useEffect } from "react";

function Task2() {
    let [posts, setPosts] = useState([]);
  
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/todos?_limit=5') // '?_limit=5' - число 5 обозначает количество отображаемых постов (уберем эту надпись - получим полный список)
        .then(res => res.json())
        .then(data => setPosts(data));
    }, []);
  
    return (
      <>
        <h2>Пять первых постов</h2>
        {posts.map(post => (
          <ul key={post.id}>
            <li>{post.title}</li>
          </ul>
        ))}
      </>
    );
  }

export default Task2;