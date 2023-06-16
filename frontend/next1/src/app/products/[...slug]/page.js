const Products = ({ params }) => {
    // const {slug} = params;
    const [slug1, slug2] = params.slug;
 
    return (
        <div>
            <h1>Product</h1>
            <h2>slug1: {slug1}</h2>
            <h2>slug2: {slug2}</h2>
        </div>
    )
}

export default Products