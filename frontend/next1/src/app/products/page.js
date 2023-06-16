import React from "react"

const getServerSideProps = async (context) => {
    const {query} = context;
    return { props: query };
}

function Products({ searchParams }) {
    const {sort, order} = searchParams;
    return (
        <div>
            <h1>Danh sach san pham</h1>
            <h2>Sort: {sort}</h2>
            <h2>Order: {order}</h2>

        </div>
    )
}

export default Products