import Link from "next/link";
import Text from "@/components/Text";


export default function Home() {
  const products = [
    {
      id: 1,
      name: "san pham 1",
      slug: "san-pham-1"
    },
    {
      id: 2,
      name: "san pham 2",
      slug: "san-pham-2"
    },
    {
      id: 3,
      name: "san pham 3",
      slug: "san-pham-3"
    },
  ]

  return (
    <div>
      <Text />
      <h1>This is Home Page</h1>
      <h3>
        <Link href={{
          pathname: "/products",
          query: {
            sort: "price",
            order: "desc"
          }
        }}
        >Danh sach san pham</Link>
      </h3>
      <h3>
        <Link href={{
          pathname: "/courses",
          query: {
            sort: "price",
            order: "desc"
          }
        }}
        >Danh sach khoa hoc</Link>
      </h3>
      {
        products.map(({ name, slug }) => <h4><Link href={`products/${encodeURIComponent(slug)}`}>{name}</Link></h4>)
      }
      {/* <h3>
        <Link href="/products/dien-lanh/tu-lanh">Tu lanh</Link>
      </h3>
      <h3>
        <Link href="/products/dien-lanh/dieu-hoa">Dieu hoa</Link>
      </h3> */}
    </div>
  );
}
