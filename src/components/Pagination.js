import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductItem from './ProductItem';
import classes from './Pagination.module.css';
import { useSelector } from 'react-redux';



function PaginatedItems({ itemsPerPage}) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);


  const storeData=useSelector(state=>state.items)
  

useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(storeData?.slice(itemOffset, endOffset));


    setPageCount(Math.ceil(storeData?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,storeData]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currentItems?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  
  return (
    <>
     <div className="page">
      {currentItems?.map((product) => (
            <ProductItem
            key={product.uid}
            id={product._id}
            price={product.price}
            model={product.model}
            year={product.year}
            make={product.make}
            mileage={product.mileage}
            description={product.description}
            image1={product.img[0].img0.data}
            image2={product.img[1].img1.data}
            image3={product.img[2].img2.data}
            transmission={product.transmission}
            bodyStyle={product.bodyStyle}
            exteriorColor={product.exteriorColor}
          />
        ))}
    </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        nextLabel=">"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="pageItem"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}

      />
    </>
  );
}

export default PaginatedItems;

// Add a <div id="container"> to your HTML to see the componend rendered.
// ReactDOM.render(
//   <PaginatedItems itemsPerPage={8} />,
//   document.getElementById('container')
// );