

export default function PreviewProfile(props) {
    const { user } = props;
    return (
        <div>
            <div className="card h-100" style={{ borderRadius: 15 }} >
                <div className="card-body text-center">
                    <div className="mt-3 mb-4">
                        <img
                            src={"http://localhost:8000/" + user.img}
                            className="rounded-circle img-fluid"
                            style={{ width: 100 }}
                        />
                    </div>
                    <h4 className="mb-2">{user.name}, {user.age}</h4>
                    <p className="text-muted mb-4">
                        @{user.email} <span className="mx-2">|</span>{" "}
                        <a href="#!">mdbootstrap.com</a>
                    </p>
                    <div className="d-flex justify-content-between text-center mt-5 mb-2">
                        <div>
                            <p className="mb-2 h5">8471</p>
                            <p className="text-muted mb-0">Wallets Balance</p>
                        </div>
                        <div className="px-3">
                            <p className="mb-2 h5">8512</p>
                            <p className="text-muted mb-0">Income amounts</p>
                        </div>
                        <div>
                            <p className="mb-2 h5">4751</p>
                            <p className="text-muted mb-0">Total Transactions</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}