import "../index.css"
import { useCallback, useEffect, useRef, useState } from "react";
import Textfield from '@atlaskit/textfield';
function UseEffect() {
  const [listPost, setListPost] = useState([])
  const [totalPage, setTotalPage] = useState(1)
  const [filters, setFilters] = useState({ page: 1, limit: 10, title_like: "" })
  const [queryStr, setQueryStr] = useState("")
  const typingTimeOutRef = useRef(null)

  useEffect(() => {
    getPostApi(filters)
      .then((data) => {
        setListPost([...data["data"]])
        setTotalPage(parseInt(data["pagination"]["_totalRows"]))

        //TODO: loop deep filter -> render lien tuc
        if (parseInt(data["pagination"]["_page"]) != filters.page) {
          setFilters({ ...filters, page: parseInt(data["pagination"]["_page"]) })
        }

      })
  }, [filters]);

  const getPostApi = async () => {
    const requestUrl = `http://js-post-api.herokuapp.com/api/posts?_limit=${filters.limit}&_page=${filters.page}&title_like=${filters.title_like}`;
    const response = await fetch(requestUrl);
    const responseJson = await response.json();

    return responseJson;
  }

  const onNextPage = () => {
    setFilters(prevState => { return { ...prevState, page: (prevState.page + 1) } });
  }

  const onPrevPage = () => {
    setFilters(prevState => { return { ...prevState, page: (prevState.page - 1) } });
  }

  function onSubmit(e) {
    setQueryStr(e.target.value)

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current)
    }

    typingTimeOutRef.current = setTimeout(() => {
      setFilters(prevState => { return { ...prevState, title_like: queryStr } });
    }, 300)
  }

  return (
    <>
      <Textfield
        name="add-todo"
        placeholder="Input todo list"
        value={queryStr}
        onChange={onSubmit}
      />
      <p>Post List (page {filters.page})</p>
      <ul>
        {
          listPost.map(post =>
            <li key={post.id}>
              <img src={post.imageUrl} />
              <h5>{post.description}</h5>
            </li>
          )
        }
        <input type="button" value="Prev Page" disabled={filters.page == 1} onClick={onPrevPage} />
        <input type="button" value="Next Page" disabled={filters.page == totalPage} onClick={onNextPage} />
      </ul>
    </>
  );
}

export default UseEffect;
