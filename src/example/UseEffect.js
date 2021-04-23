import "../index.css"
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

function UseEffect() {
  const [listPost, setListPost] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    getPostApi(page)
      .then((data) => {
        setListPost([...data["data"]])
        setTotalPage(parseInt(data["pagination"]["_totalRows"]))

      })
  }, [page]);

  const getPostApi = async (page) => {
    const requestUrl = `http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=${page}`;
    const response = await fetch(requestUrl);
    const responseJson = await response.json();

    return responseJson;
  }

  const onNextPage = () => {
    const count = page + 1

    if (count >= totalPage) {
      setPage(totalPage)
    }
    else {
      setPage(count)
    }
  }

  const onPrevPage = () => {
    const count = page - 1

    if (count == 0) {
      setPage(1)
    }
    else {
      setPage(count)
    }
  }

  return (
    <>
      <p>Post List (page {page})</p>
      <ul>
        {
          listPost.map(post =>
            <li key={post.id}>
              <img src={post.imageUrl} />
              <p>{post.description}</p>
            </li>
          )
        }
        <input type="button" value="Prev Page" onClick={onPrevPage} />
        <input type="button" value="Next Page" onClick={onNextPage} />
      </ul>
    </>
  );
}

export default UseEffect;
