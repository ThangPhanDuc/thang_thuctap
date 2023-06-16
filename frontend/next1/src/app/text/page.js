import axios from 'axios';

function Text({ data }) {
    return (
        <div>
            {data?.map(item => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                </div>
            ))}
        </div>
    );
}

export async function getStaticProps() {
//   Gọi API và lấy dữ liệu
    const response = await axios.get('https://63ecedddbe929df00cb562d2.mockapi.io/listProduct');
    const data = response.data;

    // const data =[{"id":1,"title":"hello","body":"hello world","created_at":null,"updated_at":null},{"id":2,"title":"chao ban","body":"xin chao","created_at":null,"updated_at":null}];    

    return {
        props: {
            data,
        },
    };

}

export default Text;
