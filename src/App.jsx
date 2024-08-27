import React from 'react';

import Collection from './collection';
import { CATEGORIES } from './consts';

function App() {
  const [collection, setCollection] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [categoriesId, setCategoriesId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  const categories = `${categoriesId ? `category=${categoriesId}` : ''}`

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`https://66cb6d124290b1c4f19a5100.mockapi.io/photos?page=${page}&limit=3&${categories}`)
      .then((response => response.json()))
      .then((json => setCollection(json)))
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, [categoriesId, page]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {CATEGORIES
            .map((item, index) =>
              <li
                key={index}
                className={categoriesId === index ? 'active' : ''}
                onClick={() => setCategoriesId(index)}>{item}
              </li>
            )}
        </ul>
        <input className="search-input" placeholder="Поиск по названию" value={search} onChange={handleSearch} />
      </div>
      <div className="content">
        {
          isLoading
            ? <h2>Загрузка...</h2>
            : collection
              .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
              .map((item, index) => {
              const {name, photos} = item

              return (
                <Collection key={index} title={name} images={photos}/>
              )
            })
        }
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, index) => <li className={page === index + 1 ? 'active' : ''} key={index} onClick={() => setPage(index + 1)}>{index + 1}</li>)
        }
      </ul>
    </div>
  );
}

export default App
