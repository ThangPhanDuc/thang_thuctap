import React from "react"

const getServerSideProps = async (context) => {
    const {query} = context;
    return { props: query };
}

function Courses({ searchParams }) {
    const {sort, order} = searchParams;
    return (
        <div>
            <h1>Danh sach khoa hoc</h1>
            <h2>Sort: {sort}</h2>
            <h2>Order: {order}</h2>

        </div>
    )
}

export default Courses